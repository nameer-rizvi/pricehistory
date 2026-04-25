import pricehistory from "../dist/esm/index.js";
import data from "./data.json" assert { type: "json" };

console.log(pricehistory(data));
