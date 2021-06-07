export const math = {
    getSumm: function (v1, v2){
        if(+v1 != v1 || +v2 != v2){
            return 0;
        }
        if(+v1 < 0 || +v2 < 0){
            if(+v1 < 0 && +v2 < 0){
                return -this.getSumm(-+v1, -+v2);
            }else if(+v1 < 0){
                return this.getDifference(v2, -+v1);
            }else{
                return this.getDifference(v1, -+v2);
            }
        }
        let val1, val2, integer, fraction, intFraction;
        if((''+v1).indexOf('.') === -1 && (''+v2).indexOf('.') === -1){
            let res = parseInt(v1) + parseInt(v2);
            return res;
        }else{
            val1 = this.integerFraction(v1);
            val2 = this.integerFraction(v2);
            integer = val1.integer + val2.integer;
            fraction = val1.fraction + val2.fraction;
            intFraction = fraction - (fraction % 100);
            if(intFraction > 0){
                fraction = fraction % 100;
                integer += intFraction/100;
            }
            if((''+fraction).length === 1){
                fraction = '0' + fraction;
            }
            let res = parseFloat(integer + '.' + fraction);
            return res;
        }
    },
    
    getDifference: function(md, ms){
        if(+md != md || +ms != ms){
            return 0;
        }
        if(+md > 0 && +ms < 0){
            return this.getSumm(md, -+ms);
        }else if(+md < 0 && +ms > 0){
            return -this.getSumm(-+md, ms);
        }else if(+md < 0 && +ms < 0){
            return this.getDifference(-+ms, -+md);
        }
        let M, m, integer, fraction;
        if((''+md).indexOf('.') === -1 && (''+ms).indexOf('.') === -1){
            let res = parseInt(md) - parseInt(ms);
            return res;
        }else{
            M = this.integerFraction(md);
            m = this.integerFraction(ms);
            integer = M.integer - m.integer;
            fraction = M.fraction - m.fraction;
            if(integer > 0){
                if(fraction < 0){
                    fraction = 100 - (-fraction % 100);
                    integer -= 1;
                }
                if((''+fraction).length === 1){
                    fraction = '0' + fraction;
                }
                let res = parseFloat(integer + '.' + fraction);
                return res;
            }else if(integer === 0){
                let pref;
                if(fraction < 0){
                    pref = '-';
                    fraction = -fraction;
                }else{
                    pref = '';
                }
                if((''+fraction).length === 1){
                    fraction = '0' + fraction;
                }
                let res = parseFloat(pref + integer + '.' + fraction);
                return res;
            }else{
                if(fraction < 0){
                    fraction = -fraction;
                }else{
                    fraction = 100 - fraction;
                    integer += 1;
                    if(integer == 0){
                        integer = '-0';
                    }
                }
                if((''+fraction).length === 1){
                    fraction = '0' + fraction;
                }
                let res =  parseFloat(integer + '.' + fraction);
                return res;
            }
        }
    },
    
    getMultiplication: function(v, k){
        if(+v != v || +k != k){
            return 0;
        }
        if(+v * +k < 0){
            if(+v < 0){
                return -this.getMultiplication(-+v, k);
            }else{
                return -this.getMultiplication(v, -+k);
            }
        }else if(+v < 0 && +k <0){
            v = -+v;
            k = -+k;
        }
        let val, integer, fraction, intFraction;
        k = parseInt(k);
        if((''+v).indexOf('.') === -1){
            let res = parseInt(v) * k;
            return res;
        }else{
            val = this.integerFraction(v);
            integer = val.integer * k;
            fraction = val.fraction * k;
            intFraction = fraction - (fraction % 100);
            if(intFraction > 0){
                fraction = fraction % 100;
                integer += intFraction/100;
            }
            if((''+fraction).length === 1){
                fraction = '0' + fraction;
            }
            let res = parseFloat(integer + '.' + fraction);
            return res;
        }
    },
    
    integerFraction: function(value){
        let val = {integer:0, fraction:0};
        let frac;
        if((''+value).indexOf('.') === -1){
            val.integer = parseInt(value);
        }else{
            val.integer = parseInt((''+value).substr(0,(''+value).indexOf('.')));
            frac = (''+value).substr((''+value).indexOf('.') + 1);
            if(frac.length === 1){
                frac += '0';
            }
            val.fraction = parseInt( frac );
        }
        return val;
    }
}

