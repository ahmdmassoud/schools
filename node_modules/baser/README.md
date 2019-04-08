# baser

Convert numbers from a javascript base10 number to other bases.  Can either run 
in "pure" mode (which runs into issues with mantissa and divisibility) or 
"accurate" mode which is certain to always keep the digits the same when going 
back to original base but does not give you the right numbers to use in 
mathematical operations.

Why the two modes?  Often we are using this library to compress quite long 
numbers where we don't want to lose precision after the decimal.  Accurate is
much more useful, as we don't have to worry about loss of data when converting
back to base 10.

Currently this only works in "accurate" mode for research sake.

## Example

Start by installing the package:

`npm install baser`

Then initialize the object and start using it.

```
var libBaser = require('baser');

var baser = libBaser.new();

var integerconversion = baser.convert(100200300);
console.log('Converting the integer 100200300 to a base 62 number: '+integerconversion);

var decimalconversion = baser.convert(1.100200300);
console.log('Converting 1.100200300 to a base 62 number: '+decimalconversion);

```

Which will output the following to the command-line:

```
Converting the integer 100200300 to a base 62 number: 6mQfs
Converting 1.100200300 to a base 62 number: 1.4CfL
```

