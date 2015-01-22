/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*!
 * Materialize v0.95.0 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
function toast(a,b,c,d){function e(a){var b=$("<div class='toast'></div>").addClass(c).html(a);return b.hammer({prevent_default:!1}).bind("pan",function(a){var c=a.gesture.deltaX,d=80;b.hasClass("panning")||b.addClass("panning");var e=1-Math.abs(c/d);0>e&&(e=0),b.velocity({left:c,opacity:e},{duration:50,queue:!1,easing:"easeOutQuad"})}).bind("panend",function(a){var c=a.gesture.deltaX,d=80;Math.abs(c)>d?b.velocity({marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){b.remove()}}):(b.removeClass("panning"),b.velocity({left:0,opacity:1},{duration:300,easing:"easeOutExpo",queue:!1}))}),b}if(c=c||"",0==$("#toast-container").length){var f=$("<div></div>").attr("id","toast-container");$("body").append(f)}var f=$("#toast-container"),g=e(a);f.append(g),g.css({top:parseFloat(g.css("top"))+35+"px",opacity:0}),g.velocity({top:"0px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1});var h=b,i=setInterval(function(){0===g.parent().length&&window.clearInterval(i),g.hasClass("panning")||(h-=100),0>=h&&(g.velocity({opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){$(this).remove(),"function"==typeof d&&d()}}),window.clearInterval(i))},100)}jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin(2*(b*e-f)*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=.3*e*1.5),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}}),!function(a){function b(a){var b=a.length,d=c.type(a);return"function"===d||c.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a}if(!a.jQuery){var c=function(a,b){return new c.fn.init(a,b)};c.isWindow=function(a){return null!=a&&a==a.window},c.type=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?e[g.call(a)]||"object":typeof a},c.isArray=Array.isArray||function(a){return"array"===c.type(a)},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(d){return!1}for(b in a);return void 0===b||f.call(a,b)},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;g>f&&(e=c.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=c.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=c.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=c.call(a[f],f,a[f]),e===!1)break;return a},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b]}else if(void 0!==b){var f=a[c.expando]||(a[c.expando]=++c.uuid);return d[f]=d[f]||{},d[f][b]=e,e}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&c.each(b,function(a,b){delete f[b]})},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=typeof h&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);j>i;i++)if(null!=(f=arguments[i]))for(e in f)a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d));return h},c.queue=function(a,d,e){function f(a,c){var d=c||[];return null!=a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;)a[e++]=b[d++];if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[]}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b)}))})},c.fn=c.prototype={init:function(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.")},offset:function(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function a(){for(var a=this.offsetParent||document;a&&"html"===!a.nodeType.toLowerCase&&"static"===a.style.position;)a=a.offsetParent;return a||document}var b=this[0],a=a.apply(b),d=this.offset(),e=/^(?:body|html)$/i.test(a.nodeName)?{top:0,left:0}:c(a).offset();return d.top-=parseFloat(b.style.marginTop)||0,d.left-=parseFloat(b.style.marginLeft)||0,a.style&&(e.top+=parseFloat(a.style.borderTopWidth)||0,e.left+=parseFloat(a.style.borderLeftWidth)||0),{top:d.top-e.top,left:d.left-e.left}}};var d={};c.expando="velocity"+(new Date).getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++)e["[object "+h[i]+"]"]=h[i].toLowerCase();c.fn.init.prototype=c.fn,a.Velocity={Utilities:c}}}(window),function(a){"object"==typeof module&&"object"==typeof module.exports?module.exports=a():"function"==typeof define&&define.amd?define(a):a()}(function(){return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a}function g(a){var b=m.data(a,"velocity");return null===b?d:b}function h(a){return function(b){return Math.round(b*a)*(1/a)}}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a}function g(a,b){return 3*b-6*a}function h(a){return 3*a}function i(a,b,c){return((f(b,c)*a+g(b,c))*a+h(b))*a}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b)}function k(b,c){for(var e=0;p>e;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f}return c}function l(){for(var b=0;t>b;++b)x[b]=i(b*u,a,d)}function m(b,c,e){var f,g,h=0;do g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;while(Math.abs(f)>r&&++h<s);return g}function n(b){for(var c=0,e=1,f=t-1;e!=f&&x[e]<=b;++e)c+=u;--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0==i?h:m(b,c,c+u)}function o(){y=!0,(a!=c||d!=e)&&l()}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array"in b;if(4!==arguments.length)return!1;for(var w=0;4>w;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e)};z.getControlPoints=function(){return[{x:a,y:c},{x:d,y:e}]};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A},z}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):p.isArray(a)&&4===a.length?i.apply(null,a):!1,c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c}function k(a){if(a)for(var b=(new Date).getTime(),c=0,e=t.State.calls.length;e>c;c++)if(t.State.calls[c]){var f=t.State.calls[c],h=f[0],i=f[2],j=f[3],n=!!j;j||(j=t.State.calls[c][3]=b-16);for(var o=Math.min((b-j)/i.duration,1),q=0,r=h.length;r>q;q++){var s=h[q],u=s.element;if(g(u)){var w=!1;if(i.display!==d&&null!==i.display&&"none"!==i.display){if("flex"===i.display){var y=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(y,function(a,b){v.setPropertyValue(u,"display",b)})}v.setPropertyValue(u,"display",i.display)}i.visibility!==d&&"hidden"!==i.visibility&&v.setPropertyValue(u,"visibility",i.visibility);for(var z in s)if("element"!==z){var A,B=s[z],C=p.isString(B.easing)?t.Easings[B.easing]:B.easing;if(1===o)A=B.endValue;else if(A=B.startValue+(B.endValue-B.startValue)*C(o),!n&&A===B.currentValue)continue;if(B.currentValue=A,v.Hooks.registered[z]){var D=v.Hooks.getRoot(z),E=g(u).rootPropertyValueCache[D];E&&(B.rootPropertyValue=E)}var F=v.setPropertyValue(u,z,B.currentValue+(0===parseFloat(A)?"":B.unitType),B.rootPropertyValue,B.scrollData);v.Hooks.registered[z]&&(g(u).rootPropertyValueCache[D]=v.Normalizations.registered[D]?v.Normalizations.registered[D]("extract",null,F[1]):F[1]),"transform"===F[0]&&(w=!0)}i.mobileHA&&g(u).transformCache.translate3d===d&&(g(u).transformCache.translate3d="(0px, 0px, 0px)",w=!0),w&&v.flushTransformCache(u)}}i.display!==d&&"none"!==i.display&&(t.State.calls[c][2].display=!1),i.visibility!==d&&"hidden"!==i.visibility&&(t.State.calls[c][2].visibility=!1),i.progress&&i.progress.call(f[1],f[1],o,Math.max(0,j+i.duration-b),j),1===o&&l(c)}t.State.isTicking&&x(k)}function l(a,b){if(!t.State.calls[a])return!1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility)),f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&g(l)){g(l).isAnimating=!1,g(l).rootPropertyValueCache={};var n=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=g(l).transformCache[b];g(l).transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(n=!0,delete g(l).transformCache[b])}),f.mobileHA&&(n=!0,delete g(l).transformCache.translate3d),n&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e)}catch(o){setTimeout(function(){throw o},1)}h&&f.loop!==!0&&h(e),f.loop!==!0||b||(m.each(g(l).tweensContainer,function(a,b){/^rotate/.test(a)&&360===parseFloat(b.endValue)&&(b.endValue=0,b.startValue=360)}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue)}t.State.calls[a]=!1;for(var p=0,q=t.State.calls.length;q>p;p++)if(t.State.calls[p]!==!1){i=!0;break}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[])}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof b.SVGElement},isEmptyObject:function(a){for(var b in a)return!1;return!0}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,8>=n&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=n)return void(jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:1,patch:0},debug:!1};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;h=c(h||i,g),j.push(1+h.x),k+=16,Math.abs(h.x)>l&&Math.abs(h.v)>l;);return f?function(a){return j[a*(j.length-1)|0]}:k}}();t.Easings={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1])});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b]}var c,d,e;if(n)for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")])}for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");for(var a in e){var g=c+e[a],h=a;v.Hooks.registered[g]=[c,h]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},blur:function(a,b,c){switch(a){case"name":return"-webkit-filter";case"extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0}return d;case"inject":return parseFloat(c)?"blur("+c+")":"none"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){9>=n||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++)!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return"transform";case"extract":return g(c)===d||g(c).transformCache[b]===d?/^scale/i.test(b)?1:0:g(c).transformCache[b].replace(/[()]/g,"");case"inject":var f=!1;switch(b.substr(0,b.length-1)){case"translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":t.State.isAndroid&&g(c).transformCache[b]===d&&1>e&&(e=1),f=!/(\d)$/i.test(e);break;case"skew":f=!/(deg|\d)$/i.test(e);break;case"rotate":f=!/(deg|\d)$/i.test(e)}return f||(g(c).transformCache[b]="("+e+")"),g(c).transformCache[b]}}}();for(var a=0;a<v.Lists.colors.length;a++)!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return b;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case"inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(t.State.prefixMatches[a])return[t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a&&a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,f){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=m.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),(n||t.State.isFirefox)&&"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?o.getPropertyValue(c):o[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(i=m(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o)}return/^[\d-]/.test(i)||(i=g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?/^(height|width)$/i.test(c)?a.getBBox()[c]:a.getAttribute(c):h(a,v.Names.prefixCheck(c)[0])),v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||t.State.isAndroid&&!t.State.isChrome)&&g(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,f;m.each(g(a).transformCache,function(b){return e=g(a).transformCache[b],"transformPerspective"===b?(f=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),f&&(c="perspective"+f+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e=d;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=t.CSS.getPropertyValue(f,b));else{var h=t.CSS.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h}}),e};var w=function(){function a(){return i?C.promise||null:n}function h(){function a(){function a(a,b){var c=d,e=d,f=d;return p.isArray(a)?(c=a[0],!p.isArray(a[1])&&/^[\d-]/.test(a[1])||p.isFunction(a[1])||v.RegEx.isHex.test(a[1])?f=a[1]:(p.isString(a[1])&&!v.RegEx.isHex.test(a[1])||p.isArray(a[1]))&&(e=b?a[1]:j(a[1],i.duration),a[2]!==d&&(f=a[2]))):c=a,b||(e=e||i.easing),p.isFunction(c)&&(c=c.call(h,z,y)),p.isFunction(f)&&(f=f.call(h,z,y)),[c||0,e,f]}function n(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function o(){var a={myParent:h.parentNode||c.body,position:v.getPropertyValue(h,"position"),fontSize:v.getPropertyValue(h,"fontSize")},d=a.position===J.lastPosition&&a.myParent===J.lastParent,e=a.fontSize===J.lastFontSize;J.lastParent=a.myParent,J.lastPosition=a.position,J.lastFontSize=a.fontSize;var f=100,i={};if(e&&d)i.emToPx=J.lastEmToPx,i.percentToPxWidth=J.lastPercentToPxWidth,i.percentToPxHeight=J.lastPercentToPxHeight;else{var j=g(h).isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(j),a.myParent.appendChild(j),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(j,b,"hidden")}),t.CSS.setPropertyValue(j,"position",a.position),t.CSS.setPropertyValue(j,"fontSize",a.fontSize),t.CSS.setPropertyValue(j,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(j,b,f+"%")}),t.CSS.setPropertyValue(j,"paddingLeft",f+"em"),i.percentToPxWidth=J.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(j,"width",null,!0))||1)/f,i.percentToPxHeight=J.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(j,"height",null,!0))||1)/f,i.emToPx=J.lastEmToPx=(parseFloat(v.getPropertyValue(j,"paddingLeft"))||1)/f,a.myParent.removeChild(j)}return null===J.remToPx&&(J.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===J.vwToPx&&(J.vwToPx=parseFloat(b.innerWidth)/100,J.vhToPx=parseFloat(b.innerHeight)/100),i.remToPx=J.remToPx,i.vwToPx=J.vwToPx,i.vhToPx=J.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),h),i}if(i.begin&&0===z)try{i.begin.call(q,q)}catch(r){setTimeout(function(){throw r},1)}if("scroll"===D){var w,x,A,B=/^x$/i.test(i.axis)?"Left":"Top",E=parseFloat(i.offset)||0;i.container?p.isWrapped(i.container)||p.isNode(i.container)?(i.container=i.container[0]||i.container,w=i.container["scroll"+B],A=w+m(h).position()[B.toLowerCase()]+E):i.container=null:(w=t.State.scrollAnchor[t.State["scrollProperty"+B]],x=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===B?"Top":"Left")]],A=m(h).offset()[B.toLowerCase()]+E),l={scroll:{rootPropertyValue:!1,startValue:w,currentValue:w,endValue:A,unitType:"",easing:i.easing,scrollData:{container:i.container,direction:B,alternateValue:x}},element:h},t.debug&&console.log("tweensContainer (scroll): ",l.scroll,h)}else if("reverse"===D){if(!g(h).tweensContainer)return void m.dequeue(h,i.queue);"none"===g(h).opts.display&&(g(h).opts.display="auto"),"hidden"===g(h).opts.visibility&&(g(h).opts.visibility="visible"),g(h).opts.loop=!1,g(h).opts.begin=null,g(h).opts.complete=null,u.easing||delete i.easing,u.duration||delete i.duration,i=m.extend({},g(h).opts,i);var F=m.extend(!0,{},g(h).tweensContainer);for(var G in F)if("element"!==G){var H=F[G].startValue;F[G].startValue=F[G].currentValue=F[G].endValue,F[G].endValue=H,p.isEmptyObject(u)||(F[G].easing=i.easing),t.debug&&console.log("reverse tweensContainer ("+G+"): "+JSON.stringify(F[G]),h)}l=F}else if("start"===D){var F;g(h).tweensContainer&&g(h).isAnimating===!0&&(F=g(h).tweensContainer),m.each(s,function(b,c){if(RegExp("^"+v.Lists.colors.join("$|^")+"$").test(b)){var e=a(c,!0),f=e[0],g=e[1],h=e[2];if(v.RegEx.isHex.test(f)){for(var i=["Red","Green","Blue"],j=v.Values.hexToRgb(f),k=h?v.Values.hexToRgb(h):d,l=0;l<i.length;l++){var m=[j[l]];g&&m.push(g),k!==d&&m.push(k[l]),s[b+i[l]]=m}delete s[b]}}});for(var I in s){var L=a(s[I]),M=L[0],N=L[1],O=L[2];I=v.Names.camelCase(I);var P=v.Hooks.getRoot(I),Q=!1;if(g(h).isSVG||v.Names.prefixCheck(P)[1]!==!1||v.Normalizations.registered[P]!==d){(i.display!==d&&null!==i.display&&"none"!==i.display||i.visibility!==d&&"hidden"!==i.visibility)&&/opacity|filter/.test(I)&&!O&&0!==M&&(O=0),i._cacheValues&&F&&F[I]?(O===d&&(O=F[I].endValue+F[I].unitType),Q=g(h).rootPropertyValueCache[P]):v.Hooks.registered[I]?O===d?(Q=v.getPropertyValue(h,P),O=v.getPropertyValue(h,I,Q)):Q=v.Hooks.templates[P][1]:O===d&&(O=v.getPropertyValue(h,I));
var R,S,T,U=!1;if(R=n(I,O),O=R[0],T=R[1],R=n(I,M),M=R[0].replace(/^([+-\/*])=/,function(a,b){return U=b,""}),S=R[1],O=parseFloat(O)||0,M=parseFloat(M)||0,"%"===S&&(/^(fontSize|lineHeight)$/.test(I)?(M/=100,S="em"):/^scale/.test(I)?(M/=100,S=""):/(Red|Green|Blue)$/i.test(I)&&(M=M/100*255,S="")),/[\/*]/.test(U))S=T;else if(T!==S&&0!==O)if(0===M)S=T;else{f=f||o();var V=/margin|padding|left|right|width|text|word|letter/i.test(I)||/X$/.test(I)||"x"===I?"x":"y";switch(T){case"%":O*="x"===V?f.percentToPxWidth:f.percentToPxHeight;break;case"px":break;default:O*=f[T+"ToPx"]}switch(S){case"%":O*=1/("x"===V?f.percentToPxWidth:f.percentToPxHeight);break;case"px":break;default:O*=1/f[S+"ToPx"]}}switch(U){case"+":M=O+M;break;case"-":M=O-M;break;case"*":M=O*M;break;case"/":M=O/M}l[I]={rootPropertyValue:Q,startValue:O,currentValue:O,endValue:M,unitType:S,easing:N},t.debug&&console.log("tweensContainer ("+I+"): "+JSON.stringify(l[I]),h)}else t.debug&&console.log("Skipping ["+P+"] due to a lack of browser support.")}l.element=h}l.element&&(v.Values.addClass(h,"velocity-animating"),K.push(l),""===i.queue&&(g(h).tweensContainer=l,g(h).opts=i),g(h).isAnimating=!0,z===y-1?(t.State.calls.length>1e4&&(t.State.calls=e(t.State.calls)),t.State.calls.push([K,q,i,null,C.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):z++)}var f,h=this,i=m.extend({},t.defaults,u),l={};switch(g(h)===d&&t.init(h),parseFloat(i.delay)&&i.queue!==!1&&m.queue(h,i.queue,function(a){t.velocityQueueEntryFlag=!0,g(h).delayTimer={setTimeout:setTimeout(a,parseFloat(i.delay)),next:a}}),i.duration.toString().toLowerCase()){case"fast":i.duration=200;break;case"normal":i.duration=r;break;case"slow":i.duration=600;break;default:i.duration=parseFloat(i.duration)||1}t.mock!==!1&&(t.mock===!0?i.duration=i.delay=1:(i.duration*=parseFloat(t.mock)||1,i.delay*=parseFloat(t.mock)||1)),i.easing=j(i.easing,i.duration),i.begin&&!p.isFunction(i.begin)&&(i.begin=null),i.progress&&!p.isFunction(i.progress)&&(i.progress=null),i.complete&&!p.isFunction(i.complete)&&(i.complete=null),i.display!==d&&null!==i.display&&(i.display=i.display.toString().toLowerCase(),"auto"===i.display&&(i.display=t.CSS.Values.getDisplayType(h))),i.visibility!==d&&null!==i.visibility&&(i.visibility=i.visibility.toString().toLowerCase()),i.mobileHA=i.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,i.queue===!1?i.delay?setTimeout(a,i.delay):a():m.queue(h,i.queue,function(b,c){return c===!0?(C.promise&&C.resolver(q),!0):(t.velocityQueueEntryFlag=!0,void a(b))}),""!==i.queue&&"fx"!==i.queue||"inprogress"===m.queue(h)[0]||m.dequeue(h)}var i,n,o,q,s,u,x=arguments[0]&&(m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));if(p.isWrapped(this)?(i=!1,o=0,q=this,n=this):(i=!0,o=1,q=x?arguments[0].elements:arguments[0]),q=f(q)){x?(s=arguments[0].properties,u=arguments[0].options):(s=arguments[o],u=arguments[o+1]);var y=q.length,z=0;if("stop"!==s&&!m.isPlainObject(u)){var A=o+1;u={};for(var B=A;B<arguments.length;B++)p.isArray(arguments[B])||!/^(fast|normal|slow)$/i.test(arguments[B])&&!/^\d/.test(arguments[B])?p.isString(arguments[B])||p.isArray(arguments[B])?u.easing=arguments[B]:p.isFunction(arguments[B])&&(u.complete=arguments[B]):u.duration=arguments[B]}var C={promise:null,resolver:null,rejecter:null};i&&t.Promise&&(C.promise=new t.Promise(function(a,b){C.resolver=a,C.rejecter=b}));var D;switch(s){case"scroll":D="scroll";break;case"reverse":D="reverse";break;case"stop":m.each(q,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer)});var E=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=p.isString(u)?u:"";return u!==d&&b[2].queue!==f?!0:void m.each(q,function(b,c){c===e&&(u!==d&&(m.each(m.queue(c,f),function(a,b){p.isFunction(b)&&b(null,!0)}),m.queue(c,f,[])),g(c)&&""===f&&m.each(g(c).tweensContainer,function(a,b){b.endValue=b.currentValue}),E.push(a))})})}),m.each(E,function(a,b){l(b,!0)}),C.promise&&C.resolver(q),a();default:if(!m.isPlainObject(s)||p.isEmptyObject(s)){if(p.isString(s)&&t.Redirects[s]){var F=m.extend({},u),G=F.duration,H=F.delay||0;return F.backwards===!0&&(q=m.extend(!0,[],q).reverse()),m.each(q,function(a,b){parseFloat(F.stagger)?F.delay=H+parseFloat(F.stagger)*a:p.isFunction(F.stagger)&&(F.delay=H+F.stagger.call(b,a,y)),F.drag&&(F.duration=parseFloat(G)||(/^(callout|transition)/.test(s)?1e3:r),F.duration=Math.max(F.duration*(F.backwards?1-a/y:(a+1)/y),.75*F.duration,200)),t.Redirects[s].call(b,b,F||{},a,y,q,C.promise?C:d)}),a()}var I="Velocity: First argument ("+s+") was not a property map, a known action, or a registered redirect. Aborting.";return C.promise?C.rejecter(new Error(I)):console.log(I),a()}D="start"}var J={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},K=[];m.each(q,function(a,b){p.isNode(b)&&h.call(b)});var L,F=m.extend({},t.defaults,u);if(F.loop=parseInt(F.loop),L=2*F.loop-1,F.loop)for(var M=0;L>M;M++){var N={delay:F.delay,progress:F.progress};M===L-1&&(N.display=F.display,N.visibility=F.visibility,N.complete=F.complete),w(q,"reverse",N)}return a()}};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function(a){return setTimeout(function(){a(!0)},16)},k()):x=b.requestAnimationFrame||o}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},n={};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){j&&j.call(g,g);for(var c in l){n[c]=a.style[c];var d=t.CSS.getPropertyValue(a,c);l[c]="Down"===b?[d,0]:[0,d]}n.overflow=a.style.overflow,a.style.overflow="hidden"},i.complete=function(){for(var b in n)a.style[b]=n[b];k&&k.call(g,g),h&&h.resolver(g)},t(a,l,i)}}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j={opacity:"In"===b?1:0},k=i.complete;i.complete=e!==f-1?i.begin=null:function(){k&&k.call(g,g),h&&h.resolver(g)},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,j,i)}}),t}(window.jQuery||window.Zepto||window,window,document)}),!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&0===d-e,g=b&(Ab|Bb)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer"),function(a){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],a):"object"==typeof exports?a(require("jquery"),require("hammerjs")):a(jQuery,Hammer)}(function(a,b){function c(c,d){var e=a(c);e.data("hammer")||e.data("hammer",new b(e[0],d))}a.fn.hammer=function(a){return this.each(function(){c(this,a)})},b.Manager.prototype.emit=function(b){return function(c,d){b.call(this,c,d),a(this.element).trigger({type:c,gesture:d})}}(b.Manager.prototype.emit)}),function(a){a.fn.collapsible=function(b){var c={accordion:!0};return b=a.extend(c,b),this.each(function(){function b(a){a.parent().toggleClass("active"),a.parent().hasClass("active")?a.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1}):a.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1}),e.not(a).parent().removeClass("active"),e.not(a).parent().children(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1})}function d(a){a.parent().toggleClass("active"),a.parent().hasClass("active")?a.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1}):a.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1})}var e=(a(this),a(this).find(".collapsible-header"));c.accordion?(e.each(function(){a(this).click(function(){b(a(this))})}),b(e.filter(".active").first())):e.each(function(){a(this).hasClass("active")&&d(a(this)),a(this).click(function(){d(a(this))})})})}}(jQuery),function(a){a.fn.dropdown=function(b){var c={inDuration:300,outDuration:225,constrain_width:!0,hover:!0};b=a.extend(c,b),this.each(function(){function c(){var c=f.height();b.constrain_width===!0&&f.css("width",e.outerWidth()),f.css(d(e[0])?{display:"block",position:"fixed",height:0,top:e.offset().top-a(window).scrollTop(),left:e.offset().left}:{display:"block",top:e.offset().top,left:e.offset().left,height:0}),f.velocity({opacity:1},{duration:b.inDuration,queue:!1,easing:"easeOutQuad"}).velocity({height:c},{duration:b.inDuration,queue:!1,easing:"easeOutCubic",complete:function(){f.css("overflow-y","auto")}})}function d(b){var c=a(b),d=c.add(c.parents()),e=!1;return d.each(function(){return"fixed"===a(this).css("position")?(e=!0,!1):void 0}),e}var e=a(this),f=a("#"+e.attr("data-activates"));if(f.parent().is(a("body"))||(f.detach(),a("body").append(f)),b.hover)e.on("mouseover",function(){c()}),f.on("mouseleave",function(){f.velocity({opacity:0},{duration:b.outDuration,easing:"easeOutQuad",complete:function(){f.css({display:"none","overflow-y":""})}})});else{e.click(function(d){d.preventDefault(),d.stopPropagation(),c(),a(document).bind("click."+f.attr("id"),function(c){f.is(c.target)||e.is(c.target)||(f.velocity({opacity:0},{duration:b.outDuration,easing:"easeOutQuad",complete:function(){f.css({display:"none","overflow-y":""})}}),a(document).unbind("click."+f.attr("id")))})})}a(document).on("resize",function(){})})}}(jQuery),function(a){a.fn.extend({openModal:function(b){var c=this,d=a('<div id="lean-overlay"></div>');a("body").append(d);var e={opacity:.5,in_duration:300,out_duration:200,ready:void 0,complete:void 0,dismissible:!0};b=a.extend(e,b),b.dismissible&&(a("#lean-overlay").click(function(){a(c).closeModal(b)}),a(document).keyup(function(d){27===d.keyCode&&(a(c).closeModal(b),a(this).off())})),a(c).find(".modal-close").click(function(d){d.preventDefault(),a(c).closeModal(b)}),a("#lean-overlay").css({display:"block",opacity:0}),a(c).css({display:"block",top:"4%",opacity:0}),a("#lean-overlay").velocity({opacity:b.opacity},{duration:b.in_duration,queue:!1,ease:"easeOutCubic"}),a(c).velocity({top:"10%",opacity:1},{duration:b.in_duration,queue:!1,ease:"easeOutCubic",complete:function(){"function"==typeof b.ready&&b.ready()}})}}),a.fn.extend({closeModal:function(b){var c={out_duration:200,complete:void 0},b=a.extend(c,b);a("#lean-overlay").velocity({opacity:0},{duration:b.out_duration,queue:!1,ease:"easeOutQuart"}),a(this).fadeOut(b.out_duration,function(){a(this).css({top:0}),a("#lean-overlay").css({display:"none"}),"function"==typeof b.complete&&b.complete()})}}),a.fn.extend({leanModal:function(b){return this.each(function(){a(this).click(function(c){var d=a(this).attr("href");a(d).openModal(b),c.preventDefault()})})}})}(jQuery),function(a){a.fn.materialbox=function(){return this.each(function(){function b(){d=!1;var b=g.parent(".material-placeholder"),e=(window.innerWidth,window.innerHeight,g.data("width")),h=g.data("height");a("#materialbox-overlay").fadeOut(f,function(){c=!1,a(this).remove()}),g.velocity({width:e,height:h,left:0,top:0},{duration:f,queue:!1,easing:"easeOutQuad"}),a(".materialbox-caption").velocity({opacity:0},{duration:f+200,queue:!1,easing:"easeOutQuad",complete:function(){b.css({height:"",width:"",position:"",top:"",left:""}),g.css({height:"",position:"",top:"",left:"",width:"","max-width":"",position:"","z-index":""}),g.removeClass("active"),d=!0,a(this).remove()}})}var c=!1,d=!0,e=275,f=200,g=a(this),h=a("<div></div>").addClass("material-placeholder");g.wrap(h),g.on("click",function(){var f=g.parent(".material-placeholder"),h=window.innerWidth,i=window.innerHeight,j=g.width(),k=g.height();if(d===!1)return!1;if(c&&d===!0)return b(),!1;d=!1,g.addClass("active"),c=!0,f.css({width:f[0].getBoundingClientRect().width,height:f[0].getBoundingClientRect().height,position:"relative",top:0,left:0}),g.css({position:"absolute","z-index":1e3}).data("width",j).data("height",k);var l=a('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){d===!0&&b()});if(a("body").append(l),l.velocity({opacity:1},{duration:e,queue:!1,easing:"easeOutQuad"}),""!==g.data("caption")){var m=a('<div class="materialbox-caption"></div>');m.text(g.data("caption")),a("body").append(m),m.css({display:"inline"}),m.velocity({opacity:1},{duration:e,queue:!1,easing:"easeOutQuad"})}var n=0,o=j/h,p=k/i,q=0,r=0;o>p?(n=k/j,q=.9*h,r=.9*h*n):(n=j/k,q=.9*i*n,r=.9*i),g.hasClass("responsive-img")?g.velocity({"max-width":q,width:j},{duration:0,queue:!1,complete:function(){g.css({left:0,top:0}).velocity({height:r,width:q,left:a(document).scrollLeft()+h/2-g.parent(".material-placeholder").offset().left-q/2,top:a(document).scrollTop()+i/2-g.parent(".material-placeholder").offset().top-r/2},{duration:e,queue:!1,easing:"easeOutQuad",complete:function(){d=!0}})}}):g.css("left",0).css("top",0).velocity({height:r,width:q,left:a(document).scrollLeft()+h/2-g.parent(".material-placeholder").offset().left-q/2,top:a(document).scrollTop()+i/2-g.parent(".material-placeholder").offset().top-r/2},{duration:e,queue:!1,easing:"easeOutQuad",complete:function(){d=!0}})}),a(window).scroll(function(){c&&b()}),a(document).keyup(function(a){27===a.keyCode&&d===!0&&c&&b()})})}}(jQuery),function(a){a.fn.parallax=function(){var b=a(window).width();return this.each(function(){function c(c){if(b>992){var e=d.height(),f=d.children("img").height(),g=f-e,h=d.offset().top+e,i=d.offset().top,j=a(window).scrollTop(),k=window.innerHeight,l=j+k,m=(l-i)/(e+k),n=-1*g*m;h>j&&j+k>i&&d.children("img").first().css("bottom",n+"px"),c&&d.children("img").first().show()}else d.children("img").show()}var d=a(this);d.addClass("parallax"),c(!0),a(window).scroll(function(){b=a(window).width(),c(!1)
})})}}(jQuery),function(a){a.fn.tabs=function(){return this.each(function(){{var b=a(this);a(window).width()}b.width("100%");var c=a(this).children("li").length;b.children("li").each(function(){a(this).width(100/c+"%")});var d,e,f=b.find("li.tab a"),g=b.width(),h=b.find("li").first().outerWidth(),i=0;d=a(f.filter('[href="'+location.hash+'"]')),0===d.length&&(d=a(this).find("li.tab a.active").first()),0===d.length&&(d=a(this).find("li.tab a").first()),d.addClass("active"),i=f.index(d),0>i&&(i=0),e=a(d[0].hash),b.append('<div class="indicator"></div>');var j=b.find(".indicator");b.is(":visible")&&(j.css({right:g-(i+1)*h}),j.css({left:i*h})),a(window).resize(function(){g=b.width(),h=b.find("li").first().outerWidth(),0>i&&(i=0),0!==h&&0!==g&&(j.css({right:g-(i+1)*h}),j.css({left:i*h}))}),f.not(d).each(function(){a(this.hash).hide()}),b.on("click","a",function(c){g=b.width(),h=b.find("li").first().outerWidth(),d.removeClass("active"),e.hide(),d=a(this),e=a(this.hash),f=b.find("li.tab a"),d.addClass("active");var k=i;i=f.index(a(this)),0>i&&(i=0),e.show(),i-k>=0?(j.velocity({right:g-(i+1)*h},{duration:300,queue:!1,easing:"easeOutQuad"}),j.velocity({left:i*h},{duration:300,queue:!1,easing:"easeOutQuad",delay:80})):(j.velocity({left:i*h},{duration:300,queue:!1,easing:"easeOutQuad"}),j.velocity({right:g-(i+1)*h},{duration:300,queue:!1,easing:"easeOutQuad",delay:80})),c.preventDefault()})})}}(jQuery),function(a){var b,c,d;a.fn.tooltip=function(e){var f=5;c=!1;var g={delay:350};return e=a.extend(g,e),this.each(function(){var e=a(this),h=a("<div></div>");h.addClass("material-tooltip").text(e.attr("data-tooltip")),h.appendTo(a("body"));var i=a("<div></div>").addClass("backdrop");i.appendTo(h),i.css({top:0,left:0}),a(this).hover(function(a){a.stopPropagation(),b=0,d=setInterval(function(){if(b+=50,b>=g.delay&&0==c){c=!0,h.css({display:"block",left:"0px",top:"0px"});var a=e.outerWidth(),d=e.outerHeight(),j=e.attr("data-position"),k=h.outerHeight(),l=h.outerWidth(),m="0px",n="0px",o=8;"top"===j?(h.css({top:e.offset().top-k-f,left:e.offset().left+a/2-l/2}),m="-10px",i.css({borderRadius:"14px 14px 0 0",transformOrigin:"50% 90%",marginTop:k,marginLeft:l/2-i.width()/2})):"left"===j?(h.css({top:e.offset().top+d/2-k/2,left:e.offset().left-l-f}),n="-10px",i.css({width:"14px",height:"14px",borderRadius:"14px 0 0 14px",transformOrigin:"95% 50%",marginTop:k/2,marginLeft:l})):"right"===j?(h.css({top:e.offset().top+d/2-k/2,left:e.offset().left+a+f}),n="+10px",i.css({width:"14px",height:"14px",borderRadius:"0 14px 14px 0",transformOrigin:"5% 50%",marginTop:k/2,marginLeft:"0px"})):(h.css({top:e.offset().top+e.outerHeight()+f,left:e.offset().left+a/2-l/2}),m="+10px",i.css({marginLeft:l/2-i.width()/2})),o=l/8,8>o&&(o=8),("right"===j||"left"===j)&&(o=l/10,6>o&&(o=6)),h.velocity({opacity:1,marginTop:m,marginLeft:n},{duration:350,queue:!1}),i.css({display:"block"}).velocity({opacity:1},{duration:55,delay:0,queue:!1}).velocity({scale:o},{duration:300,delay:0,queue:!1,easing:"easeInOutQuad"})}},50)},function(){clearInterval(d),b=0,h.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:!1,delay:275}),i.velocity({opacity:0,scale:1},{duration:225,delay:275,queue:!1,complete:function(){i.css("display","none"),h.css("display","none"),c=!1}})})})}}(jQuery),function(a){"use strict";function b(a){return null!==a&&a===a.window}function c(a){return b(a)?a:9===a.nodeType&&a.defaultView}function d(a){var b,d,e={top:0,left:0},f=a&&a.ownerDocument;return b=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=c(f),{top:e.top+d.pageYOffset-b.clientTop,left:e.left+d.pageXOffset-b.clientLeft}}function e(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}function f(a){if(k.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(-1!==c.className.indexOf("waves-effect")){b=c;break}c=c.parentElement}return b}function g(b){var c=f(b);null!==c&&(j.show(b,c),"ontouchstart"in a&&(c.addEventListener("touchend",j.hide,!1),c.addEventListener("touchcancel",j.hide,!1)),c.addEventListener("mouseup",j.hide,!1),c.addEventListener("mouseleave",j.hide,!1))}var h=h||{},i=document.querySelectorAll.bind(document),j={duration:750,show:function(a,b){if(2===a.button)return!1;var c=b||this,f=document.createElement("div");f.className="waves-ripple",c.appendChild(f);var g=d(c),h=a.pageY-g.top,i=a.pageX-g.left,k="scale("+c.clientWidth/100*10+")";"touches"in a&&(h=a.touches[0].pageY-g.top,i=a.touches[0].pageX-g.left),f.setAttribute("data-hold",Date.now()),f.setAttribute("data-scale",k),f.setAttribute("data-x",i),f.setAttribute("data-y",h);var l={top:h+"px",left:i+"px"};f.className=f.className+" waves-notransition",f.setAttribute("style",e(l)),f.className=f.className.replace("waves-notransition",""),l["-webkit-transform"]=k,l["-moz-transform"]=k,l["-ms-transform"]=k,l["-o-transform"]=k,l.transform=k,l.opacity="1",l["-webkit-transition-duration"]=j.duration+"ms",l["-moz-transition-duration"]=j.duration+"ms",l["-o-transition-duration"]=j.duration+"ms",l["transition-duration"]=j.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.215, 0.610, 0.355, 1.000)",l["-moz-transition-timing-function"]="cubic-bezier(0.215, 0.610, 0.355, 1.000)",l["-o-transition-timing-function"]="cubic-bezier(0.215, 0.610, 0.355, 1.000)",l["transition-timing-function"]="cubic-bezier(0.215, 0.610, 0.355, 1.000)",f.setAttribute("style",e(l))},hide:function(a){k.touchup(a);var b=this,c=(1.4*b.clientWidth,null),d=b.getElementsByClassName("waves-ripple");if(!(d.length>0))return!1;c=d[d.length-1];var f=c.getAttribute("data-x"),g=c.getAttribute("data-y"),h=c.getAttribute("data-scale"),i=Date.now()-Number(c.getAttribute("data-hold")),l=350-i;0>l&&(l=0),setTimeout(function(){var a={top:g+"px",left:f+"px",opacity:"0","-webkit-transition-duration":j.duration+"ms","-moz-transition-duration":j.duration+"ms","-o-transition-duration":j.duration+"ms","transition-duration":j.duration+"ms","-webkit-transform":h,"-moz-transform":h,"-ms-transform":h,"-o-transform":h,transform:h};c.setAttribute("style",e(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},j.duration)},l)},wrapInput:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("input"===c.tagName.toLowerCase()){var d=c.parentNode;if("i"===d.tagName.toLowerCase()&&-1!==d.className.indexOf("waves-effect"))continue;var e=document.createElement("i");e.className=c.className+" waves-input-wrapper";var f=c.getAttribute("style");f||(f=""),e.setAttribute("style",f),c.className="waves-button-input",c.removeAttribute("style"),d.replaceChild(e,c),e.appendChild(c)}}}},k={touches:0,allowEvent:function(a){var b=!0;return"touchstart"===a.type?k.touches+=1:"touchend"===a.type||"touchcancel"===a.type?setTimeout(function(){k.touches>0&&(k.touches-=1)},500):"mousedown"===a.type&&k.touches>0&&(b=!1),b},touchup:function(a){k.allowEvent(a)}};h.displayEffect=function(b){b=b||{},"duration"in b&&(j.duration=b.duration),j.wrapInput(i(".waves-effect")),"ontouchstart"in a&&document.body.addEventListener("touchstart",g,!1),document.body.addEventListener("mousedown",g,!1)},h.attach=function(b){"input"===b.tagName.toLowerCase()&&(j.wrapInput([b]),b=b.parentElement),"ontouchstart"in a&&b.addEventListener("touchstart",g,!1),b.addEventListener("mousedown",g,!1)},a.Waves=h,$(document).ready(function(){h.displayEffect()})}(window),function(a){a.fn.sideNav=function(b){var c={activationWidth:70,edge:"left"};b=a.extend(c,b),a(this).each(function(){function c(){g=!1,h=!1,a("#sidenav-overlay").animate({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),"left"===b.edge?(a(".drag-target").css({width:"",right:"",left:"0"}),e.velocity({left:-1*(f+10)},{duration:200,queue:!1,easing:"easeOutCubic"})):(a(".drag-target").css({width:"",right:"0",left:""}),e.velocity({right:-1*(f+10)},{duration:200,queue:!1,easing:"easeOutCubic"}))}var d=a(this),e=a("#"+d.attr("data-activates")),f=240;"left"!=b.edge&&e.addClass("right-aligned"),a("body").append(a('<div class="drag-target"></div>')),a(".drag-target").css("left"===b.edge?{left:0}:{right:0}),e.hasClass("fixed")&&a(window).resize(function(){a(window).width()>1200&&e.attr("style")&&e.removeAttr("style")});var g=!1,h=!1;a(".drag-target").hammer({prevent_default:!1}).bind("tap",function(){h&&!g&&a("#sidenav-overlay").trigger("click")}).bind("pan",function(d){if("touch"===d.gesture.pointerType){{var g=(d.gesture.direction,d.gesture.center.x);d.gesture.center.y,d.gesture.velocityX}if(!a("#sidenav-overlay").length){var i=a('<div id="sidenav-overlay"></div>');i.css("opacity",0).click(function(){c()}),a("body").append(i)}if("left"===b.edge?g>f?g=f:0>g&&(g=0):g<a(window).width()-f&&(g=a(window).width()-f),"left"===b.edge?f/2>g?h=!1:g>=f/2&&(h=!0):g<a(window).width()-f/2?h=!0:g>=a(window).width()-f/2&&(h=!1),"left"===b.edge?e.css("left",g-f):e.css("right",-1*(g-f/2)),"left"===b.edge){var j=g/f;a("#sidenav-overlay").velocity({opacity:j},{duration:50,queue:!1,easing:"easeOutQuad"})}else{var j=Math.abs((g-a(window).width())/f);a("#sidenav-overlay").velocity({opacity:j},{duration:50,queue:!1,easing:"easeOutQuad"})}}}).bind("panend",function(c){if("touch"===c.gesture.pointerType){var d=c.gesture.velocityX;g=!1,"left"===b.edge?h||-.5>d?(e.velocity({left:0},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),a(".drag-target").css({width:"50%",right:0,left:""})):(!h||d>.3)&&(e.velocity({left:-240},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:50,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),a(".drag-target").css({width:"10%",right:"",left:0})):h||d>.5?(e.velocity({right:0},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),a(".drag-target").css({width:"50%",right:"",left:0})):(!h||-.3>d)&&(e.velocity({right:-240},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:50,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),a(".drag-target").css({width:"10%",right:0,left:""}))}}),d.click(function(){if(e.hasClass("active"))h=!1,g=!1,c();else{"left"===b.edge?(a(".drag-target").css({width:"50%",right:0,left:""}),e.velocity({left:0},{duration:300,queue:!1,easing:"easeOutQuad"})):(a(".drag-target").css({width:"50%",right:"",left:0}),e.velocity({right:0},{duration:300,queue:!1,easing:"easeOutQuad"}));var d=a('<div id="sidenav-overlay"></div>');d.css("opacity",0).click(function(){h=!1,g=!1,c(),d.animate({opacity:0},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}})}),a("body").append(d),d.animate({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){h=!0,g=!1}})}return!1})})}}(jQuery),function(a){function b(b,c,d,e){var f=a();return a.each(g,function(a,g){if(g.height()>0){var h=g.offset().top,i=g.offset().left,j=i+g.width(),k=h+g.height(),l=!(i>c||e>j||h>d||b>k);l&&f.push(g)}}),f}function c(){++j;var c=f.scrollTop(),d=f.scrollLeft(),e=d+f.width(),g=c+f.height(),i=b(c+k.top+200,e+k.right,g+k.bottom,d+k.left);a.each(i,function(a,b){var c=b.data("scrollSpy:ticks");"number"!=typeof c&&b.triggerHandler("scrollSpy:enter"),b.data("scrollSpy:ticks",j)}),a.each(h,function(a,b){var c=b.data("scrollSpy:ticks");"number"==typeof c&&c!==j&&(b.triggerHandler("scrollSpy:exit"),b.data("scrollSpy:ticks",null))}),h=i}function d(){f.trigger("scrollSpy:winSize")}function e(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:l(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=l();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}}var f=a(window),g=[],h=[],i=!1,j=0,k={top:0,right:0,bottom:0,left:0},l=Date.now||function(){return(new Date).getTime()};a.scrollSpy=function(b,d){var h=[];b=a(b),b.each(function(b,c){g.push(a(c)),a(c).data("scrollSpy:id",b),a("a[href=#"+a(c).attr("id")+"]").click(function(b){b.preventDefault();var c=a(this.hash).offset().top+1;a(".tabs-wrapper").length?a("html, body").animate({scrollTop:c-60},{duration:400,easing:"easeOutCubic"}):a("html, body").animate({scrollTop:c},{duration:400,easing:"easeOutCubic"})})}),d=d||{throttle:100},k.top=d.offsetTop||0,k.right=d.offsetRight||0,k.bottom=d.offsetBottom||0,k.left=d.offsetLeft||0;var j=e(c,d.throttle||100),l=function(){a(document).ready(j)};return i||(f.on("scroll",l),f.on("resize",l),i=!0),setTimeout(l,0),b.on("scrollSpy:enter",function(){h=a.grep(h,function(a){return 0!=a.height()});var b=a(this);h[0]?(a("a[href=#"+h[0].attr("id")+"]").removeClass("active"),b.data("scrollSpy:id")<h[0].data("scrollSpy:id")?h.unshift(a(this)):h.push(a(this))):h.push(a(this)),a("a[href=#"+h[0].attr("id")+"]").addClass("active")}),b.on("scrollSpy:exit",function(){if(h=a.grep(h,function(a){return 0!=a.height()}),h[0]){a("a[href=#"+h[0].attr("id")+"]").removeClass("active");var b=a(this);h=a.grep(h,function(a){return a.attr("id")!=b.attr("id")}),h[0]&&a("a[href=#"+h[0].attr("id")+"]").addClass("active")}}),b},a.winSizeSpy=function(b){return a.winSizeSpy=function(){return f},b=b||{throttle:100},f.on("resize",e(d,b.throttle||100))},a.fn.scrollSpy=function(b){return a.scrollSpy(a(this),b)}}(jQuery),function(a){a(document).ready(function(){var b="input[type=text], input[type=password], input[type=email], input[type=tel], input[type=number], textarea";if(a(document).on("change",b,function(){0!==a(this).val().length&&a(this).siblings("label, i").addClass("active")}),a(document).ready(function(){a(b).each(function(b,c){a(c).val().length>0&&a(this).siblings("label, i").addClass("active")})}),a(document).on("reset",function(c){a(c.target).is("form")&&(a(this).find(b).removeClass("valid").removeClass("invalid"),a(this).find("select.initialized").each(function(){var b=a(this).find("option[selected]").text();a(this).prev("span.select-dropdown").html(b)}))}),a(document).on("focus",b,function(){a(this).siblings("label, i").addClass("active")}),a(document).on("blur",b,function(){0===a(this).val().length?(a(this).siblings("label, i").removeClass("active"),a(this).hasClass("validate")&&(a(this).removeClass("valid"),a(this).removeClass("invalid"))):a(this).hasClass("validate")&&(a(this).is(":valid")?(a(this).removeClass("invalid"),a(this).addClass("valid")):(a(this).removeClass("valid"),a(this).addClass("invalid")))}),0===a(".hiddendiv").length){var c=a('<div class="hiddendiv common"></div>'),d=null;a("body").append(c)}var e=(a(".hiddendiv"),".materialize-textarea");a("body").on("keyup keydown",e,function(){d=a(this).val(),d=d.replace(/\n/g,"<br>"),c.html(d+"<br>"),a(this).css("height",c.height())});var f="input[type=range]",g=!1;a(f).each(function(){var b=a('<span class="thumb"><span class="value"></span></span>');a(this).after(b)});var h=".range-field";a(document).on("mousedown",h,function(b){var c=a(this).children(".thumb");c.length<=0&&(c=a('<span class="thumb"><span class="value"></span></span>'),a(this).append(c)),g=!0,a(this).addClass("active"),c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"});var d=b.pageX-a(this).offset().left,e=a(this).outerWidth();0>d?d=0:d>e&&(d=e),c.addClass("active").css("left",d),c.find(".value").html(a(this).children("input[type=range]").val())}),a(document).on("mouseup",h,function(){g=!1,a(this).removeClass("active")}),a(document).on("mousemove",h,function(b){var c=a(this).children(".thumb");if(g){c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"});var d=b.pageX-a(this).offset().left,e=a(this).outerWidth();0>d?d=0:d>e&&(d=e),c.addClass("active").css("left",d),c.find(".value").html(a(this).children("input[type=range]").val())}}),a(document).on("mouseout",h,function(){if(!g){var b=a(this).children(".thumb");b.hasClass("active")&&b.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),b.removeClass("active")}}),a.fn.material_select=function(b){a(this).each(function(){if($select=a(this),!$select.hasClass("browser-default")&&!$select.hasClass("initialized")){var c=i(),d=a('<div class="select-wrapper"></div>'),e=a('<ul id="select-options-'+c+'" class="dropdown-content select-dropdown"></ul>'),f=$select.children("option");if(void 0!==$select.find("option:selected"))var g=$select.find("option:selected");else var g=e.first();f.each(function(){e.append(a('<li class="'+(a(this).is(":disabled")?"disabled":"")+'"><span>'+a(this).html()+"</span></li>"))}),e.find("li").each(function(c){var d=$select;a(this).click(function(){a(this).hasClass("disabled")||(d.find("option").eq(c).prop("selected",!0),d.trigger("change"),d.prev("span.select-dropdown").html(a(this).text()),"undefined"!=typeof b&&b())})}),$select.wrap(d);var h=a('<span class="select-dropdown '+($select.is(":disabled")?"disabled":"")+'" data-activates="select-options-'+c+'">'+g.html()+"</span>");$select.before(h),a("body").append(e),$select.is(":disabled")||h.dropdown({hover:!1}),$select.addClass("initialized")}})};var i=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}()})}(jQuery),function(a){a.fn.slider=function(b){var c={indicators:!0,height:400,transition:500,interval:6e3};return b=a.extend(c,b),this.each(function(){function c(a,b){a.hasClass("center-align")?a.velocity({opacity:0,translateY:-100},{duration:b,queue:!1}):a.hasClass("right-align")?a.velocity({opacity:0,translateX:100},{duration:b,queue:!1}):a.hasClass("left-align")&&a.velocity({opacity:0,translateX:-100},{duration:b,queue:!1})}function d(a){a>=h.length?a=0:0>a&&(a=h.length-1),i=g.find(".active").index(),i!=a&&(e=h.eq(i),$caption=e.find(".caption"),e.removeClass("active"),e.velocity({opacity:0},{duration:b.transition,queue:!1,easing:"easeOutQuad",complete:function(){h.not(".active").velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:!1})}}),c($caption,b.transition),b.indicators&&j.eq(i).removeClass("active"),h.eq(a).velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),h.eq(a).find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,delay:b.transition,queue:!1,easing:"easeOutQuad"}),h.eq(a).addClass("active"),b.indicators&&j.eq(a).addClass("active"))}var e,f=a(this),g=f.find("ul.slides").first(),h=g.find("li"),i=g.find(".active").index();if(-1!=i&&(e=h.eq(i)),400!=b.height&&(f.height(b.height+40),g.height(b.height)),h.find(".caption").each(function(){c(a(this),0)}),h.find("img").each(function(){a(this).load(function(){a(this).width()<a(this).parent().width()&&a(this).css({width:"100%",height:"auto"})})}),b.indicators){var j=a('<ul class="indicators"></ul>');h.each(function(){var c=a('<li class="indicator-item"></li>');c.click(function(){var c=g.parent(),e=c.find(a(this)).index();d(e),clearInterval($interval),$interval=setInterval(function(){i=g.find(".active").index(),h.length==i+1?i=0:i+=1,d(i)},b.transition+b.interval)}),j.append(c)}),f.append(j),j=f.find("ul.indicators").find("li.indicator-item")}e?e.show():(h.first().addClass("active").velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),i=0,e=h.eq(i),b.indicators&&j.eq(i).addClass("active")),e.find("img").load(function(){e.find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,queue:!1,easing:"easeOutQuad"})}),$interval=setInterval(function(){i=g.find(".active").index(),d(i+1)},b.transition+b.interval);var k=!1,l=!1,m=!1;f.hammer({prevent_default:!1}).bind("pan",function(a){if("touch"===a.gesture.pointerType){clearInterval($interval);var b=a.gesture.direction,c=a.gesture.deltaX,d=a.gesture.velocityX;$curr_slide=g.find(".active"),$curr_slide.velocity({translateX:c},{duration:50,queue:!1,easing:"easeOutQuad"}),4===b&&(c>f.innerWidth()/2||-.65>d)?m=!0:2===b&&(c<-1*f.innerWidth()/2||d>.65)&&(l=!0);var e;l&&(e=$curr_slide.next(),0===e.length&&(e=h.first()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"})),m&&(e=$curr_slide.prev(),0===e.length&&(e=h.last()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(a){"touch"===a.gesture.pointerType&&($curr_slide=g.find(".active"),k=!1,curr_index=g.find(".active").index(),m||l?l?(d(curr_index+1),$curr_slide.velocity({translateX:-1*f.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})):m&&(d(curr_index-1),$curr_slide.velocity({translateX:f.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})):$curr_slide.velocity({translateX:0},{duration:300,queue:!1,easing:"easeOutQuad"}),l=!1,m=!1,clearInterval($interval),$interval=setInterval(function(){i=g.find(".active").index(),h.length==i+1?i=0:i+=1,d(i)},b.transition+b.interval))})})}}(jQuery),function(a){a(document).ready(function(){a(document).on("click.card",".card",function(b){a(this).find(".card-reveal").length&&(a(b.target).is(a(".card-reveal .card-title"))||a(b.target).is(a(".card-reveal .card-title i"))?a(this).find(".card-reveal").velocity({translateY:0},{duration:300,queue:!1,easing:"easeOutQuad"}):(a(b.target).is(a(".card .activator"))||a(b.target).is(a(".card .activator i")))&&a(this).find(".card-reveal").velocity({translateY:"-100%"},{duration:300,queue:!1,easing:"easeOutQuad"}))})})}(jQuery),function(a){a(document).ready(function(){var b=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}();a.fn.pushpin=function(c){var d={top:0,bottom:1/0,offset:0};return c=a.extend(d,c),$index=0,this.each(function(){function d(a){a.removeClass("pin-top"),a.removeClass("pinned"),a.removeClass("pin-bottom")}function e(b,e){b.each(function(){c.top<=e&&c.bottom>=e&&!a(this).hasClass("pinned")&&(d(a(this)),a(this).css("top",c.offset),a(this).addClass("pinned")),e<c.top&&!a(this).hasClass("pin-top")&&(d(a(this)),a(this).css("top",0),a(this).addClass("pin-top")),e>c.bottom&&!a(this).hasClass("pin-bottom")&&(d(a(this)),a(this).addClass("pin-bottom"),a(this).css("top",c.bottom-h))})}var f=b(),g=a(this),h=a(this).offset().top;e(g,a(window).scrollTop()),a(window).on("scroll."+f,function(){var b=a(window).scrollTop()+c.offset;e(g,b)})})}})}(jQuery),function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):this.Picker=a(jQuery)}(function(a){function b(f,g,i,l){function m(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",y.component.nodes(t.open),v.box),v.wrap),v.frame),v.holder)}function n(){w.data(g,y).addClass(v.input).attr("tabindex",-1).val(w.data("value")?y.get("select",u.format):f.value),u.editable||w.on("focus."+t.id+" click."+t.id,function(a){a.preventDefault(),y.$root[0].focus()}).on("keydown."+t.id,q),e(f,{haspopup:!0,expanded:!1,readonly:!1,owns:f.id+"_root"})}function o(){y.$root.on({keydown:q,focusin:function(a){y.$root.removeClass(v.focused),a.stopPropagation()},"mousedown click":function(b){var c=b.target;c!=y.$root.children()[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is("input, select, textarea, button, option")||(b.preventDefault(),y.$root[0].focus()))}}).on({focus:function(){w.addClass(v.target)},blur:function(){w.removeClass(v.target)}}).on("focus.toOpen",r).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var b=a(this),c=b.data(),d=b.hasClass(v.navDisabled)||b.hasClass(v.disabled),e=h();e=e&&(e.type||e.href),(d||e&&!a.contains(y.$root[0],e))&&y.$root[0].focus(),!d&&c.nav?y.set("highlight",y.component.item.highlight,{nav:c.nav}):!d&&"pick"in c?y.set("select",c.pick):c.clear?y.clear().close(!0):c.close&&y.close(!0)}),e(y.$root[0],"hidden",!0)}function p(){var b;u.hiddenName===!0?(b=f.name,f.name=""):(b=["string"==typeof u.hiddenPrefix?u.hiddenPrefix:"","string"==typeof u.hiddenSuffix?u.hiddenSuffix:"_submit"],b=b[0]+f.name+b[1]),y._hidden=a('<input type=hidden name="'+b+'"'+(w.data("value")||f.value?' value="'+y.get("select",u.formatSubmit)+'"':"")+">")[0],w.on("change."+t.id,function(){y._hidden.value=f.value?y.get("select",u.formatSubmit):""}),u.container?a(u.container).append(y._hidden):w.after(y._hidden)}function q(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(y.close(),!1):void((32==b||c||!t.open&&y.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?y.clear().close():y.open()))}function r(a){a.stopPropagation(),"focus"==a.type&&y.$root.addClass(v.focused),y.open()}if(!f)return b;var s=!1,t={id:f.id||"P"+Math.abs(~~(Math.random()*new Date))},u=i?a.extend(!0,{},i.defaults,l):l||{},v=a.extend({},b.klasses(),u.klass),w=a(f),x=function(){return this.start()},y=x.prototype={constructor:x,$node:w,start:function(){return t&&t.start?y:(t.methods={},t.start=!0,t.open=!1,t.type=f.type,f.autofocus=f==h(),f.readOnly=!u.editable,f.id=f.id||t.id,"text"!=f.type&&(f.type="text"),y.component=new i(y,u),y.$root=a(b._.node("div",m(),v.picker,'id="'+f.id+'_root" tabindex="0"')),o(),u.formatSubmit&&p(),n(),u.container?a(u.container).append(y.$root):w.after(y.$root),y.on({start:y.component.onStart,render:y.component.onRender,stop:y.component.onStop,open:y.component.onOpen,close:y.component.onClose,set:y.component.onSet}).on({start:u.onStart,render:u.onRender,stop:u.onStop,open:u.onOpen,close:u.onClose,set:u.onSet}),s=c(y.$root.children()[0]),f.autofocus&&y.open(),y.trigger("start").trigger("render"))},render:function(a){return a?y.$root.html(m()):y.$root.find("."+v.box).html(y.component.nodes(t.open)),y.trigger("render")},stop:function(){return t.start?(y.close(),y._hidden&&y._hidden.parentNode.removeChild(y._hidden),y.$root.remove(),w.removeClass(v.input).removeData(g),setTimeout(function(){w.off("."+t.id)},0),f.type=t.type,f.readOnly=!1,y.trigger("stop"),t.methods={},t.start=!1,y):y},open:function(c){return t.open?y:(w.addClass(v.active),e(f,"expanded",!0),setTimeout(function(){y.$root.addClass(v.opened),e(y.$root[0],"hidden",!1)},0),c!==!1&&(t.open=!0,s&&k.css("overflow","hidden").css("padding-right","+="+d()),y.$root[0].focus(),j.on("click."+t.id+" focusin."+t.id,function(a){var b=a.target;b!=f&&b!=document&&3!=a.which&&y.close(b===y.$root.children()[0])}).on("keydown."+t.id,function(c){var d=c.keyCode,e=y.component.key[d],f=c.target;27==d?y.close(!0):f!=y.$root[0]||!e&&13!=d?a.contains(y.$root[0],f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(y.component.key.go,y,[b._.trigger(e)]):y.$root.find("."+v.highlighted).hasClass(v.disabled)||y.set("select",y.component.item.highlight).close())})),y.trigger("open"))},close:function(a){return a&&(y.$root.off("focus.toOpen")[0].focus(),setTimeout(function(){y.$root.on("focus.toOpen",r)},0)),w.removeClass(v.active),e(f,"expanded",!1),setTimeout(function(){y.$root.removeClass(v.opened+" "+v.focused),e(y.$root[0],"hidden",!0)},0),t.open?(t.open=!1,s&&k.css("overflow","").css("padding-right","-="+d()),j.off("."+t.id),y.trigger("close")):y},clear:function(a){return y.set("clear",null,a)},set:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(d=g&&a.isPlainObject(c)?c:d||{},b){g||(h[b]=c);for(e in h)f=h[e],e in y.component.item&&(void 0===f&&(f=null),y.component.set(e,f,d)),("select"==e||"clear"==e)&&w.val("clear"==e?"":y.get(e,u.format)).trigger("change");y.render()}return d.muted?y:y.trigger("set",h)},get:function(a,c){if(a=a||"value",null!=t[a])return t[a];if("valueSubmit"==a){if(y._hidden)return y._hidden.value;a="value"}if("value"==a)return f.value;if(a in y.component.item){if("string"==typeof c){var d=y.component.get(a);return d?b._.trigger(y.component.formats.toString,y.component,[c,d]):""}return y.component.get(a)}},on:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(b){g||(h[b]=c);for(e in h)f=h[e],d&&(e="_"+e),t.methods[e]=t.methods[e]||[],t.methods[e].push(f)}return y},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;a<namesCount;a+=1)b=c[a],b in t.methods&&delete t.methods[b];return y},trigger:function(a,c){var d=function(a){var d=t.methods[a];d&&d.map(function(a){b._.trigger(a,y,[c])})};return d("_"+a),d(a),y}};return new x}function c(a){var b,c="position";return a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=getComputedStyle(a)[c]),"fixed"==b}function d(){if(k.height()<=i.height())return 0;var b=a('<div style="visibility:hidden;width:100px" />').appendTo("body"),c=b[0].offsetWidth;b.css("overflow","scroll");var d=a('<div style="width:100%" />').appendTo(b),e=d[0].offsetWidth;return b.remove(),c-e}function e(b,c,d){if(a.isPlainObject(c))for(var e in c)f(b,e,c[e]);else f(b,c,d)}function f(a,b,c){a.setAttribute(("role"==b?"":"aria-")+b,c)}function g(b,c){a.isPlainObject(b)||(b={attribute:c}),c="";for(var d in b){var e=("role"==d?"":"aria-")+d,f=b[d];c+=null==f?"":e+'="'+b[d]+'"'}return c}function h(){try{return document.activeElement}catch(a){}}var i=a(window),j=a(document),k=a(document.documentElement);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",target:a+"__input--target",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0},ariaAttr:g},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return"picker"==e?g:g&&"string"==typeof e?b._.trigger(g[e],g,[f]):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e)})},a.fn[c].defaults=d.defaults},b}),function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):"object"==typeof exports?module.exports=a(require("./picker.js"),require("jquery")):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node[0],e=d.value,f=a.$node.data("value"),g=f||e,h=f?b.formatSubmit:b.format,i=function(){return d.currentStyle?"rtl"==d.currentStyle.direction:"rtl"==getComputedStyle(a.$root[0]).direction};c.settings=b,c.$node=a.$node,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},c.item={},c.item.clear=null,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),g?c.set("select",g,{format:h}):c.set("select",null).set("highlight",c.item.now),c.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=c.item.highlight,d=new Date(b.year,b.month,b.date+a);c.set("highlight",d,{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){var c=this.value;c&&(a.set("highlight",[a.get("view").year,c,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus"))}),a.$root.find("."+b.klass.selectYear).on("change",function(){var c=this.value;c&&(a.set("highlight",[c,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus"))
})},1).on("open",function(){var d="";c.disabled(c.get("now"))&&(d=":not(."+b.klass.buttonToday+")"),a.$root.find("button"+d+", select").attr("disabled",!1)},1).on("close",function(){a.$root.find("button, select").attr("disabled",!0)},1)}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?("clear"==a&&(a="select"),e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-1/0||1/0==c?e=c:b.isPlainObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isPlainObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isPlainObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isPlainObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(a,b){var c=this;return b?"string"==typeof b?b=c.parse(a,b):f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-1/0:1/0,b},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0)}return f.isInteger(a)}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date+(c.pick===n.pick?0:-1)])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+(c.pick===o.pick?0:1)])),!h||!i);)c=j.create([c.year,c.month,c.date+l]);return c},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isPlainObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isPlainObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.parse=function(a,b,c){var d=this,e={};return b&&"string"==typeof b?(c&&c.format||(c=c||{},c.format=d.settings.format),d.formats.toArray(c.format).map(function(a){var c=d.formats[a],g=c?f.trigger(c,d,[b,e]):a.replace(/^!/,"").length;c&&(e[a]=b.substr(0,g)),b=b.substr(g)}),[e.yyyy||e.yy,+(e.mm||e.m)-1,e.dd||e.d]):b},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)+1),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?f.digits(a):b.date},dd:function(a,b){return a?2:f.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?f.digits(a):b.month+1},mm:function(a,b){return a?2:f.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isPlainObject(a)&&b.isPlainObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},c.prototype.isDateOverlap=function(a,c){var d=this,e=d.settings.firstDay?1:0;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?(a=a%7+e,a===d.create(c).day+1):f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?(c=c%7+e,c===d.create(a).day+1):b.isPlainObject(a)&&b.isPlainObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1)if(d.isDateExact(a,e[g])){c=!0;break}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isPlainObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isPlainObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(e[i],a)){e[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a,b){return c.firstDay&&(a.push(a.shift()),b.push(b.shift())),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function(d){return[a[d],c.klass.weekdays,'scope=col title="'+b[d]+'"']}})))}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysLetter).slice(0),c.weekdaysFull.slice(0)),p=function(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1)+" "+f.ariaAttr({role:"button",controls:b.$node[0].id+"_table"})+' title="'+(a?c.labelMonthNext:c.labelMonthPrev)+'"')},q=function(d){var e=c.showMonthsShort?c.monthsShort:c.monthsFull;return"short_months"==d&&(e=c.monthsShort),c.selectMonths?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function(a){return[e[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),c.klass.selectMonth,(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelMonthSelect+'"'):"short_months"==d?f.node("div",e[k.month]):f.node("div",e[k.month],c.klass.month)},r=function(d){var e=k.year,g=c.selectYears===!0?5:~~(c.selectYears/2);if(g){var h=m.year,i=n.year,j=e-g,l=e+g;if(h>j&&(l+=h-j,j=h),l>i){var o=j-h,p=l-i;j-=o>p?p:o,l=i}return f.node("select",f.group({min:j,max:l,i:1,node:"option",item:function(a){return[a,0,"value="+a+(e==a?" selected":"")]}}),c.klass.selectYear,(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelYearSelect+'"')}return"raw"==d?f.node("div",e):f.node("div",e,c.klass.year)};return createDayLabel=function(){return null!=i?f.node("div",i.date):f.node("div",h.date)},createWeekdayLabel=function(){var a;a=null!=i?i.day:h.day;var b=c.weekdaysFull[a];return b},f.node("div",f.node("div",createWeekdayLabel(),"picker__weekday-display")+f.node("div",q("short_months"),c.klass.month_display)+f.node("div",createDayLabel(),c.klass.day_display)+f.node("div",r("raw"),c.klass.year_display),c.klass.date_display)+f.node("div",f.node("div",(c.selectYears?r()+q():q()+r())+p()+p(1),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[f.group({min:d*a-k.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick,o=f.trigger(b.formats.toString,b,[c.format,a]);return[f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ")}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"gridcell",label:o,selected:d&&b.$node.val()===o?!0:null,activedescendant:e?!0:null,disabled:g?!0:null})),"",f.ariaAttr({role:"presentation"})]}})]}})),c.klass.table,'id="'+b.$node[0].id+'_table" '+f.ariaAttr({role:"grid",controls:b.$node[0].id,readonly:!0})),c.klass.calendar_container)+f.node("div",f.node("button",c.today,"btn-flat picker__today","type=button data-pick="+h.pick+(a&&!b.disabled(h)?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.clear,"btn-flat picker__clear","type=button data-clear=1"+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.close,"btn-flat picker__close","type=button data-close=true "+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id})),c.klass.footer)},c.defaults=function(a){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",date_display:a+"date-display",day_display:a+"day-display",month_display:a+"month-display",year_display:a+"year-display",calendar_container:a+"calendar-container",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today",buttonClose:a+"button--close"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)});
/* ===========================================================
 * pagepiling.js 0.0.9 (Beta)
 *
 * https://github.com/alvarotrigo/pagePiling.js
 * MIT licensed
 *
 * Copyright (C) 2014 alvarotrigo.com - A project by Alvaro Trigo
 *
 * ========================================================== */

(function(b){b.fn.pagepiling=function(c){function A(a){var c=b(".pp-section.active").index(".pp-section");a=a.index(".pp-section");return c>a?"up":"down"}function g(a,f){var d={destination:a,animated:f,activeSection:b(".pp-section.active"),anchorLink:a.data("anchor"),sectionIndex:a.index(".pp-section"),toMove:a,yMovement:A(a),leavingSection:b(".pp-section.active").index(".pp-section")+1};d.activeSection.is(a)||("undefined"===typeof d.animated&&(d.animated=!0),"undefined"!==typeof d.anchorLink&&c.anchors.length&&
(location.hash=d.anchorLink),d.destination.addClass("active").siblings().removeClass("active"),d.sectionsToMove=B(d),"down"===d.yMovement?(d.translate3d="vertical"!==c.direction?"translate3d(-100%, 0px, 0px)":"translate3d(0px, -100%, 0px)",d.scrolling="-100%",c.css3||d.sectionsToMove.each(function(a){a!=d.activeSection.index(".pp-section")&&b(this).css(m(d.scrolling))}),d.animateSection=d.activeSection):(d.translate3d="translate3d(0px, 0px, 0px)",d.scrolling="0",d.animateSection=a),b.isFunction(c.onLeave)&&
c.onLeave.call(this,d.leavingSection,d.sectionIndex+1,d.yMovement),C(d),D(d.anchorLink),E(d.anchorLink,d.sectionIndex),r=d.anchorLink,s=(new Date).getTime())}function C(a){c.css3?(t(a.animateSection,a.translate3d,a.animated),a.sectionsToMove.each(function(){t(b(this),a.translate3d,a.animated)}),setTimeout(function(){n(a)},c.scrollingSpeed)):(a.scrollOptions=m(a.scrolling),a.animated?a.animateSection.animate(a.scrollOptions,c.scrollingSpeed,c.easing,function(){u(a);n(a)}):(a.animateSection.css(m(a.scrolling)),
setTimeout(function(){u(a);n(a)},400)))}function n(a){b.isFunction(c.afterLoad)&&c.afterLoad.call(this,a.anchorLink,a.sectionIndex+1)}function B(a){return"down"===a.yMovement?b(".pp-section").map(function(c){if(c<a.destination.index(".pp-section"))return b(this)}):b(".pp-section").map(function(c){if(c>a.destination.index(".pp-section"))return b(this)})}function u(a){"up"===a.yMovement&&a.sectionsToMove.each(function(c){b(this).css(m(a.scrolling))})}function m(a){return"vertical"===c.direction?{top:a}:
{left:a}}function p(){return(new Date).getTime()-s<600+c.scrollingSpeed?!0:!1}function t(a,b,c){a.toggleClass("pp-easing",c);a.css({"-webkit-transform":b,"-moz-transform":b,"-ms-transform":b,transform:b})}function h(a){if(!p()){a=window.event||a;a=Math.max(-1,Math.min(1,a.wheelDelta||-a.deltaY||-a.detail));var c=b(".pp-section.active"),c=v(c);0>a?k("down",c):k("up",c);return!1}}function k(a,c){if("down"==a)var d="bottom",e=b.fn.pagepiling.moveSectionDown;else d="top",e=b.fn.pagepiling.moveSectionUp;
if(0<c.length)if(isScrolled(d,c))e();else return!0;else e()}function v(a){return scrollable=a.find(".pp-scrollable")}function w(){return window.PointerEvent?{down:"pointerdown",move:"pointermove",up:"pointerup"}:{down:"MSPointerDown",move:"MSPointerMove",up:"MSPointerUp"}}function x(a){var b=[];window.navigator.msPointerEnabled?(b.y=a.pageY,b.x=a.pageX):(b.y=a.touches[0].pageY,b.x=a.touches[0].pageX);return b}function F(a){a=x(a.originalEvent);l=a.y;touchStartX=a.x}function G(a){var f=a.originalEvent;
y(a.target)||(a.preventDefault(),a=b(".pp-section.active"),a=v(a),p()||(f=x(f),touchEndY=f.y,touchEndX=f.x,"horizontal"===c.direction&&Math.abs(touchStartX-touchEndX)>Math.abs(l-touchEndY)?Math.abs(touchStartX-touchEndX)>e.width()/100*c.touchSensitivity&&(touchStartX>touchEndX?k("down",a):touchEndX>touchStartX&&k("up",a)):Math.abs(l-touchEndY)>e.height()/100*c.touchSensitivity&&(l>touchEndY?k("down",a):touchEndY>l&&k("up",a))))}function y(a,f){f=f||0;var d=b(a).parent();return f<c.normalScrollElementTouchThreshold&&
d.is(c.normalScrollElements)?!0:f==c.normalScrollElementTouchThreshold?!1:y(d,++f)}function H(){b("body").append('<div id="pp-nav"><ul></ul></div>');var a=b("#pp-nav");a.css("color",c.navigation.textColor);a.addClass(c.navigation.position);for(var f=0;f<b(".pp-section").length;f++){var d="";c.anchors.length&&(d=c.anchors[f]);if("undefined"!==typeof c.navigation.tooltips){var e=c.navigation.tooltips[f];"undefined"===typeof e&&(e="")}a.find("ul").append('<li data-tooltip="'+e+'"><a href="#'+d+'"><span></span></a></li>')}a.find("span").css("border-color",
c.navigation.bulletsColor)}function E(a,f){c.navigation&&(b("#pp-nav").find(".active").removeClass("active"),a?b("#pp-nav").find('a[href="#'+a+'"]').addClass("active"):b("#pp-nav").find("li").eq(f).find("a").addClass("active"))}function D(a){c.menu&&(b(c.menu).find(".active").removeClass("active"),b(c.menu).find('[data-menuanchor="'+a+'"]').addClass("active"))}function I(){var a=document.createElement("p"),b,c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",
MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(a,null);for(var e in c)void 0!==a.style[e]&&(a.style[e]="translate3d(1px,1px,1px)",b=window.getComputedStyle(a).getPropertyValue(c[e]));document.body.removeChild(a);return void 0!==b&&0<b.length&&"none"!==b}var e=b(this),r,s=0,z="ontouchstart"in window||0<navigator.msMaxTouchPoints,l=touchStartX=touchEndY=touchEndX=0;c=b.extend({direction:"vertical",menu:null,verticalCentered:!0,sectionsColor:[],anchors:[],scrollingSpeed:700,
easing:"swing",loopBottom:!1,loopTop:!1,css3:!0,navigation:{textColor:"#000",bulletsColor:"#000",position:"right",tooltips:["section1","section2","section3","section4"]},normalScrollElements:null,normalScrollElementTouchThreshold:5,touchSensitivity:5,keyboardScrolling:!0,sectionSelector:".section",animateAnchor:!1,afterLoad:null,onLeave:null,afterRender:null},c);b.fn.pagepiling.setScrollingSpeed=function(a){c.scrollingSpeed=a};b.fn.pagepiling.setMouseWheelScrolling=function(a){a?e.get(0).addEventListener?
(e.get(0).addEventListener("mousewheel",h,!1),e.get(0).addEventListener("wheel",h,!1)):e.get(0).attachEvent("onmousewheel",h):e.get(0).addEventListener?(e.get(0).removeEventListener("mousewheel",h,!1),e.get(0).removeEventListener("wheel",h,!1)):e.get(0).detachEvent("onmousewheel",h)};b.fn.pagepiling.setAllowScrolling=function(a){a?(b.fn.pagepiling.setMouseWheelScrolling(!0),z&&(MSPointer=w(),e.off("touchstart "+MSPointer.down).on("touchstart "+MSPointer.down,F),e.off("touchmove "+MSPointer.move).on("touchmove "+
MSPointer.move,G))):(b.fn.pagepiling.setMouseWheelScrolling(!1),z&&(MSPointer=w(),e.off("touchstart "+MSPointer.down),e.off("touchmove "+MSPointer.move)))};b.fn.pagepiling.setKeyboardScrolling=function(a){c.keyboardScrolling=a};b.fn.pagepiling.moveSectionUp=function(){var a=b(".pp-section.active").prev(".pp-section");!a.length&&c.loopTop&&(a=b(".pp-section").last());a.length&&g(a)};b.fn.pagepiling.moveSectionDown=function(){var a=b(".pp-section.active").next(".pp-section");!a.length&&c.loopBottom&&
(a=b(".pp-section").first());a.length&&g(a)};b.fn.pagepiling.moveTo=function(a){var c="",c=isNaN(a)?b('[data-anchor="'+a+'"]'):b(".pp-section").eq(a-1);0<c.length&&g(c)};b(c.sectionSelector).each(function(){b(this).addClass("pp-section")});c.css3&&(c.css3=I());b(e).css({overflow:"hidden","-ms-touch-action":"none","touch-action":"none"});b.fn.pagepiling.setAllowScrolling(!0);b.isEmptyObject(c.navigation)||H();var q=b(".pp-section").length;b(".pp-section").each(function(a){b(this).data("data-index",
a);b(this).css("z-index",q);a||0!==b(".pp-section.active").length||b(this).addClass("active");"undefined"!==typeof c.anchors[a]&&b(this).attr("data-anchor",c.anchors[a]);"undefined"!==typeof c.sectionsColor[a]&&b(this).css("background-color",c.sectionsColor[a]);c.verticalCentered&&b(this).addClass("pp-table").wrapInner('<div class="pp-tableCell" style="height:100%" />');--q}).promise().done(function(){c.navigation&&(b("#pp-nav").css("margin-top","-"+b("#pp-nav").height()/2+"px"),b("#pp-nav").find("li").eq(b(".pp-section.active").index(".pp-section")).find("a").addClass("active"));
b(window).on("load",function(){var a=window.location.hash.replace("#",""),a=b('.pp-section[data-anchor="'+a+'"]');0<a.length&&g(a,c.animateAnchor)});b.isFunction(c.afterRender)&&c.afterRender.call(this)});b(window).on("hashchange",function(){var a=window.location.hash.replace("#","").split("/")[0];a.length&&a&&a!==r&&(a=isNaN(a)?b('[data-anchor="'+a+'"]'):b(".pp-section").eq(a-1),g(a))});b(document).keydown(function(a){if(c.keyboardScrolling&&!p())switch(a.which){case 38:case 33:b.fn.pagepiling.moveSectionUp();
break;case 40:case 34:b.fn.pagepiling.moveSectionDown();break;case 36:b.fn.pagepiling.moveTo(1);break;case 35:b.fn.pagepiling.moveTo(b(".pp-section").length);break;case 37:b.fn.pagepiling.moveSectionUp();break;case 39:b.fn.pagepiling.moveSectionDown()}});c.normalScrollElements&&(b(document).on("mouseenter",c.normalScrollElements,function(){b.fn.pagepiling.setMouseWheelScrolling(!1)}),b(document).on("mouseleave",c.normalScrollElements,function(){b.fn.pagepiling.setMouseWheelScrolling(!0)}));b(document).on("click touchstart",
"#pp-nav a",function(a){a.preventDefault();a=b(this).parent().index();g(b(".pp-section").eq(a))});b(document).on({mouseenter:function(){var a=b(this).data("tooltip");b('<div class="pp-tooltip '+c.navigation.position+'">'+a+"</div>").hide().appendTo(b(this)).fadeIn(200)},mouseleave:function(){b(this).find(".pp-tooltip").fadeOut(200,function(){b(this).remove()})}},"#pp-nav li")}})(jQuery);
(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
      } else {
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, _i, _len, _ref;
      _ref = this.keys;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, _i, _len, _ref;
      _ref = this.keys;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var _ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((_ref = el.currentStyle) != null ? _ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      this.animationNameCache = new WeakMap();
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      this.stopped = false;
      this.boxes = (function() {
        var _i, _len, _ref, _results;
        _ref = this.element.querySelectorAll("." + this.config.boxClass);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          _results.push(box);
        }
        return _results;
      }).call(this);
      this.all = (function() {
        var _i, _len, _ref, _results;
        _ref = this.boxes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          _results.push(box);
        }
        return _results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var node, record, _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = records.length; _j < _len1; _j++) {
              record = records[_j];
              _results.push((function() {
                var _k, _len2, _ref1, _results1;
                _ref1 = record.addedNodes || [];
                _results1 = [];
                for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                  node = _ref1[_k];
                  _results1.push(this.doSync(node));
                }
                return _results1;
              }).call(_this));
            }
            return _results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, _i, _len, _ref, _results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      _ref = element.querySelectorAll("." + this.config.boxClass);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        if (__indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          _results.push(this.scrolled = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = "" + box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        return this.config.callback(box);
      }
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.style.visibility = 'visible');
      }
      return _results;
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, value, vendor, _results;
      _results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        _results.push((function() {
          var _i, _len, _ref, _results1;
          _ref = this.vendors;
          _results1 = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            vendor = _ref[_i];
            _results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var result, style, vendor, _i, _len, _ref;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      _ref = this.vendors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vendor = _ref[_i];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (_error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);

/*
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
*/

var fullScreen = ( function ( doc, body, undefined ) {
    var prefixes                = [ "ms", "o", "", "webkit", "moz" ],
        nodeAPIs                = [ "request_" ],
        docAPIs                 = [ "cancel_" ,"_element", "_enabled", "_", "is_" ],
        fullScreenVariants      = [ "fullscreen", "fullScreen" ],

        slice                   = Array.prototype.slice,

        // internal object to keep a mapping of the noramlized API name and the browser supported string for that API member
        supported               = {},

        // ok jumping though hoops to account for the differences in casing of the supported API's
        caseConversion          = {
            fullscreenenabled:      "fullScreenEnabled",
            fullscreenelement:      "fullScreenElement",
            requestfullscreen:      "requestFullScreen",
            cancelfullscreen:       "cancelFullScreen",
            fullscreen:             "fullScreen",
            isfullscreen:           "fullScreen"
        },

        // array of functions to call when a fullscreenchange event fires, add them by using fullScreen.addEventListener with the function and an optional context
        handlers                = [],

        // some local vars initialized as undefined untill needed
        api, len, prefix, supportedPrefix
    ;

    // make returning a placeholder object for the API DRY since it can be returned in more stages of execution of this script
    function noSupport () {
        body.className += "fullSreenNotEnabled";
        return {
            requestFullScreen:  Function.prototype,
            cancelFullScreen:   Function.prototype,
            fullscreenchange:   Function.prototype,
            addEventListener:   Function.prototype,
            fullScreenElement:  undefined,
            fullScreenEnabled:  false,
            fullScreen:         false
        };
    }

    // some easy tests to rule out the really old browsers
    if ( !Array.prototype.forEach || !doc.querySelector ) {
        return noSupport();
    }

    // ok old shit is ruled out, let's proceed to check for the supported DOM API's

    // util function to glue two strings together and capitalize the second string, some local cache for the capitalized strings
    var glue = ( function () {
        var capitalizedCacheObject = {};

        return function ( glue1, glue2 ) {

            if ( !capitalizedCacheObject[ glue2 ] ) {
                capitalizedCacheObject[  glue2 ] = "" + glue2.substring( 0, 1 ).toUpperCase() + glue2.substring( 1 );
            }

            if ( glue1.length ) {
                return glue1 + capitalizedCacheObject[ glue2 ];
            }

            return glue2;
        };
    } ) ();

    // util function to replace the underscore in the strings from the values in the nodeAPI and docAPI objects
    function replace_ ( ) {
        var arg         = slice.call( arguments ),
            returnArray = [],
            str         = arg[ 0 ],
            inFront     = "_" === str[ 0 ]
        ;

        arg[ 1 ].forEach( function ( el ) {
            if ( inFront ) {
                returnArray.push( glue( el, str.replace( "_", "" ) ) );
            } else {
                returnArray.push( glue( str.replace( "_", "" ), el ) );
            }
        } );

        return returnArray;
    }


    // function to check for support for all prefixes in the prefixes array
    function checkSupport () {
        var docAPINames = [],
            nodeAPINames = [],
            foundSupport = false
        ;

        docAPIs.forEach( function ( docAPI ) {
            // ok jumping though hoops to account for the differences in casing of the supported API's
            docAPINames = docAPINames.concat( replace_( docAPI, fullScreenVariants ) );
        } );

        docAPINames.forEach( function ( docAPIName ) {
            var str = glue( prefix, docAPIName );
            if ( undefined !== doc[ str ] ) {
                // ok jumping though hoops to account for the differences in casing of the supported API's
                supported[ caseConversion[ docAPIName.toLowerCase() ] ] = str;
                foundSupport = true;
            }
        } );

        nodeAPIs.forEach( function ( docAPI ) {
            // ok jumping though hoops to account for the differences in casing of the supported API's
            nodeAPINames = nodeAPINames.concat( replace_( docAPI, fullScreenVariants ) );
        } );
        nodeAPINames.forEach( function ( nodeAPIName ) {
            var str = glue( prefix, nodeAPIName );
            if ( undefined !== body[ str ] ) {
                // ok jumping though hoops to account for the differences in casing of the supported API's
                supported[ caseConversion[ nodeAPIName.toLowerCase() ] ] = str;
                foundSupport = true;
            }
        } );

        return foundSupport;
    }


    // check for supported api, do a type check to be able to check the falsy "" value as wel
    len = prefixes.length;
    // do a while loop to be able to break when a supported prefix is found
    while ( ( prefix = prefixes[ --len] ) ) {
        if ( checkSupport( prefix ) ) {
            supportedPrefix = prefix;
            break;
        }
    }

    // fail when no support is found
    if ( !supported.fullScreenEnabled ) {
        return noSupport();
    }


    // ok were pretty certain we have fullScreen support so we setup the eventHandlers and such


    api = {
        requestFullScreen: function ( node ) {
            ( node || fullScreenElement )[ supported.requestFullScreen ]();
        },
        cancelFullScreen: function ( node ) {
            doc[ supported.cancelFullScreen ]();
        },
        fullScreenElement: undefined,
        fullScreenEnabled: true,
        fullScreen: false,

        fullscreenchange: function ( fn, context ) {
            handlers.push( [ fn, context ] );
        },
        addEventListener: function ( node, _event, _element ) {

            var event, element;

            if ( !node ) {
                return;
            }

            event = _event || "click";
            element = _element || document.body;

            node.addEventListener( event, function () {
                if ( !api.fullScreen ) {
                    api.requestFullScreen( element );
                } else {
                    api.cancelFullScreen();
                }
            } );
        }
    };


    // add the event to toggle the property in the api object to indicate the state of fullScreen and execute any possible handlers
    doc.addEventListener(
        supportedPrefix + "fullscreenchange",
        function ( e ) {
            api.fullScreenElement = doc[ supported.fullScreenElement ];
            api.fullScreen = !!api.fullScreenElement;

            // loop over the hanlders to execute them all
            handlers.forEach( function ( ar ) {
                ar[ 0 ].call( ar[ 1 ] || window, api.fullScreen );
            } );
        }
    );

    // add the className to the html element to be able to change the elements styling in CSS
    document.documentElement.classList.add( "fullScreenEnabled" );

    // one element per page can be set to fullScreen automatically, if another node is needed just pass a reference to the node into fullScreen.requestFullScreen
    var fullScreenElement = doc.querySelector( "#fullScreenElement" );

    // automatically add the click event to the elements with the "fullScreenToggle" className
    slice.call( doc.querySelectorAll( ".fullScreenToggle" ) ).forEach( function ( elem ) {
        api.addEventListener( elem );
    } );

    return api;

} ) ( document, document.body );

/*!

 handlebars v2.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Handlebars = root.Handlebars || factory();
  }
}(this, function () {
// handlebars/safe-string.js
var __module4__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module3__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr];
  }

  function extend(obj /* , ...source */) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          obj[key] = arguments[i][key];
        }
      }
    }

    return obj;
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  /* istanbul ignore next */
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  /* istanbul ignore next */
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (string == null) {
      return "";
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
    return (contextPath ? contextPath + '.' : '') + id;
  }

  __exports__.appendContextPath = appendContextPath;
  return __exports__;
})(__module4__);

// handlebars/exception.js
var __module5__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module2__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "2.0.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 6;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '== 1.x.x',
    5: '== 2.0.0-alpha.x',
    6: '>= 2.0.0-beta.1'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn) {
      if (toString.call(name) === objectType) {
        if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        this.helpers[name] = fn;
      }
    },
    unregisterHelper: function(name) {
      delete this.helpers[name];
    },

    registerPartial: function(name, partial) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = partial;
      }
    },
    unregisterPartial: function(name) {
      delete this.partials[name];
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(/* [args, ]options */) {
      if(arguments.length === 1) {
        // A missing field in a {{foo}} constuct.
        return undefined;
      } else {
        // Someone is actually trying to call something, blow up.
        throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse,
          fn = options.fn;

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          if (options.ids) {
            options.ids = [options.name];
          }

          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        if (options.data && options.ids) {
          var data = createFrame(options.data);
          data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
          options = {data: data};
        }

        return fn(context, options);
      }
    });

    instance.registerHelper('each', function(context, options) {
      if (!options) {
        throw new Exception('Must pass iterator to #each');
      }

      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      var contextPath;
      if (options.data && options.ids) {
        contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
      }

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));

              if (contextPath) {
                data.contextPath = contextPath + i;
              }
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) {
                data.key = key;
                data.index = i;
                data.first = (i === 0);

                if (contextPath) {
                  data.contextPath = contextPath + key;
                }
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      var fn = options.fn;

      if (!Utils.isEmpty(context)) {
        if (options.data && options.ids) {
          var data = createFrame(options.data);
          data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
          options = {data:data};
        }

        return fn(context, options);
      } else {
        return options.inverse(this);
      }
    });

    instance.registerHelper('log', function(message, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, message);
    });

    instance.registerHelper('lookup', function(obj, field) {
      return obj && obj[field];
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, message) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, message);
        }
      }
    }
  };
  __exports__.logger = logger;
  var log = logger.log;
  __exports__.log = log;
  var createFrame = function(object) {
    var frame = Utils.extend({}, object);
    frame._parent = object;
    return frame;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module3__, __module5__);