export const mapMath = {
/**
 * Takes two {@link Point|points} and finds the geographic bearing between them,
 * i.e. the angle measured in degrees from the north line (0 degrees)
 *
 * @name bearing
 * @param {Coord} start starting Point
 * @param {Coord} end ending Point
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.final=false] calculates the final bearing if true
 * @returns {number} bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)
 * @example
 * var point1 = [44.022, 56.295];
 * var point2 = [44.012, 56.308];
 *
 * var bearing = getAngle(point1, point2, {final:true});
 *
 */
getAngle: (start, end, options) => {
    // Optional parameters
    options = options || {};
    var final = options.final;

    // Reverse calculation
    if (final === true) return mapMath.calculateFinalBearing(start, end);

    const coordinates1 = mapMath.getCoord(start);
    const coordinates2 = mapMath.getCoord(end);


    const lon1 = mapMath.degreesToRadians(coordinates1[0]);
    const lon2 = mapMath.degreesToRadians(coordinates2[0]);
    const lat1 = mapMath.degreesToRadians(coordinates1[1]);
    const lat2 = mapMath.degreesToRadians(coordinates2[1]);
    const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const b = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    return mapMath.radiansToDegrees(Math.atan2(a, b));
},

/**
 * Calculates Final Bearing
 *
 * @private
 * @param {Coord} start starting Point
 * @param {Coord} end ending Point
 * @returns {number} bearing
 */
calculateFinalBearing: (start, end) => {
    // Swap start & end
    var bear = mapMath.getAngle(end, start);
    bear = (bear + 180) % 360;
    return bear;
},

/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
radiansToDegrees: (radians) => {
    if (radians === null || radians === undefined) throw new Error('radians is required');

    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
},

/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
degreesToRadians: (degrees) => {
    if (degrees === null || degrees === undefined) throw new Error('degrees is required');

    var radians = degrees % 360;
    return radians * Math.PI / 180;
},

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
getCoord: (obj) => {
    if (!obj) throw new Error('obj is required');

    var coordinates = mapMath.getCoords(obj);

    // getCoord() must contain at least two numbers (Point)
    if (coordinates.length > 1 && mapMath.isNumber(coordinates[0]) && mapMath.isNumber(coordinates[1])) {
        return coordinates;
    } else {
        throw new Error('Coordinate is not a valid Point');
    }
},

/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array of numbers
 *
 * @name getCoords
 * @param {Array<number>|Geometry|Feature} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coord = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
getCoords: (obj) => {
    if (!obj) throw new Error('obj is required');
    var coordinates;

    // Array of numbers
    if (obj.length) {
        coordinates = obj;

    // Geometry Object
    } else if (obj.coordinates) {
        coordinates = obj.coordinates;

    // Feature
    } else if (obj.geometry && obj.geometry.coordinates) {
        coordinates = obj.geometry.coordinates;
    }
    // Checks if coordinates contains a number
    if (coordinates) {
        mapMath.containsNumber(coordinates);
        return coordinates;
    }
    throw new Error('No valid coordinates');
},

/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
containsNumber: (coordinates) => {
    if (coordinates.length > 1 && mapMath.isNumber(coordinates[0]) && mapMath.isNumber(coordinates[1])) {
        return true;
    }

    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return mapMath.containsNumber(coordinates[0]);
    }
    throw new Error('coordinates must only contain numbers');
},

/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
isNumber: (num) => {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
}