/**
* Unit tests for Baser
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

var Chai = require('chai');
var Expect = Chai.expect;
var Assert = Chai.assert;

var libBaser = require('../source/Baser.js');

suite
(
	'Baser',
	()=>
	{
		setup(()=>{});

		suite
		(
			'Object Sanity',
			()=>
			{
				test
				(
					'initialize should build a happy little object',
					() =>
					{
						var testBaser = libBaser.new();
						Expect(testBaser)
							.to.be.an('object', 'Baser should initialize as an object directly from the require statement.');
					}
				);
			}
		);
		suite
		(
        	'Base Changes',
        	()=>
        	{
				test
				(
					'basic base conversions',
					() =>
					{
						var testBaser = libBaser.new();
						Expect(testBaser.convert(1)).to.equal('1');
						Expect(testBaser.convert(10)).to.equal('A');
						Expect(testBaser.convert(45)).to.equal('j');
						Expect(testBaser.convert(61)).to.equal('z');
					}
				);
				test
				(
					'basic base multi-digit conversions',
					() =>
					{
						var testBaser = libBaser.new();
						Expect(testBaser.convert(62)).to.equal('10');
						Expect(testBaser.convert(6200)).to.equal('1c0');
						Expect(testBaser.convert(100200300)).to.equal('6mQfs');
					}
				);
				test
				(
					'basic floating point conversions',
					() =>
					{
						var testBaser = libBaser.new();
						Expect(testBaser.convert(62.62)).to.equal('10.10');
						// This one is tricky because javascript changes 100200300, which is 1002003 before conversion
						Expect(testBaser.convert(1.100200300)).to.equal('1.4CfL');
					}
				);
        	}
        );
	}
);