// handlebars/runtime.js
var __module6__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;
  var createFrame = __dependency3__.createFrame;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    /* istanbul ignore next */
    if (!env) {
      throw new Exception("No environment passed to template");
    }
    if (!templateSpec || !templateSpec.main) {
      throw new Exception('Unknown template object: ' + typeof templateSpec);
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    env.VM.checkRevision(templateSpec.compiler);

    var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
      if (hash) {
        context = Utils.extend({}, context, hash);
      }

      var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

      if (result == null && env.compile) {
        var options = { helpers: helpers, partials: partials, data: data, depths: depths };
        partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
        result = partials[name](context, options);
      }
      if (result != null) {
        if (indent) {
          var lines = result.split('\n');
          for (var i = 0, l = lines.length; i < l; i++) {
            if (!lines[i] && i + 1 === l) {
              break;
            }

            lines[i] = indent + lines[i];
          }
          result = lines.join('\n');
        }
        return result;
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      lookup: function(depths, name) {
        var len = depths.length;
        for (var i = 0; i < len; i++) {
          if (depths[i] && depths[i][name] != null) {
            return depths[i][name];
          }
        }
      },
      lambda: function(current, context) {
        return typeof current === 'function' ? current.call(context) : current;
      },

      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,

      fn: function(i) {
        return templateSpec[i];
      },

      programs: [],
      program: function(i, data, depths) {
        var programWrapper = this.programs[i],
            fn = this.fn(i);
        if (data || depths) {
          programWrapper = program(this, i, fn, data, depths);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(this, i, fn);
        }
        return programWrapper;
      },

      data: function(data, depth) {
        while (data && depth--) {
          data = data._parent;
        }
        return data;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = Utils.extend({}, common, param);
        }

        return ret;
      },

      noop: env.VM.noop,
      compilerInfo: templateSpec.compiler
    };

    var ret = function(context, options) {
      options = options || {};
      var data = options.data;

      ret._setup(options);
      if (!options.partial && templateSpec.useData) {
        data = initData(context, data);
      }
      var depths;
      if (templateSpec.useDepths) {
        depths = options.depths ? [context].concat(options.depths) : [context];
      }

      return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
    };
    ret.isTop = true;

    ret._setup = function(options) {
      if (!options.partial) {
        container.helpers = container.merge(options.helpers, env.helpers);

        if (templateSpec.usePartial) {
          container.partials = container.merge(options.partials, env.partials);
        }
      } else {
        container.helpers = options.helpers;
        container.partials = options.partials;
      }
    };

    ret._child = function(i, data, depths) {
      if (templateSpec.useDepths && !depths) {
        throw new Exception('must pass parent depths');
      }

      return program(container, i, templateSpec[i], data, depths);
    };
    return ret;
  }

  __exports__.template = template;function program(container, i, fn, data, depths) {
    var prog = function(context, options) {
      options = options || {};

      return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
    };
    prog.program = i;
    prog.depth = depths ? depths.length : 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;function initData(context, data) {
    if (!data || !('root' in data)) {
      data = data ? createFrame(data) : {};
      data.root = context;
    }
    return data;
  }
  return __exports__;
})(__module3__, __module5__, __module2__);

