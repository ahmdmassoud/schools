/**
* Base Changing Library
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Baser
*/

/**
* Base Changer
*
* @class Baser
* @constructor
*/
var Baser = function()
{
	var createNew = () =>
	{
		var _Numerals = [
						//   0 -                                 9
							'0','1','2','3','4','5','6','7','8','9',
						//  10 -                                19
							'A','B','C','D','E','F','G','H','I','J',
						//  20 -                                29
							'K','L','M','N','O','P','Q','R','S','T',
						//  30 -                35
							'U','V','W','X','Y','Z',
						//  36 -                                45
							'a','b','c','d','e','f','g','h','i','j',
						//  46 -                                55
							'k','l','m','n','o','p','q','r','s','t',
						//  56 -                61
							'u','v','w','x','y','z'];
		
		var _Base = 62;

		// AccurateMode also stands for NOT MATHEMATICALLY CORRECT.  See documentation for more.
		var _AccurateMode = true;

		var setNumerals = (pNumerals) =>
		{
			if (Array.isArray(pNumerals))
			{
				_Numerals = pNumerals;
				if (_Base > _Numerals.length)
				{
					_Base = _Numerals.length;
				}
			}
		};
		
		var setBase = (pBase) =>
		{
			if (_Numerals.length >= pBase)
			{
				_Base = pBase;
			}
		};
		
		// Taken from the MDN polyfill for upcoming ES6 functionality: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Browser_compatibility
		var numberIsInteger = (pValue) =>
		{
			return typeof(pValue) === "number" && 
				isFinite(pValue) && 
				Math.floor(pValue) === pValue;
		};

		// This only works for base 10 at the moment
		// The conversion packet is {Integer:100875,Value:''} on initial call
		var convertBases = (pConversionPacket) =>
		{
			// This code is not optimized for least typing, but most legibility.
			// Get the remainder
			var tmpRemainder = pConversionPacket.Integer % _Base;

			// Reduce the conversion packet by one significant digit.
			pConversionPacket.Integer = (pConversionPacket.Integer - tmpRemainder) / _Base;
			
			// Prepend the numeral to the beginning of the "Value" string
			pConversionPacket.Value = _Numerals[tmpRemainder]+pConversionPacket.Value;
			
			if (pConversionPacket.Integer > 0)
			{
				// If there is still numerals left to prepend, recursively call this function
				return convertBases(pConversionPacket);
			}
			else
			{
				// We are done, return the number.
				return pConversionPacket.Value;
			}
		};
		var convert = (pNumber) =>
		{
			if (typeof(pNumber) !== 'number')
			{
				return false;
			}

			if (numberIsInteger(pNumber))
			{
				// The number is an integer, we don't need to split
				return convertBases({Integer:pNumber, Value:''})
			}
			else
			{
				// Split it up, get both sides
				var tmpNumericParts = pNumber.toString().split('.');
				
				// Uh hopefully two halves?
				if (tmpNumericParts.length !== 2)
				{
					return false
				}
				//console.log(pNumber+' '+tmpNumericParts[0]+' -> '+tmpNumericParts[1])
				var integerPart = convertBases({Integer:parseInt(tmpNumericParts[0]), Value:''});
				var fractionalPart = convertBases({Integer:parseInt(tmpNumericParts[1]), Value:''});
				return integerPart+'.'+fractionalPart;
			}
		};

		/**
		* Container Object for our Factory Pattern
		*/
		var tmpNewBaserObject = (
		{
			setNumerals: setNumerals,
			setBase: setBase,
			
			convert: convert,

			new: createNew
		});

		return tmpNewBaserObject;
	}

	return createNew();
};

module.exports = new Baser();