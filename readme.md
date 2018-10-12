# jpck

a streamable wrapper around [js-mozjpegs jpegtran](https://www.npmjs.com/package/js-mozjpeg). 

you can use all `jpegtran` command line options in the object passed to `jpck(options)`.

be aware that [js-mozjpeg](https://www.npmjs.com/package/js-mozjpeg) is blocking. with the limit option you can set a maximum number of bytes for the input jpeg to be optimized. larger jpegs will just be passe through.

## usage

``` javascript

var fs = require("fs");
var jpck = require("jpck");

fs.createReadStream("./in.jpg").pipe(jpck({ optimize: true, copy: "none", fastcrush: true, limit: 102400 })).pipe(fs.createWriteStream("./out.jpg"));

```