// handlebars.runtime.js
var __module1__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;
    hb.escapeExpression = Utils.escapeExpression;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  Handlebars['default'] = Handlebars;

  __exports__ = Handlebars;
  return __exports__;
})(__module2__, __module4__, __module5__, __module3__, __module6__);

// handlebars/compiler/ast.js
var __module7__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var Exception = __dependency1__;

  function LocationInfo(locInfo) {
    locInfo = locInfo || {};
    this.firstLine   = locInfo.first_line;
    this.firstColumn = locInfo.first_column;
    this.lastColumn  = locInfo.last_column;
    this.lastLine    = locInfo.last_line;
  }

  var AST = {
    ProgramNode: function(statements, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "program";
      this.statements = statements;
      this.strip = strip;
    },

    MustacheNode: function(rawParams, hash, open, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "mustache";
      this.strip = strip;

      // Open may be a string parsed from the parser or a passed boolean flag
      if (open != null && open.charAt) {
        // Must use charAt to support IE pre-10
        var escapeFlag = open.charAt(3) || open.charAt(2);
        this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
      } else {
        this.escaped = !!open;
      }

      if (rawParams instanceof AST.SexprNode) {
        this.sexpr = rawParams;
      } else {
        // Support old AST API
        this.sexpr = new AST.SexprNode(rawParams, hash);
      }

      // Support old AST API that stored this info in MustacheNode
      this.id = this.sexpr.id;
      this.params = this.sexpr.params;
      this.hash = this.sexpr.hash;
      this.eligibleHelper = this.sexpr.eligibleHelper;
      this.isHelper = this.sexpr.isHelper;
    },

    SexprNode: function(rawParams, hash, locInfo) {
      LocationInfo.call(this, locInfo);

      this.type = "sexpr";
      this.hash = hash;

      var id = this.id = rawParams[0];
      var params = this.params = rawParams.slice(1);

      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      this.isHelper = !!(params.length || hash);

      // a mustache is an eligible helper if:
      // * its id is simple (a single part, not `this` or `..`)
      this.eligibleHelper = this.isHelper || id.isSimple;

      // if a mustache is an eligible helper but not a definite
      // helper, it is ambiguous, and will be resolved in a later
      // pass or at runtime.
    },

    PartialNode: function(partialName, context, hash, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type         = "partial";
      this.partialName  = partialName;
      this.context      = context;
      this.hash = hash;
      this.strip = strip;

      this.strip.inlineStandalone = true;
    },

    BlockNode: function(mustache, program, inverse, strip, locInfo) {
      LocationInfo.call(this, locInfo);

      this.type = 'block';
      this.mustache = mustache;
      this.program  = program;
      this.inverse  = inverse;
      this.strip = strip;

      if (inverse && !program) {
        this.isInverse = true;
      }
    },

    RawBlockNode: function(mustache, content, close, locInfo) {
      LocationInfo.call(this, locInfo);

      if (mustache.sexpr.id.original !== close) {
        throw new Exception(mustache.sexpr.id.original + " doesn't match " + close, this);
      }

      content = new AST.ContentNode(content, locInfo);

      this.type = 'block';
      this.mustache = mustache;
      this.program = new AST.ProgramNode([content], {}, locInfo);
    },

    ContentNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "content";
      this.original = this.string = string;
    },

    HashNode: function(pairs, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "hash";
      this.pairs = pairs;
    },

    IdNode: function(parts, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "ID";

      var original = "",
          dig = [],
          depth = 0,
          depthString = '';

      for(var i=0,l=parts.length; i<l; i++) {
        var part = parts[i].part;
        original += (parts[i].separator || '') + part;

        if (part === ".." || part === "." || part === "this") {
          if (dig.length > 0) {
            throw new Exception("Invalid path: " + original, this);
          } else if (part === "..") {
            depth++;
            depthString += '../';
          } else {
            this.isScoped = true;
          }
        } else {
          dig.push(part);
        }
      }

      this.original = original;
      this.parts    = dig;
      this.string   = dig.join('.');
      this.depth    = depth;
      this.idName   = depthString + this.string;

      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

      this.stringModeValue = this.string;
    },

    PartialNameNode: function(name, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "PARTIAL_NAME";
      this.name = name.original;
    },

    DataNode: function(id, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "DATA";
      this.id = id;
      this.stringModeValue = id.stringModeValue;
      this.idName = '@' + id.stringModeValue;
    },

    StringNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "STRING";
      this.original =
        this.string =
        this.stringModeValue = string;
    },

    NumberNode: function(number, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "NUMBER";
      this.original =
        this.number = number;
      this.stringModeValue = Number(number);
    },

    BooleanNode: function(bool, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "BOOLEAN";
      this.bool = bool;
      this.stringModeValue = bool === "true";
    },

    CommentNode: function(comment, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "comment";
      this.comment = comment;

      this.strip = {
        inlineStandalone: true
      };
    }
  };


  // Must be exported as an object rather than the root of the module as the jison lexer
  // most modify the object to operate properly.
  __exports__ = AST;
  return __exports__;
})(__module5__);

