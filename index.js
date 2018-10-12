#!/usr/bin/env node

var stream = require("stream");
var jpegtran = require("js-mozjpeg").jpegtran;

module.exports = function(opts){

	// ensure opts and optimize
	if (!opts || typeof opts !== "object") opts = {};
	if (!(opts.optimize||opts.optimise||opts.opt||opts.o)) opts.optimize = true;
	if (!opts.copy) opts.copy = "none";
	
	var mem = Buffer.allocUnsafe(0);
	return new stream.Transform({
		transform(chunk, encoding, fn) {
			// check for limit 
			if (opts.limited) {
				// pass through
				this.push(chunk);
			} else if (opts.limit && mem.length > opts.limit) {
				// flush memory buffer and pass through
				this.push(mem);
				this.push(chunk);
				opts.limited = true;
			} else {
				// collect chunks
				mem = Buffer.concat([mem, chunk]);
			}
			fn();
		},
		flush(fn) {
			if (opts.limited || mem.length === 0) return fn();
			// remove
			delete opts.limit;
			var result = jpegtran(mem, opts).data;
			// check if result is ok and actually smaller
			this.push((!!result && result.length < mem.length) ? result : mem);
			fn();
		}
	});
};