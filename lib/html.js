const axios = require("axios");

const getHtmlAndCookie = async url => {
  const options = {
    url,
    method: "GET"
  };
  try {
    const response = await axios(options);
    if (response && response.status === 200) {
      try {
        const cookie = await getCookie(response);
        const html = response.data;
        return { cookie, html };
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("file not found");
    }
  } catch (error) {
    throw new Error("file not found");
  }
};

const getCookie = async response => {
  const setCookie = response.headers["set-cookie"];
  if (setCookie && setCookie[2]) {
    const driveCookie = setCookie[2].split(";")[0];
    if (driveCookie.includes("DRIVE_STREAM=")) {
      return driveCookie.replace("DRIVE_STREAM=", "");
    } else {
      throw new Error("cookie not found");
    }
  } else {
    throw new Error("cookie not found");
  }
};

module.exports = { getHtmlAndCookie };
// getHtmlAndCookie(
//   "https://drive.google.com/file/d/1Mm33S6_5AV3qetQ1AD6fMZCJOr2sK3cF/view"
// )
//   .then(console.log)
//   .catch(console.log);