// handlebars/compiler/parser.js
var __module9__ = (function() {
  "use strict";
  var __exports__;
  /* jshint ignore:start */
  /* istanbul ignore next */
  /* Jison generated parser */
  var handlebars = (function(){
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"root":3,"program":4,"EOF":5,"program_repetition0":6,"statement":7,"mustache":8,"block":9,"rawBlock":10,"partial":11,"CONTENT":12,"COMMENT":13,"openRawBlock":14,"END_RAW_BLOCK":15,"OPEN_RAW_BLOCK":16,"sexpr":17,"CLOSE_RAW_BLOCK":18,"openBlock":19,"block_option0":20,"closeBlock":21,"openInverse":22,"block_option1":23,"OPEN_BLOCK":24,"CLOSE":25,"OPEN_INVERSE":26,"inverseAndProgram":27,"INVERSE":28,"OPEN_ENDBLOCK":29,"path":30,"OPEN":31,"OPEN_UNESCAPED":32,"CLOSE_UNESCAPED":33,"OPEN_PARTIAL":34,"partialName":35,"param":36,"partial_option0":37,"partial_option1":38,"sexpr_repetition0":39,"sexpr_option0":40,"dataName":41,"STRING":42,"NUMBER":43,"BOOLEAN":44,"OPEN_SEXPR":45,"CLOSE_SEXPR":46,"hash":47,"hash_repetition_plus0":48,"hashSegment":49,"ID":50,"EQUALS":51,"DATA":52,"pathSegments":53,"SEP":54,"$accept":0,"$end":1},
  terminals_: {2:"error",5:"EOF",12:"CONTENT",13:"COMMENT",15:"END_RAW_BLOCK",16:"OPEN_RAW_BLOCK",18:"CLOSE_RAW_BLOCK",24:"OPEN_BLOCK",25:"CLOSE",26:"OPEN_INVERSE",28:"INVERSE",29:"OPEN_ENDBLOCK",31:"OPEN",32:"OPEN_UNESCAPED",33:"CLOSE_UNESCAPED",34:"OPEN_PARTIAL",42:"STRING",43:"NUMBER",44:"BOOLEAN",45:"OPEN_SEXPR",46:"CLOSE_SEXPR",50:"ID",51:"EQUALS",52:"DATA",54:"SEP"},
  productions_: [0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[10,3],[14,3],[9,4],[9,4],[19,3],[22,3],[27,2],[21,3],[8,3],[8,3],[11,5],[11,4],[17,3],[17,1],[36,1],[36,1],[36,1],[36,1],[36,1],[36,3],[47,1],[49,3],[35,1],[35,1],[35,1],[41,2],[30,1],[53,3],[53,1],[6,0],[6,2],[20,0],[20,1],[23,0],[23,1],[37,0],[37,1],[38,0],[38,1],[39,0],[39,2],[40,0],[40,1],[48,1],[48,2]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1: yy.prepareProgram($$[$0-1].statements, true); return $$[$0-1]; 
  break;
  case 2:this.$ = new yy.ProgramNode(yy.prepareProgram($$[$0]), {}, this._$);
  break;
  case 3:this.$ = $$[$0];
  break;
  case 4:this.$ = $$[$0];
  break;
  case 5:this.$ = $$[$0];
  break;
  case 6:this.$ = $$[$0];
  break;
  case 7:this.$ = new yy.ContentNode($$[$0], this._$);
  break;
  case 8:this.$ = new yy.CommentNode($$[$0], this._$);
  break;
  case 9:this.$ = new yy.RawBlockNode($$[$0-2], $$[$0-1], $$[$0], this._$);
  break;
  case 10:this.$ = new yy.MustacheNode($$[$0-1], null, '', '', this._$);
  break;
  case 11:this.$ = yy.prepareBlock($$[$0-3], $$[$0-2], $$[$0-1], $$[$0], false, this._$);
  break;
  case 12:this.$ = yy.prepareBlock($$[$0-3], $$[$0-2], $$[$0-1], $$[$0], true, this._$);
  break;
  case 13:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 14:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 15:this.$ = { strip: yy.stripFlags($$[$0-1], $$[$0-1]), program: $$[$0] };
  break;
  case 16:this.$ = {path: $$[$0-1], strip: yy.stripFlags($$[$0-2], $$[$0])};
  break;
  case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 19:this.$ = new yy.PartialNode($$[$0-3], $$[$0-2], $$[$0-1], yy.stripFlags($$[$0-4], $$[$0]), this._$);
  break;
  case 20:this.$ = new yy.PartialNode($$[$0-2], undefined, $$[$0-1], yy.stripFlags($$[$0-3], $$[$0]), this._$);
  break;
  case 21:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
  break;
  case 22:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
  break;
  case 23:this.$ = $$[$0];
  break;
  case 24:this.$ = new yy.StringNode($$[$0], this._$);
  break;
  case 25:this.$ = new yy.NumberNode($$[$0], this._$);
  break;
  case 26:this.$ = new yy.BooleanNode($$[$0], this._$);
  break;
  case 27:this.$ = $$[$0];
  break;
  case 28:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
  break;
  case 29:this.$ = new yy.HashNode($$[$0], this._$);
  break;
  case 30:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 31:this.$ = new yy.PartialNameNode($$[$0], this._$);
  break;
  case 32:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
  break;
  case 33:this.$ = new yy.PartialNameNode(new yy.NumberNode($$[$0], this._$));
  break;
  case 34:this.$ = new yy.DataNode($$[$0], this._$);
  break;
  case 35:this.$ = new yy.IdNode($$[$0], this._$);
  break;
  case 36: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
  break;
  case 37:this.$ = [{part: $$[$0]}];
  break;
  case 38:this.$ = [];
  break;
  case 39:$$[$0-1].push($$[$0]);
  break;
  case 48:this.$ = [];
  break;
  case 49:$$[$0-1].push($$[$0]);
  break;
  case 52:this.$ = [$$[$0]];
  break;
  case 53:$$[$0-1].push($$[$0]);
  break;
  }
  },
  table: [{3:1,4:2,5:[2,38],6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],31:[2,38],32:[2,38],34:[2,38]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:[1,10],13:[1,11],14:16,16:[1,20],19:14,22:15,24:[1,18],26:[1,19],28:[2,2],29:[2,2],31:[1,12],32:[1,13],34:[1,17]},{1:[2,1]},{5:[2,39],12:[2,39],13:[2,39],16:[2,39],24:[2,39],26:[2,39],28:[2,39],29:[2,39],31:[2,39],32:[2,39],34:[2,39]},{5:[2,3],12:[2,3],13:[2,3],16:[2,3],24:[2,3],26:[2,3],28:[2,3],29:[2,3],31:[2,3],32:[2,3],34:[2,3]},{5:[2,4],12:[2,4],13:[2,4],16:[2,4],24:[2,4],26:[2,4],28:[2,4],29:[2,4],31:[2,4],32:[2,4],34:[2,4]},{5:[2,5],12:[2,5],13:[2,5],16:[2,5],24:[2,5],26:[2,5],28:[2,5],29:[2,5],31:[2,5],32:[2,5],34:[2,5]},{5:[2,6],12:[2,6],13:[2,6],16:[2,6],24:[2,6],26:[2,6],28:[2,6],29:[2,6],31:[2,6],32:[2,6],34:[2,6]},{5:[2,7],12:[2,7],13:[2,7],16:[2,7],24:[2,7],26:[2,7],28:[2,7],29:[2,7],31:[2,7],32:[2,7],34:[2,7]},{5:[2,8],12:[2,8],13:[2,8],16:[2,8],24:[2,8],26:[2,8],28:[2,8],29:[2,8],31:[2,8],32:[2,8],34:[2,8]},{17:21,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:27,30:22,41:23,50:[1,26],52:[1,25],53:24},{4:28,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{4:29,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{12:[1,30]},{30:32,35:31,42:[1,33],43:[1,34],50:[1,26],53:24},{17:35,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:36,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:37,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[1,38]},{18:[2,48],25:[2,48],33:[2,48],39:39,42:[2,48],43:[2,48],44:[2,48],45:[2,48],46:[2,48],50:[2,48],52:[2,48]},{18:[2,22],25:[2,22],33:[2,22],46:[2,22]},{18:[2,35],25:[2,35],33:[2,35],42:[2,35],43:[2,35],44:[2,35],45:[2,35],46:[2,35],50:[2,35],52:[2,35],54:[1,40]},{30:41,50:[1,26],53:24},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],52:[2,37],54:[2,37]},{33:[1,42]},{20:43,27:44,28:[1,45],29:[2,40]},{23:46,27:47,28:[1,45],29:[2,42]},{15:[1,48]},{25:[2,46],30:51,36:49,38:50,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],47:57,48:58,49:60,50:[1,59],52:[1,25],53:24},{25:[2,31],42:[2,31],43:[2,31],44:[2,31],45:[2,31],50:[2,31],52:[2,31]},{25:[2,32],42:[2,32],43:[2,32],44:[2,32],45:[2,32],50:[2,32],52:[2,32]},{25:[2,33],42:[2,33],43:[2,33],44:[2,33],45:[2,33],50:[2,33],52:[2,33]},{25:[1,61]},{25:[1,62]},{18:[1,63]},{5:[2,17],12:[2,17],13:[2,17],16:[2,17],24:[2,17],26:[2,17],28:[2,17],29:[2,17],31:[2,17],32:[2,17],34:[2,17]},{18:[2,50],25:[2,50],30:51,33:[2,50],36:65,40:64,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],46:[2,50],47:66,48:58,49:60,50:[1,59],52:[1,25],53:24},{50:[1,67]},{18:[2,34],25:[2,34],33:[2,34],42:[2,34],43:[2,34],44:[2,34],45:[2,34],46:[2,34],50:[2,34],52:[2,34]},{5:[2,18],12:[2,18],13:[2,18],16:[2,18],24:[2,18],26:[2,18],28:[2,18],29:[2,18],31:[2,18],32:[2,18],34:[2,18]},{21:68,29:[1,69]},{29:[2,41]},{4:70,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{21:71,29:[1,69]},{29:[2,43]},{5:[2,9],12:[2,9],13:[2,9],16:[2,9],24:[2,9],26:[2,9],28:[2,9],29:[2,9],31:[2,9],32:[2,9],34:[2,9]},{25:[2,44],37:72,47:73,48:58,49:60,50:[1,74]},{25:[1,75]},{18:[2,23],25:[2,23],33:[2,23],42:[2,23],43:[2,23],44:[2,23],45:[2,23],46:[2,23],50:[2,23],52:[2,23]},{18:[2,24],25:[2,24],33:[2,24],42:[2,24],43:[2,24],44:[2,24],45:[2,24],46:[2,24],50:[2,24],52:[2,24]},{18:[2,25],25:[2,25],33:[2,25],42:[2,25],43:[2,25],44:[2,25],45:[2,25],46:[2,25],50:[2,25],52:[2,25]},{18:[2,26],25:[2,26],33:[2,26],42:[2,26],43:[2,26],44:[2,26],45:[2,26],46:[2,26],50:[2,26],52:[2,26]},{18:[2,27],25:[2,27],33:[2,27],42:[2,27],43:[2,27],44:[2,27],45:[2,27],46:[2,27],50:[2,27],52:[2,27]},{17:76,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[2,47]},{18:[2,29],25:[2,29],33:[2,29],46:[2,29],49:77,50:[1,74]},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],51:[1,78],52:[2,37],54:[2,37]},{18:[2,52],25:[2,52],33:[2,52],46:[2,52],50:[2,52]},{12:[2,13],13:[2,13],16:[2,13],24:[2,13],26:[2,13],28:[2,13],29:[2,13],31:[2,13],32:[2,13],34:[2,13]},{12:[2,14],13:[2,14],16:[2,14],24:[2,14],26:[2,14],28:[2,14],29:[2,14],31:[2,14],32:[2,14],34:[2,14]},{12:[2,10]},{18:[2,21],25:[2,21],33:[2,21],46:[2,21]},{18:[2,49],25:[2,49],33:[2,49],42:[2,49],43:[2,49],44:[2,49],45:[2,49],46:[2,49],50:[2,49],52:[2,49]},{18:[2,51],25:[2,51],33:[2,51],46:[2,51]},{18:[2,36],25:[2,36],33:[2,36],42:[2,36],43:[2,36],44:[2,36],45:[2,36],46:[2,36],50:[2,36],52:[2,36],54:[2,36]},{5:[2,11],12:[2,11],13:[2,11],16:[2,11],24:[2,11],26:[2,11],28:[2,11],29:[2,11],31:[2,11],32:[2,11],34:[2,11]},{30:79,50:[1,26],53:24},{29:[2,15]},{5:[2,12],12:[2,12],13:[2,12],16:[2,12],24:[2,12],26:[2,12],28:[2,12],29:[2,12],31:[2,12],32:[2,12],34:[2,12]},{25:[1,80]},{25:[2,45]},{51:[1,78]},{5:[2,20],12:[2,20],13:[2,20],16:[2,20],24:[2,20],26:[2,20],28:[2,20],29:[2,20],31:[2,20],32:[2,20],34:[2,20]},{46:[1,81]},{18:[2,53],25:[2,53],33:[2,53],46:[2,53],50:[2,53]},{30:51,36:82,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],50:[1,26],52:[1,25],53:24},{25:[1,83]},{5:[2,19],12:[2,19],13:[2,19],16:[2,19],24:[2,19],26:[2,19],28:[2,19],29:[2,19],31:[2,19],32:[2,19],34:[2,19]},{18:[2,28],25:[2,28],33:[2,28],42:[2,28],43:[2,28],44:[2,28],45:[2,28],46:[2,28],50:[2,28],52:[2,28]},{18:[2,30],25:[2,30],33:[2,30],46:[2,30],50:[2,30]},{5:[2,16],12:[2,16],13:[2,16],16:[2,16],24:[2,16],26:[2,16],28:[2,16],29:[2,16],31:[2,16],32:[2,16],34:[2,16]}],
  defaultActions: {4:[2,1],44:[2,41],47:[2,43],57:[2,47],63:[2,10],70:[2,15],73:[2,45]},
  parseError: function parseError(str, hash) {
      throw new Error(str);
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      this.yy.parser = this;
      if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      var ranges = this.lexer.options && this.lexer.options.ranges;
      if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
      function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
      }
      function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
              token = self.symbols_[token] || token;
          }
          return token;
      }
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == "undefined") {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                  expected = [];
                  for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                      }
                  if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                  }
                  this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
              }
          }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                      recovering--;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
              if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }
  };
  /* Jison generated lexer */
  var lexer = (function(){
  var lexer = ({EOF:1,
  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },
  setInput:function (input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
          if (this.options.ranges) this.yylloc.range = [0,0];
          this.offset = 0;
          return this;
      },
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
      },
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length-1);
          this.matched = this.matched.substr(0, this.matched.length-1);

          if (lines.length-1) this.yylineno -= lines.length-1;
          var r = this.yylloc.range;

          this.yylloc = {first_line: this.yylloc.first_line,
            last_line: this.yylineno+1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                this.yylloc.first_column - len
            };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
      },
  more:function () {
          this._more = true;
          return this;
      },
  less:function (n) {
          this.unput(this.match.slice(n));
      },
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
      },
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
      },
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) this.done = true;

          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
              }
          }
          if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                      {text: "", token: null, line: this.yylineno});
          }
      },
  lex:function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
              return r;
          } else {
              return this.lex();
          }
      },
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },
  popState:function popState() {
          return this.conditionStack.pop();
      },
  _currentRules:function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
      },
  topState:function () {
          return this.conditionStack[this.conditionStack.length-2];
      },
  pushState:function begin(condition) {
          this.begin(condition);
      }});
  lexer.options = {};
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


  function strip(start, end) {
    return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
  }


  var YYSTATE=YY_START
  switch($avoiding_name_collisions) {
  case 0:
                                     if(yy_.yytext.slice(-2) === "\\\\") {
                                       strip(0,1);
                                       this.begin("mu");
                                     } else if(yy_.yytext.slice(-1) === "\\") {
                                       strip(0,1);
                                       this.begin("emu");
                                     } else {
                                       this.begin("mu");
                                     }
                                     if(yy_.yytext) return 12;
                                   
  break;
  case 1:return 12;
  break;
  case 2:
                                     this.popState();
                                     return 12;
                                   
  break;
  case 3:
                                    yy_.yytext = yy_.yytext.substr(5, yy_.yyleng-9);
                                    this.popState();
                                    return 15;
                                   
  break;
  case 4: return 12; 
  break;
  case 5:strip(0,4); this.popState(); return 13;
  break;
  case 6:return 45;
  break;
  case 7:return 46;
  break;
  case 8: return 16; 
  break;
  case 9:
                                    this.popState();
                                    this.begin('raw');
                                    return 18;
                                   
  break;
  case 10:return 34;
  break;
  case 11:return 24;
  break;
  case 12:return 29;
  break;
  case 13:this.popState(); return 28;
  break;
  case 14:this.popState(); return 28;
  break;
  case 15:return 26;
  break;
  case 16:return 26;
  break;
  case 17:return 32;
  break;
  case 18:return 31;
  break;
  case 19:this.popState(); this.begin('com');
  break;
  case 20:strip(3,5); this.popState(); return 13;
  break;
  case 21:return 31;
  break;
  case 22:return 51;
  break;
  case 23:return 50;
  break;
  case 24:return 50;
  break;
  case 25:return 54;
  break;
  case 26:// ignore whitespace
  break;
  case 27:this.popState(); return 33;
  break;
  case 28:this.popState(); return 25;
  break;
  case 29:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 42;
  break;
  case 30:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 42;
  break;
  case 31:return 52;
  break;
  case 32:return 44;
  break;
  case 33:return 44;
  break;
  case 34:return 43;
  break;
  case 35:return 50;
  break;
  case 36:yy_.yytext = strip(1,2); return 50;
  break;
  case 37:return 'INVALID';
  break;
  case 38:return 5;
  break;
  }
  };
  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
  lexer.conditions = {"mu":{"rules":[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[5],"inclusive":false},"raw":{"rules":[3,4],"inclusive":false},"INITIAL":{"rules":[0,1,38],"inclusive":true}};
  return lexer;})()
  parser.lexer = lexer;
  function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();__exports__ = handlebars;
  /* jshint ignore:end */
  return __exports__;
})();

