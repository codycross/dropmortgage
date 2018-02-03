var data= require("path").join(__dirname, "data");
let programs = [];
var fs = require("fs");
fs.readdirSync(data).forEach(function(file) {
	let _temp = require("./data/" + file);
	programs.push(_temp);
	console.log('Loading : ',file);
});

module.exports = programs;