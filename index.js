#!/usr/bin/env node

var which = require("which");
var dcp = require("duplex-child-process");

// find cjpeg, account for homebrew
var cjpeg = which.sync("cjpeg", { 
	path: ((process.platform === 'darwin') ? process.env.PATH+":/usr/local/opt/mozjpeg/bin" : process.env.PATH),
	nothrow: true
});

module.exports = function(opts){

	// just pass through if cjpeg is not installed
	if (!cjpeg) return console.error("[jpck] no cjpeg binary found, just passing through"), (require("stream").PassThrough());
	
	// ensure opts and quality
	if (!opts || typeof opts !== "object") opts = {};
	if (!opts.quality) opts.quality = 75;

	// hand over to binary
	return dcp.spawn(cjpeg, opts);

};