// handlebars/compiler/helpers.js
var __module10__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;

  function stripFlags(open, close) {
    return {
      left: open.charAt(2) === '~',
      right: close.charAt(close.length-3) === '~'
    };
  }

  __exports__.stripFlags = stripFlags;
  function prepareBlock(mustache, program, inverseAndProgram, close, inverted, locInfo) {
    /*jshint -W040 */
    if (mustache.sexpr.id.original !== close.path.original) {
      throw new Exception(mustache.sexpr.id.original + ' doesn\'t match ' + close.path.original, mustache);
    }

    var inverse = inverseAndProgram && inverseAndProgram.program;

    var strip = {
      left: mustache.strip.left,
      right: close.strip.right,

      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: isNextWhitespace(program.statements),
      closeStandalone: isPrevWhitespace((inverse || program).statements)
    };

    if (mustache.strip.right) {
      omitRight(program.statements, null, true);
    }

    if (inverse) {
      var inverseStrip = inverseAndProgram.strip;

      if (inverseStrip.left) {
        omitLeft(program.statements, null, true);
      }
      if (inverseStrip.right) {
        omitRight(inverse.statements, null, true);
      }
      if (close.strip.left) {
        omitLeft(inverse.statements, null, true);
      }

      // Find standalone else statments
      if (isPrevWhitespace(program.statements)
          && isNextWhitespace(inverse.statements)) {

        omitLeft(program.statements);
        omitRight(inverse.statements);
      }
    } else {
      if (close.strip.left) {
        omitLeft(program.statements, null, true);
      }
    }

    if (inverted) {
      return new this.BlockNode(mustache, inverse, program, strip, locInfo);
    } else {
      return new this.BlockNode(mustache, program, inverse, strip, locInfo);
    }
  }

  __exports__.prepareBlock = prepareBlock;
  function prepareProgram(statements, isRoot) {
    for (var i = 0, l = statements.length; i < l; i++) {
      var current = statements[i],
          strip = current.strip;

      if (!strip) {
        continue;
      }

      var _isPrevWhitespace = isPrevWhitespace(statements, i, isRoot, current.type === 'partial'),
          _isNextWhitespace = isNextWhitespace(statements, i, isRoot),

          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

      if (strip.right) {
        omitRight(statements, i, true);
      }
      if (strip.left) {
        omitLeft(statements, i, true);
      }

      if (inlineStandalone) {
        omitRight(statements, i);

        if (omitLeft(statements, i)) {
          // If we are on a standalone node, save the indent info for partials
          if (current.type === 'partial') {
            current.indent = (/([ \t]+$)/).exec(statements[i-1].original) ? RegExp.$1 : '';
          }
        }
      }
      if (openStandalone) {
        omitRight((current.program || current.inverse).statements);

        // Strip out the previous content node if it's whitespace only
        omitLeft(statements, i);
      }
      if (closeStandalone) {
        // Always strip the next node
        omitRight(statements, i);

        omitLeft((current.inverse || current.program).statements);
      }
    }

    return statements;
  }

  __exports__.prepareProgram = prepareProgram;function isPrevWhitespace(statements, i, isRoot) {
    if (i === undefined) {
      i = statements.length;
    }

    // Nodes that end with newlines are considered whitespace (but are special
    // cased for strip operations)
    var prev = statements[i-1],
        sibling = statements[i-2];
    if (!prev) {
      return isRoot;
    }

    if (prev.type === 'content') {
      return (sibling || !isRoot ? (/\r?\n\s*?$/) : (/(^|\r?\n)\s*?$/)).test(prev.original);
    }
  }
  function isNextWhitespace(statements, i, isRoot) {
    if (i === undefined) {
      i = -1;
    }

    var next = statements[i+1],
        sibling = statements[i+2];
    if (!next) {
      return isRoot;
    }

    if (next.type === 'content') {
      return (sibling || !isRoot ? (/^\s*?\r?\n/) : (/^\s*?(\r?\n|$)/)).test(next.original);
    }
  }

  // Marks the node to the right of the position as omitted.
  // I.e. {{foo}}' ' will mark the ' ' node as omitted.
  //
  // If i is undefined, then the first child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.
  function omitRight(statements, i, multiple) {
    var current = statements[i == null ? 0 : i + 1];
    if (!current || current.type !== 'content' || (!multiple && current.rightStripped)) {
      return;
    }

    var original = current.string;
    current.string = current.string.replace(multiple ? (/^\s+/) : (/^[ \t]*\r?\n?/), '');
    current.rightStripped = current.string !== original;
  }

  // Marks the node to the left of the position as omitted.
  // I.e. ' '{{foo}} will mark the ' ' node as omitted.
  //
  // If i is undefined then the last child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.
  function omitLeft(statements, i, multiple) {
    var current = statements[i == null ? statements.length - 1 : i - 1];
    if (!current || current.type !== 'content' || (!multiple && current.leftStripped)) {
      return;
    }

    // We omit the last node if it's whitespace only and not preceeded by a non-content node.
    var original = current.string;
    current.string = current.string.replace(multiple ? (/\s+$/) : (/[ \t]+$/), '');
    current.leftStripped = current.string !== original;
    return current.leftStripped;
  }
  return __exports__;
})(__module5__);

