(function () {
    
    //String
    var strPro = String.prototype;
    /*! https://mths.be/at v0.2.0 by @mathias */
    if (!strPro.at) {
        (function() {
            'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
            var defineProperty = (function() {
                // IE 8 only supports `Object.defineProperty` on DOM elements.
                try {
                    var object = {};
                    var $defineProperty = Object.defineProperty;
                    var result = $defineProperty(object, object, object) && $defineProperty;
                } catch (exception) {}
                return result;
            }());
            var at = function(position) {
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                var size = string.length;
                // `ToInteger`
                var index = position ? Number(position) : 0;
                if (index != index) { // better `isNaN`
                    index = 0;
                }
                // Account for out-of-bounds indices
                // The odd lower bound is because the ToInteger operation is
                // going to round `n` to `0` for `-1 < n <= 0`.
                if (index <= -1 || index >= size) {
                    return '';
                }
                // Second half of `ToInteger`
                index = index | 0;
                // Get the first code unit and code unit value
                var cuFirst = string.charCodeAt(index);
                var cuSecond;
                var nextIndex = index + 1;
                var len = 1;
                if ( // Check if it’s the start of a surrogate pair.
                cuFirst >= 0xD800 && cuFirst <= 0xDBFF && // high surrogate
                size > nextIndex // there is a next code unit
                ) {
                    cuSecond = string.charCodeAt(nextIndex);
                    if (cuSecond >= 0xDC00 && cuSecond <= 0xDFFF) { // low surrogate
                        len = 2;
                    }
                }
                return string.slice(index, index + len);
            };
            if (defineProperty) {
                defineProperty(strPro, 'at', {
                    'value': at,
                    'configurable': true,
                    'writable': true
                });
            } else {
                strPro.at = at;
            }
        }());
    }
    if (!strPro.includes) {
        strPro.includes = function (str, begin) {
            begin = begin || 0;
            return this.slice(begin).indexOf(str) != -1;
        }
    }
    if (!strPro.startsWith) {
        strPro.startsWith = function (str, begin) {
            begin = begin || 0;
            return this.slice(begin).indexOf(str) == 0;
        }
    }
    if (strPro.endsWith) {
        strPro.endsWith = function (str, len) {
            var strLen = str.length,
                _str = this.slice(0, len);
            return strLen == 0 || _str.indexOf(str) == _str.length - strLen;
        }
    }
    if (!strPro.repeat) {
        strPro.repeat = function (num) {
            if (typeof num != 'number' || Number.isNaN(num) || num < 1) {
                return ''
            } else if (num === 1) {
                return this;
            } else {
                var half = num / 2;
                return this.repeat(Math.floor(half)) + this.repeat(Math.ceil(half))
            }
        }
    }
    /**
     * padStart
     * padEnd
     * String.raw
     */

    //Number

    /**
     * Number.
     *  isFinite
     *  isInteger
     *  isSafeInteger
     *  EPSILON //2.220446049250313e-16 极小的常量
     *  MAX_SAFE_INTEGER
     *  MIN_SAFE_INTEGER
     */
    if (!Number.isNaN) {
        Number.isNaN = function(num){
            return num != num;
        }
    }
 
    !Number.parseInt && (Number.parseInt = parseInt);
    !Number.parseFloat && (Number.parseFloat = parseFloat);
    /**
     * Math.
     *  trunc //去除小数部分
     *  sign
     *  cbrt // 立方根
     *  clz32 返回一个数的32位无符号整数形式有多少个前导0。
     *  imul方法返回两个数以32位带符号整数形式相乘的结果
     *  fround方法返回一个数的单精度浮点数形式。
     *  hypot方法返回所有参数的平方和的平方根。
     *  expm1 Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。
     *  log1p Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
     *  log10 Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN。
     *  log2 返回以2为底的x的对数。如果x小于0，则返回NaN。
     *
     *  Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
     *  Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
     *  Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
     *  Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
     *  Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
     *  Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
     */
    if (!Math.trunc) {
        Math.trunc = function (num) {
            return ~~num;
        }
    }

    /**
     * Array.
     *  from
     *  of
     * Array.prototype.
     *  copyWithin 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
     */
    var arrProp = Array.prototype;
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike/*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method
                // of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }
    if (!arrProp.find) {
        arrProp.find = function (callback) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (callback(this[i])) {
                    return this[i];
                }
            }
        }
    }
    if (!arrProp.includes) {
        arrProp.includes = function (item) {
            return this.indexOf(item) > -1;
        }
    }
    if (!arrProp.findIndex) {
        arrProp.findIndex = function (callback) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (callback(this[i])) {
                    return i;
                }
            }
            return -1;
        }
    }

    if (!arrProp.fill) {
        arrProp.fill = function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
                this[i] = item;
            }
        }
    }

    if (Object.keys) {
        Object.keys = (function() {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function(obj) {
                if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }

    if (!Object.assign) {
        Object.assign = function () {
            var target = arguments[0],
                sources = arrProp.slice.call(arguments).slice(1);
            sources.forEach(function (item) {
                Object.keys(item).forEach(function (key) {
                    target[key] = item[key];
                });
            });
            return target;
        }
    }


    if (!Object.values) {
        Object.values = function (object) {
            if (object === null || object === undefined) {
                throw 'Cannot convert undefined or null to object'
            }
            return Object.keys(object).map(function (key) {
                return object[key];
            });
        }
    }

    if (!Object.entries) {
        Object.entries = function (object) {
            if (object === null || object === undefined) {
                throw 'Cannot convert undefined or null to object'
            }
            return Object.keys(object).map(function (key) {
                return [key, object[key]];
            });
        }
    }

    if (Object.is) {
        Object.is = function (v1, v2) {
            if (v1 === 0 && v2 === 0) {
                return 1 / v1 === 1 / v2;
            }
            if (v1 !== v1) {
                return v2 !== v2;
            }
            return v1 === v2;
        }
    }
})();
