const Fetch = require("./fetch");

const getFiles = async id => {
  try {
    const html = await getHtml(id);
    const encodedData = html.split(`}}return p}('`)[1].split("))\n</script>")[0];
    const p = encodedData.split(`;',`)[0] + ";";
    const leftOver = encodedData.replace(p, "").split(",");
    const a = leftOver[1];
    const c = leftOver[2];
    const k = leftOver[3]
      .substring(1)
      .split(`'.split('|')`)[0]
      .split("|");
    const decodedData = parse(p, a, c, k, 0, {}).toString();
    const data = decodedData.split("sources:")[1].split("});")[0];
    return JSON.parse(data);
  } catch (e) {
    throw 'Invalid file id';
  }
};

const getHtml = async id => {
  const url = await getUrl(id);
  const html = await Fetch.getText(url);
  return html;
};

const getUrl = async id => {
  const target = `https://openplayer.net/get-link/?url=https://drive.google.com/file/d/${id}/preview`;
  const url = await Fetch.getText(target);
  return url;
};

const parse = (p, a, c, k, e, d) => {
  e = function(c) {
    return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
  };
  if (!"".replace(/^/, String)) {
    while (c--) {
      d[e(c)] = k[c] || e(c);
    }
    k = [
      function(e) {
        return d[e];
      }
    ];
    e = function() {
      return "\\w+";
    };
    c = 1;
  }
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    }
  }
  return p;
};

module.exports = { getFiles };
