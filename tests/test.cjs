const pricehistory = require("../dist/cjs/index.js");
const data = require("./data.json");

console.log(pricehistory(data, { datetime: "date", date: true }));