// handlebars/compiler/base.js
var __module8__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__) {
  "use strict";
  var __exports__ = {};
  var parser = __dependency1__;
  var AST = __dependency2__;
  var Helpers = __dependency3__;
  var extend = __dependency4__.extend;

  __exports__.parser = parser;

  var yy = {};
  extend(yy, Helpers, AST);

  function parse(input) {
    // Just return if an already-compile AST was passed in.
    if (input.constructor === AST.ProgramNode) { return input; }

    parser.yy = yy;

    return parser.parse(input);
  }

  __exports__.parse = parse;
  return __exports__;
})(__module9__, __module7__, __module10__, __module3__);

// handlebars/compiler/compiler.js
var __module11__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;
  var isArray = __dependency2__.isArray;

  var slice = [].slice;

  function Compiler() {}

  __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    equals: function(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
          return false;
        }
      }

      // We know that length is the same between the two arrays because they are directly tied
      // to the opcode behavior above.
      len = this.children.length;
      for (i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function(program, options) {
      this.opcodes = [];
      this.children = [];
      this.depths = {list: []};
      this.options = options;
      this.stringParams = options.stringParams;
      this.trackIds = options.trackIds;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true,
        'lookup': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.accept(program);
    },

    accept: function(node) {
      return this[node.type](node);
    },

    program: function(program) {
      var statements = program.statements;

      for(var i=0, l=statements.length; i<l; i++) {
        this.accept(statements[i]);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var sexpr = mustache.sexpr;
      var type = this.classifySexpr(sexpr);

      if (type === "helper") {
        this.helperSexpr(sexpr, program, inverse);
      } else if (type === "simple") {
        this.simpleSexpr(sexpr);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue', sexpr.id.original);
      } else {
        this.ambiguousSexpr(sexpr, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, i, l;

      this.opcode('pushHash');

      for(i=0, l=pairs.length; i<l; i++) {
        this.pushParam(pairs[i][1]);
      }
      while(i--) {
        this.opcode('assignToHash', pairs[i][0]);
      }
      this.opcode('popHash');
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if (partial.hash) {
        this.accept(partial.hash);
      } else {
        this.opcode('push', 'undefined');
      }

      if (partial.context) {
        this.accept(partial.context);
      } else {
        this.opcode('getContext', 0);
        this.opcode('pushContext');
      }

      this.opcode('invokePartial', partialName.name, partial.indent || '');
      this.opcode('append');
    },

    content: function(content) {
      if (content.string) {
        this.opcode('appendContent', content.string);
      }
    },

    mustache: function(mustache) {
      this.sexpr(mustache.sexpr);

      if(mustache.escaped && !this.options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousSexpr: function(sexpr, program, inverse) {
      var id = sexpr.id,
          name = id.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.ID(id);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleSexpr: function(sexpr) {
      var id = sexpr.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperSexpr: function(sexpr, program, inverse) {
      var params = this.setupFullMustacheParams(sexpr, program, inverse),
          id = sexpr.id,
          name = id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
      } else {
        id.falsy = true;

        this.ID(id);
        this.opcode('invokeHelper', params.length, id.original, id.isSimple);
      }
    },

    sexpr: function(sexpr) {
      var type = this.classifySexpr(sexpr);

      if (type === "simple") {
        this.simpleSexpr(sexpr);
      } else if (type === "helper") {
        this.helperSexpr(sexpr);
      } else {
        this.ambiguousSexpr(sexpr);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts, id.falsy, id.isScoped);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      this.opcode('lookupData', data.id.depth, data.id.parts);
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    NUMBER: function(number) {
      this.opcode('pushLiteral', number.number);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: slice.call(arguments, 1) });
    },

    addDepth: function(depth) {
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifySexpr: function(sexpr) {
      var isHelper   = sexpr.isHelper;
      var isEligible = sexpr.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
      if (isEligible && !isHelper) {
        var name = sexpr.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      for(var i=0, l=params.length; i<l; i++) {
        this.pushParam(params[i]);
      }
    },

    pushParam: function(val) {
      if (this.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);

        if (val.type === 'sexpr') {
          // Subexpressions get evaluated and passed in
          // in string params mode.
          this.sexpr(val);
        }
      } else {
        if (this.trackIds) {
          this.opcode('pushId', val.type, val.idName || val.stringModeValue);
        }
        this.accept(val);
      }
    },

    setupFullMustacheParams: function(sexpr, program, inverse) {
      var params = sexpr.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if (sexpr.hash) {
        this.hash(sexpr.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    }
  };

  function precompile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }
    if (options.compat) {
      options.useDepths = true;
    }

    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    return new env.JavaScriptCompiler().compile(environment, options);
  }

  __exports__.precompile = precompile;function compile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    }

    options = options || {};

    if (!('data' in options)) {
      options.data = true;
    }
    if (options.compat) {
      options.useDepths = true;
    }

    var compiled;

    function compileInput() {
      var ast = env.parse(input);
      var environment = new env.Compiler().compile(ast, options);
      var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    var ret = function(context, options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, options);
    };
    ret._setup = function(options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled._setup(options);
    };
    ret._child = function(i, data, depths) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled._child(i, data, depths);
    };
    return ret;
  }

  __exports__.compile = compile;function argEquals(a, b) {
    if (a === b) {
      return true;
    }

    if (isArray(a) && isArray(b) && a.length === b.length) {
      for (var i = 0; i < a.length; i++) {
        if (!argEquals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
  }
  return __exports__;
})(__module5__, __module3__);

// handlebars/compiler/javascript-compiler.js
var __module12__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__;
  var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
  var Exception = __dependency2__;

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name /* , type*/) {
      if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        return parent + "." + name;
      } else {
        return parent + "['" + name + "']";
      }
    },
    depthedLookup: function(name) {
      this.aliases.lookup = 'this.lookup';

      return 'lookup(depths, "' + name + '")';
    },

    compilerInfo: function() {
      var revision = COMPILER_REVISION,
          versions = REVISION_CHANGES[revision];
      return [revision, versions];
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return {
          appendToBuffer: true,
          content: string,
          toString: function() { return "buffer += " + string + ";"; }
        };
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options;
      this.stringParams = this.options.stringParams;
      this.trackIds = this.options.trackIds;
      this.precompile = !asObject;

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        environments: []
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.aliases = {};
      this.registers = { list: [] };
      this.hashes = [];
      this.compileStack = [];
      this.inlineStack = [];

      this.compileChildren(environment, options);

      this.useDepths = this.useDepths || environment.depths.list.length || this.options.compat;

      var opcodes = environment.opcodes,
          opcode,
          i,
          l;

      for (i = 0, l = opcodes.length; i < l; i++) {
        opcode = opcodes[i];

        this[opcode.opcode].apply(this, opcode.args);
      }

      // Flush any trailing content that might be pending.
      this.pushSource('');

      /* istanbul ignore next */
      if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
        throw new Exception('Compile completed with content left on stack');
      }

      var fn = this.createFunctionContext(asObject);
      if (!this.isChild) {
        var ret = {
          compiler: this.compilerInfo(),
          main: fn
        };
        var programs = this.context.programs;
        for (i = 0, l = programs.length; i < l; i++) {
          if (programs[i]) {
            ret[i] = programs[i];
          }
        }

        if (this.environment.usePartial) {
          ret.usePartial = true;
        }
        if (this.options.data) {
          ret.useData = true;
        }
        if (this.useDepths) {
          ret.useDepths = true;
        }
        if (this.options.compat) {
          ret.compat = true;
        }

        if (!asObject) {
          ret.compiler = JSON.stringify(ret.compiler);
          ret = this.objectLiteral(ret);
        }

        return ret;
      } else {
        return fn;
      }
    },

    preamble: function() {
      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = [];
    },

    createFunctionContext: function(asObject) {
      var varDeclarations = '';

      var locals = this.stackVars.concat(this.registers.list);
      if(locals.length > 0) {
        varDeclarations += ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      for (var alias in this.aliases) {
        if (this.aliases.hasOwnProperty(alias)) {
          varDeclarations += ', ' + alias + '=' + this.aliases[alias];
        }
      }

      var params = ["depth0", "helpers", "partials", "data"];

      if (this.useDepths) {
        params.push('depths');
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource(varDeclarations);

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        return 'function(' + params.join(',') + ') {\n  ' + source + '}';
      }
    },
    mergeSource: function(varDeclarations) {
      var source = '',
          buffer,
          appendOnly = !this.forceBuffer,
          appendFirst;

      for (var i = 0, len = this.source.length; i < len; i++) {
        var line = this.source[i];
        if (line.appendToBuffer) {
          if (buffer) {
            buffer = buffer + '\n    + ' + line.content;
          } else {
            buffer = line.content;
          }
        } else {
          if (buffer) {
            if (!source) {
              appendFirst = true;
              source = buffer + ';\n  ';
            } else {
              source += 'buffer += ' + buffer + ';\n  ';
            }
            buffer = undefined;
          }
          source += line + '\n  ';

          if (!this.environment.isSimple) {
            appendOnly = false;
          }
        }
      }

      if (appendOnly) {
        if (buffer || !source) {
          source += 'return ' + (buffer || '""') + ';\n';
        }
      } else {
        varDeclarations += ", buffer = " + (appendFirst ? '' : this.initializeBuffer());
        if (buffer) {
          source += 'return buffer + ' + buffer + ';\n';
        } else {
          source += 'return buffer;\n';
        }
      }

      if (varDeclarations) {
        source = 'var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n  ') + source;
      }

      return source;
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function(name) {
      this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = [this.contextName(0)];
      this.setupParams(name, 0, params);

      var blockName = this.popStack();
      params.splice(1, 0, blockName);

      this.push('blockHelperMissing.call(' + params.join(', ') + ')');
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      // We're being a bit cheeky and reusing the options value from the prior exec
      var params = [this.contextName(0)];
      this.setupParams('', 0, params, true);

      this.flushInline();

      var current = this.topStack();
      params.splice(1, 0, current);

      this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      }

      this.pendingContent = content;
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      // Force anything that is inlined onto the stack so we don't have duplication
      // when we examine local
      this.flushInline();
      var local = this.popStack();
      this.pushSource('if (' + local + ' != null) { ' + this.appendToBuffer(local) + ' }');
      if (this.environment.isSimple) {
        this.pushSource("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.aliases.escapeExpression = 'this.escapeExpression';

      this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      this.lastContext = depth;
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(parts, falsy, scoped) {
      /*jshint -W083 */
      var i = 0,
          len = parts.length;

      if (!scoped && this.options.compat && !this.lastContext) {
        // The depthed query is expected to handle the undefined logic for the root level that
        // is implemented below, so we evaluate that directly in compat mode
        this.push(this.depthedLookup(parts[i++]));
      } else {
        this.pushContext();
      }

      for (; i < len; i++) {
        this.replaceStack(function(current) {
          var lookup = this.nameLookup(current, parts[i], 'context');
          // We want to ensure that zero and false are handled properly if the context (falsy flag)
          // needs to have the special handling for these values.
          if (!falsy) {
            return ' != null ? ' + lookup + ' : ' + current;
          } else {
            // Otherwise we can use generic falsy handling
            return ' && ' + lookup;
          }
        });
      }
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function(depth, parts) {
      /*jshint -W083 */
      if (!depth) {
        this.pushStackLiteral('data');
      } else {
        this.pushStackLiteral('this.data(data, ' + depth + ')');
      }

      var len = parts.length;
      for (var i = 0; i < len; i++) {
        this.replaceStack(function(current) {
          return ' && ' + this.nameLookup(current, parts[i], 'data');
        });
      }
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.aliases.lambda = 'this.lambda';

      this.push('lambda(' + this.popStack() + ', ' + this.contextName(0) + ')');
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushContext();
      this.pushString(type);

      // If it's a subexpression, the string result
      // will be pushed after this opcode.
      if (type !== 'sexpr') {
        if (typeof string === 'string') {
          this.pushString(string);
        } else {
          this.pushStackLiteral(string);
        }
      }
    },

    emptyHash: function() {
      this.pushStackLiteral('{}');

      if (this.trackIds) {
        this.push('{}'); // hashIds
      }
      if (this.stringParams) {
        this.push('{}'); // hashContexts
        this.push('{}'); // hashTypes
      }
    },
    pushHash: function() {
      if (this.hash) {
        this.hashes.push(this.hash);
      }
      this.hash = {values: [], types: [], contexts: [], ids: []};
    },
    popHash: function() {
      var hash = this.hash;
      this.hash = this.hashes.pop();

      if (this.trackIds) {
        this.push('{' + hash.ids.join(',') + '}');
      }
      if (this.stringParams) {
        this.push('{' + hash.contexts.join(',') + '}');
        this.push('{' + hash.types.join(',') + '}');
      }

      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.inlineStack.push(expr);
      return expr;
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name, isSimple) {
      this.aliases.helperMissing = 'helpers.helperMissing';

      var nonHelper = this.popStack();
      var helper = this.setupHelper(paramSize, name);

      var lookup = (isSimple ? helper.name + ' || ' : '') + nonHelper + ' || helperMissing';
      this.push('((' + lookup + ').call(' + helper.callParams + '))');
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name, helperCall) {
      this.aliases.functionType = '"function"';
      this.aliases.helperMissing = 'helpers.helperMissing';
      this.useRegister('helper');

      var nonHelper = this.popStack();

      this.emptyHash();
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      this.push(
        '((helper = (helper = ' + helperName + ' || ' + nonHelper + ') != null ? helper : helperMissing'
          + (helper.paramsInit ? '),(' + helper.paramsInit : '') + '),'
        + '(typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper))');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name, indent) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + indent + "'", "'" + name + "'", this.popStack(), this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      } else if (this.options.compat) {
        params.push('undefined');
      }
      if (this.options.compat) {
        params.push('depths');
      }

      this.push("this.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, ..., hash, ...
    // On stack, after: ..., hash, ...
    //
    // Pops a value off the stack and assigns it to the current hash
    assignToHash: function(key) {
      var value = this.popStack(),
          context,
          type,
          id;

      if (this.trackIds) {
        id = this.popStack();
      }
      if (this.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts.push("'" + key + "': " + context);
      }
      if (type) {
        hash.types.push("'" + key + "': " + type);
      }
      if (id) {
        hash.ids.push("'" + key + "': " + id);
      }
      hash.values.push("'" + key + "': (" + value + ")");
    },

    pushId: function(type, name) {
      if (type === 'ID' || type === 'DATA') {
        this.pushString(name);
      } else if (type === 'sexpr') {
        this.pushStackLiteral('true');
      } else {
        this.pushStackLiteral('null');
      }
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        var index = this.matchExistingProgram(child);

        if (index == null) {
          this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
          index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
          this.context.environments[index] = child;

          this.useDepths = this.useDepths || compiler.useDepths;
        } else {
          child.index = index;
          child.name = 'program' + index;
        }
      }
    },
    matchExistingProgram: function(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return i;
        }
      }
    },

    programExpression: function(guid) {
      var child = this.environment.children[guid],
          depths = child.depths.list,
          useDepths = this.useDepths,
          depth;

      var programParams = [child.index, 'data'];

      if (useDepths) {
        programParams.push('depths');
      }

      return 'this.program(' + programParams.join(', ') + ')';
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      return this.push(new Literal(item));
    },

    pushSource: function(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    pushStack: function(item) {
      this.flushInline();

      var stack = this.incrStack();
      this.pushSource(stack + " = " + item + ";");
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var prefix = '',
          inline = this.isInline(),
          stack,
          createdStack,
          usedLiteral;

      /* istanbul ignore next */
      if (!this.isInline()) {
        throw new Exception('replaceStack on non-inline');
      }

      // We want to merge the inline statement into the replacement statement via ','
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        prefix = stack = top.value;
        usedLiteral = true;
      } else {
        // Get or create the current stack name for use by the inline
        createdStack = !this.stackSlot;
        var name = !createdStack ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + ')';
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push('(' + prefix + item + ')');
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var inlineStack = this.inlineStack;
      if (inlineStack.length) {
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            this.pushStack(entry);
          }
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },

    popStack: function(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        if (!inline) {
          /* istanbul ignore next */
          if (!this.stackSlot) {
            throw new Exception('Invalid stack pop');
          }
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function() {
      var stack = (this.isInline() ? this.inlineStack : this.compileStack),
          item = stack[stack.length - 1];

      if (item instanceof Literal) {
        return item.value;
      } else {
        return item;
      }
    },

    contextName: function(context) {
      if (this.useDepths && context) {
        return 'depths[' + context + ']';
      } else {
        return 'depth' + context;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
    },

    objectLiteral: function(obj) {
      var pairs = [];

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          pairs.push(this.quotedString(key) + ':' + obj[key]);
        }
      }

      return '{' + pairs.join(',') + '}';
    },

    setupHelper: function(paramSize, name, blockHelper) {
      var params = [],
          paramsInit = this.setupParams(name, paramSize, params, blockHelper);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        paramsInit: paramsInit,
        name: foundHelper,
        callParams: [this.contextName(0)].concat(params).join(", ")
      };
    },

    setupOptions: function(helper, paramSize, params) {
      var options = {}, contexts = [], types = [], ids = [], param, inverse, program;

      options.name = this.quotedString(helper);
      options.hash = this.popStack();

      if (this.trackIds) {
        options.hashIds = this.popStack();
      }
      if (this.stringParams) {
        options.hashTypes = this.popStack();
        options.hashContexts = this.popStack();
      }

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          program = 'this.noop';
        }

        if (!inverse) {
          inverse = 'this.noop';
        }

        options.fn = program;
        options.inverse = inverse;
      }

      // The parameters go on to the stack in order (making sure that they are evaluated in order)
      // so we need to pop them off the stack in reverse order
      var i = paramSize;
      while (i--) {
        param = this.popStack();
        params[i] = param;

        if (this.trackIds) {
          ids[i] = this.popStack();
        }
        if (this.stringParams) {
          types[i] = this.popStack();
          contexts[i] = this.popStack();
        }
      }

      if (this.trackIds) {
        options.ids = "[" + ids.join(",") + "]";
      }
      if (this.stringParams) {
        options.types = "[" + types.join(",") + "]";
        options.contexts = "[" + contexts.join(",") + "]";
      }

      if (this.options.data) {
        options.data = "data";
      }

      return options;
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(helperName, paramSize, params, useRegister) {
      var options = this.objectLiteral(this.setupOptions(helperName, paramSize, params));

      if (useRegister) {
        this.useRegister('options');
        params.push('options');
        return 'options=' + options;
      } else {
        params.push(options);
        return '';
      }
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
  };

  __exports__ = JavaScriptCompiler;
  return __exports__;
})(__module2__, __module5__);

