# jpck

a streamable wrapper around mozjpeg. it's inspired by [mozjpeg-stream](https://www.npmjs.com/package/mozjpeg-stream), but without the weight of hundreds of dependencies and abandonnment security issues.

make sure you have `mozjpeg` installed and `cjpeg` in your `$PATH`. otherwise the jpeg stream will be just passed through without modification.

you can use all `cjpeg` command line options in the object passed to `jpck(options)`.

## usage

´´´ javascript

var fs = require("fs");
var jpck = require("jpck");

fs.createReadStream("./in.jpg").pipe(jpck({quality: 90})).pipe(fs.createWriteStream("./out.jpg"));

´´´
