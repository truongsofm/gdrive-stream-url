const fetch = require("node-fetch");

const getHtmlAndCookieDriveStream = async url => {
  const response = await fetch(url);
  const cookie =
    "DRIVE_STREAM=" +
    response.headers
      .get("set-cookie")
      .split("DRIVE_STREAM=")[1]
      .split(";")[0];
  const html = await response.text();
  return { html, cookie };
};
module.exports = {
  getHtmlAndCookieDriveStream
};