// handlebars.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var Handlebars = __dependency1__;

  // Compiler imports
  var AST = __dependency2__;
  var Parser = __dependency3__.parser;
  var parse = __dependency3__.parse;
  var Compiler = __dependency4__.Compiler;
  var compile = __dependency4__.compile;
  var precompile = __dependency4__.precompile;
  var JavaScriptCompiler = __dependency5__;

  var _create = Handlebars.create;
  var create = function() {
    var hb = _create();

    hb.compile = function(input, options) {
      return compile(input, options, hb);
    };
    hb.precompile = function (input, options) {
      return precompile(input, options, hb);
    };

    hb.AST = AST;
    hb.Compiler = Compiler;
    hb.JavaScriptCompiler = JavaScriptCompiler;
    hb.Parser = Parser;
    hb.parse = parse;

    return hb;
  };

  Handlebars = create();
  Handlebars.create = create;

  Handlebars['default'] = Handlebars;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module7__, __module8__, __module11__, __module12__);

  return __module0__;
}));

/*! DataTables 1.10.4
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.4
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2008-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnScrollingWidthAdjust,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnScrollBarWidth,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(/** @lends <global> */function( window, document, undefined ) {

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// Define as an AMD module if possible
		define( 'datatables', ['jquery'], factory );
	}
    else if ( typeof exports === 'object' ) {
        // Node/CommonJS
        factory( require( 'jquery' ) );
    }
	else if ( jQuery && !jQuery.fn.dataTable ) {
		// Define using browser globals otherwise
		// Prevent multiple instantiations if the script is loaded twice
		factory( jQuery );
	}
}
(/** @lends <global> */function( $ ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable;

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n]/g;
	var _re_html = /<.*?>/g;
	var _re_date_start = /^[\w\+\-]/;
	var _re_date_end = /[\w\+\-]$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// U+2009 is thin space and U+202F is narrow no-break space, both used in many
	// standards as thousands separators
	var _re_formatted_numeric = /[',$£€¥%\u2009\u202F]/g;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return _empty( d ) || (!isNaN( parseFloat(d) ) && isFinite( d ));
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		var defaults = DataTable.defaults.oLanguage;
		var zeroRecords = lang.sZeroRecords;
	
		/* Backwards compatibility - if there is no sEmptyTable given, then use the same as
		 * sZeroRecords - assuming that is given.
		 */
		if ( ! lang.sEmptyTable && zeroRecords &&
			defaults.sEmptyTable === "No data available in table" )
		{
			_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
		}
	
		/* Likewise with loading records */
		if ( ! lang.sLoadingRecords && zeroRecords &&
			defaults.sLoadingRecords === "Loading..." )
		{
			_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
		}
	
		// Old parameter name of the thousands separator mapped onto the new
		if ( lang.sInfoThousands ) {
			lang.sThousands = lang.sInfoThousands;
		}
	
		var decimal = lang.sDecimal;
		if ( decimal ) {
			_addNumericSort( decimal );
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		var browser = settings.oBrowser;
	
		// Scrolling feature / quirks detection
		var n = $('<div/>')
			.css( {
				position: 'absolute',
				top: 0,
				left: 0,
				height: 1,
				width: 1,
				overflow: 'hidden'
			} )
			.append(
				$('<div/>')
					.css( {
						position: 'absolute',
						top: 1,
						left: 1,
						width: 100,
						overflow: 'scroll'
					} )
					.append(
						$('<div class="test"/>')
							.css( {
								width: '100%',
								height: 10
							} )
					)
			)
			.appendTo( 'body' );
	
		var test = n.find('.test');
	
		// IE6/7 will oversize a width 100% element inside a scrolling element, to
		// include the width of the scrollbar, while other browsers ensure the inner
		// element is contained without forcing scrolling
		browser.bScrollOversize = test[0].offsetWidth === 100;
	
		// In rtl text layout, some browsers (most, but not all) will place the
		// scrollbar on the left, rather than the right.
		browser.bScrollbarLeft = test.offset().left !== 1;
	
		n.remove();
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, null );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( typeof oOptions.iDataSort === 'number' )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		return _fnGetColumns( oSettings, 'bVisible' ).length;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data'
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			// When working with a row, the data source object must be populated. In
			// all other cases, the data source object is already populated, so we
			// don't overwrite it, which might break bindings etc
			if ( nTr ) {
				_fnSetCellData( oSettings, iRow, i, _fnGetCellData( oSettings, iRow, i ) );
			}
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		/* When the data source is null, we can use default column data */
		if ( (cellData === rowData || cellData === null) && defaultContent !== null ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g), function ( s ) {
			return s.replace(/\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
								out.push( fetchData( data[j], type, innerSrc ) );
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						for ( var j=0, jLen=val.length ; j<jLen ; j++ )
						{
							o = {};
							setData( o, val[j], innerSrc );
							data[ a[i] ].push( o );
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d || objectRead ? {} : [];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
			
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
	
				nTd = nTrIn ? anTds[i] : document.createElement( oCol.sCellType );
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( !nTrIn || oCol.mRender || oCol.mData !== i )
				{
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow] );
		}
	
		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			if ( data.DT_RowId ) {
				tr.id = data.DT_RowId;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell.html() ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
		
		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');
	
		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = $.isFunction( ajaxData ) ?
				ajaxData( data ) :  // fn can manipulate data or return an object
				ajaxData;           // object or array to merge
	
			// If the function returned an object, use that alone
			data = $.isFunction( ajaxData ) && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					oSettings.oApi._fnLog( oSettings, 0, error );
				}
	
				oSettings.json = json;
				_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json] );
				fn( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var log = oSettings.oApi._fnLog;
	
				if ( error == "parsererror" ) {
					log( oSettings, 0, 'Invalid JSON response', 1 );
				}
				else if ( xhr.readyState === 4 ) {
					log( oSettings, 0, 'Ajax error', 7 );
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				fn,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( $.isFunction( ajax ) )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, fn, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		var data = _fnAjaxDataSrc( settings, json );
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		settings.bAjaxDataGet = false;
		_fnDraw( settings );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}
	
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
	
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.bind(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.bind( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			displayRows.push.apply( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=display.length-1 ; i>=0 ; i-- ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( ! rpSearch.test( data ) ) {
				display.splice( i, 1 );
			}
		}
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=display.length-1 ; i>=0 ; i-- ) {
				if ( ! rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					display.splice( i, 1 );
				}
			}
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || '', function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	function _fnEscapeRegex ( sVal )
	{
		return sVal.replace( _re_escape_regex, '\\$1' );
	}
	
	
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// On an Ajax load we now have data and therefore want to apply the column
		// sizing
		if ( json ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option( language[i], lengths[i] );
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.bind( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).bind( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		// This is fairly messy, but with x scrolling enabled, if the table has a
		// width attribute, regardless of any width applied using the column width
		// options, the browser will shrink or grow the table as needed to fit into
		// that 100%. That would make the width options useless. So we remove it.
		// This is okay, under the assumption that width:100% is applied to the
		// table in CSS (it is in the default stylesheet) which will set the table
		// width as appropriate (the attribute and css behave differently...)
		if ( scroll.sX && table.attr('width') === '100%' ) {
			table.removeAttr('width');
		}
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						overflow: 'auto',
						height: size( scrollY ),
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).scroll( function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// If scroll collapse is enabled, when we put the headers back into the body for sizing, we
		// will end up forcing the scrollbar to appear, making our measurements wrong for when we
		// then hide it (end of this function), so add the header height to the body scroller.
		if ( scroll.bCollapse && scrollY !== "" ) {
			divBodyStyle.height = (divBody[0].offsetHeight + header[0].offsetHeight)+"px";
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
		}
		else
		{
			// x scrolling
			if ( scrollXInner !== "" ) {
				// x scroll inner has been given - use it
				tableStyle.width = _fnStringToCss(scrollXInner);
			}
			else if ( sanityWidth == divBody.width() && divBody.height() < table.height() ) {
				// There is y-scrolling - try to take account of the y scroll bar
				tableStyle.width = _fnStringToCss( sanityWidth-barWidth );
				if ( table.outerWidth() > sanityWidth-barWidth ) {
					// Not possible to take account of it
					tableStyle.width = _fnStringToCss( sanityWidth );
				}
			}
			else {
				// When all else fails
				tableStyle.width = _fnStringToCss( sanityWidth );
			}
		}
	
		// Recalculate the sanity width - now that we've applied the required width,
		// before it was a temporary variable. This is required because the column
		// width calculation is done before this table DOM is created.
		sanityWidth = table.outerWidth();
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			nToSize.style.width = headerWidths[i];
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+headerContent[i]+'</div>';
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = "";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		if ( scrollY && scroll.bCollapse ) {
			divBodyStyle.height = _fnStringToCss( scrollY );
	
			var iExtra = (scrollX && tableEl.offsetWidth > divBodyEl.offsetWidth) ?
				barWidth :
				0;
	
			if ( tableEl.offsetHeight < divBodyEl.offsetHeight ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+iExtra );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.scroll();
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'),
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth;
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ! userInputs && ! scrollX && ! scrollY &&
		    columnCount == _fnVisbleColumns( oSettings ) &&
			columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				columns[i].sWidth = _fnStringToCss( headerCells.eq(i).width() );
			}
		}
		else
		{
			// Otherwise construct a single row table with the widest node in the
			// data, assign any user defined widths, then insert it into the DOM and
			// allow the browser to do all the hard work of calculating table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.empty()
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' )
				.append( $(oSettings.nTHead).clone( false ) )
				.append( $(oSettings.nTFoot).clone( false ) )
				.append( $('<tbody><tr/></tbody>') );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			var tr = tmpTable.find( 'tbody tr' );
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Table has been built, attach to the document so we can work with it
			tmpTable.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
	
				if ( tmpTable.width() < tableContainer.offsetWidth ) {
					tmpTable.width( tableContainer.offsetWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.offsetWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Take into account the y scrollbar
			_fnScrollingWidthAdjust( oSettings, tmpTable[0] );
	
			// Browsers need a bit of a hand when a width is assigned to any columns
			// when x-scrolling as they tend to collapse the table to the min-width,
			// even if we sent the column widths. So we need to keep track of what
			// the table width should be by summing the user given values, and the
			// automatic values
			if ( scrollX )
			{
				var total = 0;
	
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					column = columns[ visibleColumns[i] ];
					outerWidth = $(headerCells[i]).outerWidth();
	
					total += column.sWidthOrig === null ?
						outerWidth :
						parseInt( column.sWidth, 10 ) + outerWidth - $(headerCells[i]).width();
				}
	
				tmpTable.width( _fnStringToCss( total ) );
				table.style.width = _fnStringToCss( total );
			}
	
			// Get the width of each column in the constructed table
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
				width = $(headerCells[i]).width();
	
				if ( width ) {
					column.sWidth = _fnStringToCss( width );
				}
			}
	
			table.style.width = _fnStringToCss( tmpTable.css('width') );
	
			// Finished with the table - ditch it
			tmpTable.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			$(window).bind('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
				_fnAdjustColumnSizing( oSettings );
			} ) );
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	function _fnThrottle( fn, freq ) {
		var
			frequency = freq !== undefined ? freq : 200,
			last,
			timer;
	
		return function () {
			var
				that = this,
				now  = +new Date(),
				args = arguments;
	
			if ( last && now < last + frequency ) {
				clearTimeout( timer );
	
				timer = setTimeout( function () {
					last = undefined;
					fn.apply( that, args );
				}, frequency );
			}
			else if ( last ) {
				last = now;
				fn.apply( that, args );
			}
			else {
				last = now;
			}
		};
	}
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Adjust a table's width to take account of vertical scroll bar
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n table node
	 *  @memberof DataTable#oApi
	 */
	
	function _fnScrollingWidthAdjust ( settings, n )
	{
		var scroll = settings.oScroll;
	
		if ( scroll.sX || scroll.sY ) {
			// When y-scrolling only, we want to remove the width of the scroll bar
			// so the table + scroll bar will fit into the area available, otherwise
			// we fix the table at its current size with no adjustment
			var correction = ! scroll.sX ? scroll.iBarWidth : 0;
			n.style.width = _fnStringToCss( $(n).outerWidth() - correction );
		}
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	/**
	 * Get the width of a scroll bar in this browser being used
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollBarWidth ()
	{
		// On first run a static variable is set, since this is only needed once.
		// Subsequent runs will just use the previously calculated value
		if ( ! DataTable.__scrollbarWidth ) {
			var inner = $('<p/>').css( {
				width: '100%',
				height: 200,
				padding: 0
			} )[0];
	
			var outer = $('<div/>')
				.css( {
					position: 'absolute',
					top: 0,
					left: 0,
					width: 200,
					height: 150,
					padding: 0,
					overflow: 'hidden',
					visibility: 'hidden'
				} )
				.append( inner )
				.appendTo( 'body' );
	
			var w1 = inner.offsetWidth;
			outer.css( 'overflow', 'scroll' );
			var w2 = inner.offsetWidth;
	
			if ( w1 === w2 ) {
				w2 = outer[0].clientWidth;
			}
	
			outer.remove();
	
			DataTable.__scrollbarWidth = w1 - w2;
		}
	
		return DataTable.__scrollbarWidth;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					nestedSort.push.apply( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit )
	{
		var i, ien;
		var columns = settings.aoColumns;
	
		if ( ! settings.oFeatures.bStateSave ) {
			return;
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings );
		if ( ! state || ! state.time ) {
			return;
		}
	
		/* Allow custom and plug-in manipulation functions to alter the saved data set and
		 * cancelling of loading by returning false
		 */
		var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, state] );
		if ( $.inArray( false, abStateLoad ) !== -1 ) {
			return;
		}
	
		/* Reject old data */
		var duration = settings.iStateDuration;
		if ( duration > 0 && state.time < +new Date() - (duration*1000) ) {
			return;
		}
	
		// Number of columns have changed - all bets are off, no restore of settings
		if ( columns.length !== state.columns.length ) {
			return;
		}
	
		// Store the saved state so it might be accessed at any time
		settings.oLoadedState = $.extend( true, {}, state );
	
		// Restore key features - todo - for 1.11 this needs to be done by
		// subscribed events
		settings._iDisplayStart    = state.start;
		settings.iInitDisplayStart = state.start;
		settings._iDisplayLength   = state.length;
		settings.aaSorting = [];
	
		// Order
		$.each( state.order, function ( i, col ) {
			settings.aaSorting.push( col[0] >= columns.length ?
				[ 0, col[1] ] :
				col
			);
		} );
	
		// Search
		$.extend( settings.oPreviousSearch, _fnSearchToHung( state.search ) );
	
		// Columns
		for ( i=0, ien=state.columns.length ; i<ien ; i++ ) {
			var col = state.columns[i];
	
			// Visibility
			columns[i].bVisible = col.visible;
	
			// Search
			$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
		}
	
		_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, state] );
	}
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings!==null ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else {
				throw new Error(msg);
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.bind( 'click.DT', oData, function (e) {
					n.blur(); // Remove focus outline for mouse users
					fn(e);
				} )
			.bind( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.bind( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} event Name of the jQuery custom event to trigger. If null no
	 *      trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, e, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( e !== null ) {
			$(settings.nTable).trigger( e+'.dt', args );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	DataTable = function( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).bind('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can old position.
			this.api( true ).draw( ! complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, oInit );
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				/* Base check on table node */
				if ( allSettings[i].nTable == this )
				{
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return allSettings[i].oInstance;
					}
					else if ( bDestroy )
					{
						allSettings[i].oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( allSettings[i], 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( allSettings[i].sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"nTable":        this,
				"oApi":          _that.internal,
				"oInit":         oInit,
				"sDestroyWidth": $(this)[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $(this).dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			
			if ( oInit.oLanguage )
			{
				_fnLanguageCompat( oInit.oLanguage );
			}
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ],
				[ "bJQueryUI", "bJUI" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			var oClasses = oSettings.oClasses;
			
			// @todo Remove in 1.11
			if ( oInit.bJQueryUI )
			{
				/* Use the JUI classes object for display. You could clone the oStdClasses object if
				 * you want to have multiple tables with multiple independent classes
				 */
				$.extend( oClasses, DataTable.ext.oJUIClasses, oInit.oClasses );
			
				if ( oInit.sDom === defaults.sDom && defaults.sDom === "lfrtip" )
				{
					/* Set the DOM to use a layout suitable for jQuery UI's theming */
					oSettings.sDom = '<"H"lfr>t<"F"ip>';
				}
			
				if ( ! oSettings.renderer ) {
					oSettings.renderer = 'jqueryui';
				}
				else if ( $.isPlainObject( oSettings.renderer ) && ! oSettings.renderer.header ) {
					oSettings.renderer.header = 'jqueryui';
				}
			}
			else
			{
				$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			}
			$(this).addClass( oClasses.sTable );
			
			/* Calculate the scroll bar width and cache it for use later on */
			if ( oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "" )
			{
				oSettings.oScroll.iBarWidth = _fnScrollBarWidth();
			}
			if ( oSettings.oScroll.sX === true ) { // Easy initialisation of x-scrolling
				oSettings.oScroll.sX = '100%';
			}
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl !== "" )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $('tbody tr:eq(0)', this);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) ? name : null;
				};
			
				$.each( _fnGetRowElements( oSettings, rowOne[0] ).cells, function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			
			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnLoadState( oSettings, oInit );
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
			}
			
			
			/*
			 * Sorting
			 * @todo For modularisation (1.11) this needs to do into a sort start up handler
			 */
			
			// If aaSorting is not defined, then we use the first indicator in asSorting
			// in case that has been altered, so the default sort reflects that option
			if ( oInit.aaSorting === undefined )
			{
				var sorting = oSettings.aaSorting;
				for ( i=0, iLen=sorting.length ; i<iLen ; i++ )
				{
					sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
				}
			}
			
			/* Do a first pass on the sorting classes (allows any size changes to be taken into
			 * account, and also will apply sorting disabled classes if disabled
			 */
			_fnSortingClasses( oSettings );
			
			if ( features.bSort )
			{
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted ) {
						var aSort = _fnSortFlatten( oSettings );
						var sortedColumns = {};
			
						$.each( aSort, function (i, val) {
							sortedColumns[ val.src ] = val.dir;
						} );
			
						_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
						_fnSortAria( oSettings );
					}
				} );
			}
			
			_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
				if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
					_fnSortingClasses( oSettings );
				}
			}, 'sc' );
			
			
			/*
			 * Final init
			 * Cache the header, body and footer as required, creating them if needed
			 */
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			// Work around for Webkit bug 83867 - store the caption-side before removing from doc
			var captions = $(this).children('caption').each( function () {
				this._captionSide = $(this).css('caption-side');
			} );
			
			var thead = $(this).children('thead');
			if ( thead.length === 0 )
			{
				thead = $('<thead/>').appendTo(this);
			}
			oSettings.nTHead = thead[0];
			
			var tbody = $(this).children('tbody');
			if ( tbody.length === 0 )
			{
				tbody = $('<tbody/>').appendTo(this);
			}
			oSettings.nTBody = tbody[0];
			
			var tfoot = $(this).children('tfoot');
			if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") )
			{
				// If we are a scrolling table, and no footer has been given, then we need to create
				// a tfoot element for the caption element to be appended to
				tfoot = $('<tfoot/>').appendTo(this);
			}
			
			if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
				$(this).addClass( oClasses.sNoFooter );
			}
			else if ( tfoot.length > 0 ) {
				oSettings.nTFoot = tfoot[0];
				_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
			}
			
			/* Check if there is data passing into the constructor */
			if ( oInit.aaData )
			{
				for ( i=0 ; i<oInit.aaData.length ; i++ )
				{
					_fnAddData( oSettings, oInit.aaData[ i ] );
				}
			}
			else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' )
			{
				/* Grab the data from the page - only do this when deferred loading or no Ajax
				 * source since there is no point in reading the DOM data if we are then going
				 * to replace it with Ajax data
				 */
				_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
			}
			
			/* Copy the data index array */
			oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
			/* Initialisation complete - table can be drawn */
			oSettings.bInitialised = true;
			
			/* Check if we need to initialise the table (it might not have been handed off to the
			 * language processor)
			 */
			if ( bInitHandedOff === false )
			{
				_fnInitialise( oSettings );
			}
		} );
		_that = null;
		return this;
	};

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! this instanceof _Api ) {
			throw 'DT API must be constructed as a new object';
			// or should it do the 'new' for the caller?
			// return new _Api.apply( this, arguments );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			this.push.apply( this, data.toArray ? data.toArray() : data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	_Api.prototype = /** @lends DataTables.Api */{
		/**
		 * Return a new Api instance, comprised of the data held in the current
		 * instance, join with the other array(s) and/or value(s).
		 *
		 * An alias for `Array.prototype.concat`.
		 *
		 * @type method
		 * @param {*} value1 Arrays and/or values to concatenate.
		 * @param {*} [...] Additional arrays and/or values to concatenate.
		 * @returns {DataTables.Api} New API instance, comprising of the combined
		 *   array.
		 */
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		// Note that `alwaysNew` is internal - use iteratorNew externally
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	};
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			j, jen,
			struct, inner,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = typeof struct.val === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				$.isPlainObject( struct.val ) ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   []
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'draw()', function ( resetPaging ) {
		return this.iterator( 'table', function ( settings ) {
			_fnReDraw( settings, resetPaging===false );
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings._iDisplayLength,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			// Trigger xhr
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	
		// Use the draw event to trigger a callback, regardless of if it is an async
		// or sync draw
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( selector, select )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			a = selector[i] && selector[i].split ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = select( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );
	
				if ( res && res.length ) {
					out.push.apply( out, res );
				}
			}
		}
	
		return out;
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && ! opts.search ) {
			opts.search = opts.filter;
		}
	
		return {
			search: opts.search || 'none',
			order:  opts.order  || 'current',
			page:   opts.page   || 'all'
		};
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			a = search == 'none' ?
				displayMaster.slice() :                      // no search
				search == 'applied' ?
					displayFiltered.slice() :                // applied search
					$.map( displayMaster, function (el, i) { // removed search
						return $.inArray( el, displayFiltered ) === -1 ? el : null;
					} );
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	
	
	var __row_selector = function ( settings, selector, opts )
	{
		return _selector_run( selector, function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			var rows = _selector_row_indexes( settings, opts );
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( ! sel ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = settings.aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - node
			if ( sel.nodeName ) {
				if ( $.inArray( sel, nodes ) !== -1 ) {
					return [ sel._DT_RowIndex ]; // sel is a TR node that is in the table
					                             // and DataTables adds a prop for fast lookup
				}
			}
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		} );
	};
	
	
	/**
	 *
	 */
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		return this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
	
			data.splice( row, 1 );
	
			// Update the _DT_RowIndex parameter on all rows in the table
			for ( var i=0, ien=data.length ; i<ien ; i++ ) {
				if ( data[i].nTr !== null ) {
					data[i].nTr._DT_RowIndex = i;
				}
			}
	
			// Remove the target row from the search array
			var displayIndex = $.inArray( row, settings.aiDisplay );
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
		} );
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		modRows.push.apply( modRows, newRows.toArray() );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		ctx[0].aoData[ this[0] ]._aData = data;
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		if ( $.isArray( data ) || data instanceof $ ) {
			for ( var i=0, ien=data.length ; i<ien ; i++ ) {
				addRow( data[i], klass );
			}
		}
		else {
			addRow( data, klass );
		}
	
		if ( row._details ) {
			row._details.remove();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}
	
				__details_events( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^(.+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		return _selector_run( selector, function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
			
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
			
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
				}
			}
			else {
				// jQuery selector on the TH elements for the columns
				return $( nodes )
					.filter( s )
					.map( function () {
						return $.inArray( this, nodes ); // `nodes` is column index complete and in order
					} )
					.toArray();
			}
		} );
	};
	
	
	var __setColumnVis = function ( settings, column, vis, recalc ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		if ( recalc === undefined || recalc ) {
			// Automatically adjust column sizing
			_fnAdjustColumnSizing( settings );
	
			// Realign columns for scrolling
			if ( settings.oScroll.sX || settings.oScroll.sY ) {
				_fnScrollDraw( settings );
			}
		}
	
		_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis] );
	
		_fnSaveState( settings );
	};
	
	
	/**
	 *
	 */
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	
	/**
	 *
	 */
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	
	/**
	 *
	 */
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	
	/**
	 *
	 */
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		return this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis, calc );
		} );
	} );
	
	
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	
	// _api_register( 'columns().show()', function () {
	// 	var selector = this.selector;
	// 	return this.columns( selector.cols, selector.opts ).visible( true );
	// } );
	
	
	// _api_register( 'columns().hide()', function () {
	// 	var selector = this.selector;
	// 	return this.columns( selector.cols, selector.opts ).visible( false );
	// } );
	
	
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	
	// Convert from one column index type, to another type
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	
	
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		return _selector_run( selector, function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = settings.aoData[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells[j] ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				return [s];
			}
	
			// Selector - jQuery filtered cells
			return allCells
				.filter( s )
				.map( function (i, el) {
					row = el.parentNode._DT_RowIndex;
	
					return {
						row: row,
						column: $.inArray( el, data[ row ].anCells )
					};
				} )
				.toArray();
		} );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( typeof rowSelector.row !== undefined ) {
				opts = columnSelector;
				columnSelector = null;
			}
			else {
				opts = rowSelector;
				rowSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// Row + column selector
		var columns = this.columns( columnSelector, opts );
		var rows = this.rows( rowSelector, opts );
		var a, i, ien, j, jen;
	
		var cells = this.iterator( 'table', function ( settings, idx ) {
			a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var cells = settings.aoData[ row ].anCells;
			return cells ?
				cells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		$.each( DataTable.settings, function (i, o) {
			if ( o.nTable === t || o.nScrollHead === t || o.nScrollFoot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		return $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	};
	
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: _fnThrottle,
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} sVal string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: _fnEscapeRegex
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			if ( ! args[0].match(/\.dt\b/) ) {
				args[0] += '.dt';
			}
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.unbind('.DT').find(':not(tbody *)').unbind('.DT');
			$(window).unbind('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			// Remove the DataTables generated nodes, events and classes
			jqTable.detach();
			jqWrapper.detach();
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			if ( settings.bJUI ) {
				$('th span.'+classes.sSortIcon+ ', td span.'+classes.sSortIcon, thead).detach();
				$('th, td', thead).each( function () {
					var wrapper = $('div.'+classes.sSortJUIWrapper, this);
					$(this).append( wrapper.contents() );
					wrapper.detach();
				} );
			}
	
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
			}
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Restore the width of the original table - was read from the style property,
			// so we can restore directly to that
			jqTable
				.css( 'width', settings.sDestroyWidth )
				.removeClass( classes.sTable );
	
			// If the were originally stripe classes - then we add them back here.
			// Note this is not fool proof (for example if not all rows had stripe
			// classes - but it's a good effort without getting carried away
			ien = settings.asDestroyStripes.length;
	
			if ( ien ) {
				jqTbody.children().each( function (i) {
					$(this).addClass( settings.asDestroyStripes[i % ien] );
				} );
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	

	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.4";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Enable jQuery UI ThemeRoller support (required as ThemeRoller requires some
		 * slightly different and additional mark-up from what DataTables has
		 * traditionally used).
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.jQueryUI
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "jQueryUI": true
		 *      } );
		 *    } );
		 */
		"bJQueryUI": false,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings) {
		 *          var o;
		 *
		 *          // Send an Ajax request to the server to get the data. Note that
		 *          // this is a synchronous request.
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "async": false,
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              o = json;
		 *            }
		 *          } );
		 *
		 *          return o;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features four different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus
		 *   page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "platform.details.0" },
		 *          { "data": "platform.details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * Flag to indicate if jQuery UI marking and classes should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bJUI": null,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {}
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert' or
		 * 'throw'
		 *
		 *  @type string
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! $.isNumeric( data.substring(1) ) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	(function() {
	
	// Reused strings for better compression. Closure compiler appears to have a
	// weird edge case where it is trying to expand strings rather than use the
	// variable version. This results in about 200 bytes being added, for very
	// little preference benefit since it this run on script load only.
	var _empty = '';
	_empty = '';
	
	var _stateDefault = _empty + 'ui-state-default';
	var _sortIcon     = _empty + 'css_right ui-icon ui-icon-';
	var _headerFooter = _empty + 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix';
	
	$.extend( DataTable.ext.oJUIClasses, DataTable.ext.classes, {
		/* Full numbers paging buttons */
		"sPageButton":         "fg-button ui-button "+_stateDefault,
		"sPageButtonActive":   "ui-state-disabled",
		"sPageButtonDisabled": "ui-state-disabled",
	
		/* Features */
		"sPaging": "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi "+
			"ui-buttonset-multi paging_", /* Note that the type is postfixed */
	
		/* Sorting */
		"sSortAsc":            _stateDefault+" sorting_asc",
		"sSortDesc":           _stateDefault+" sorting_desc",
		"sSortable":           _stateDefault+" sorting",
		"sSortableAsc":        _stateDefault+" sorting_asc_disabled",
		"sSortableDesc":       _stateDefault+" sorting_desc_disabled",
		"sSortableNone":       _stateDefault+" sorting_disabled",
		"sSortJUIAsc":         _sortIcon+"triangle-1-n",
		"sSortJUIDesc":        _sortIcon+"triangle-1-s",
		"sSortJUI":            _sortIcon+"carat-2-n-s",
		"sSortJUIAscAllowed":  _sortIcon+"carat-1-n",
		"sSortJUIDescAllowed": _sortIcon+"carat-1-s",
		"sSortJUIWrapper":     "DataTables_sort_wrapper",
		"sSortIcon":           "DataTables_sort_icon",
	
		/* Scrolling */
		"sScrollHead": "dataTables_scrollHead "+_stateDefault,
		"sScrollFoot": "dataTables_scrollFoot "+_stateDefault,
	
		/* Misc */
		"sHeaderTH":  _stateDefault,
		"sFooterTH":  _stateDefault,
		"sJUIHeader": _headerFooter+" ui-corner-tl ui-corner-tr",
		"sJUIFooter": _headerFooter+" ui-corner-bl ui-corner-br"
	} );
	
	}());
	
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-1, page+2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = '';
							btnClass = '';
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span>&hellip;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'data-dt-idx': counter,
										'tabindex': settings.iTabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					var activeEl = $(document.activeElement).data('dt-idx');
	
					attach( $(host).empty(), buttons );
	
					if ( activeEl !== null ) {
						$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
					}
				}
				catch (e) {}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 will remove any unknown characters at the start and end of the
			// expression, leading to false matches such as `$245.12` or `10%` being
			// a valid date. See forum thread 18941 for detail.
			if ( d && !(d instanceof Date) && ( ! _re_date_start.test(d) || ! _re_date_end.test(d) ) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			return Date.parse( d ) || 0;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 4 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix ) {
			return {
				display: function ( d ) {
					var negative = d < 0 ? '-' : '';
					d = Math.abs( parseFloat( d ) );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart;
				}
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnScrollingWidthAdjust: _fnScrollingWidthAdjust,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnScrollBarWidth: _fnScrollBarWidth,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, searcg or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));

}(window, document));


/* ========================================================================
 * Bootstrap: collapse.js v3.3.2
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.2'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="collapse"]'
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.2
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.2'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.2
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
