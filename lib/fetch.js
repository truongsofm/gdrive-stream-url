const fetch = require("node-fetch");

const getText = async (url) => {
    const data = await (await fetch(url)).text();
    return data;
}

const getJson = async (url) => {
    const data = await (await fetch(url)).json();
    return data;
}

module.exports = {
    getText,
    getJson
}