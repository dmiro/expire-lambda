/**
* Lambda factory
* @param [{namefunc, mult},{namefunc, mult}...] lambda
* @param {Object} acumulator
*/
function lambdaFactory(lambda, acum) {  
        
    var getFunc =  function (lambda, func, nameFunc){
            return function(t) {
                return lambdaFactory(lambda, func(acum, t, nameFunc));
            };
    };
    
    for (var i=0;i<lambda.length;i++) {
        var miFunc = lambda[i];
        if (miFunc !== undefined) {
            for (var x in miFunc.nameFuncs) {
				acum[miFunc.nameFuncs[x]] = getFunc(lambda.slice(i+1), miFunc.func, miFunc.nameFuncs[x]);
			}
        }
    }
            
    return acum;
}

/**
* IN Factory
*/
var MyInstantDate = function(milliseconds) {
    var result = new MyDate(milliseconds);
    result.isExpired = function(){
        return (Date.now() > this.inMilliseconds()); 
    };
    result.timeRemaining = function(){
        return this.isExpired() ? new MyDate(0) : new MyDate(this.inMilliseconds()-Date.now());    
    };
    return result;
};

var MyDate = function(milliseconds) {
    var result = new Date(milliseconds);
    result.inDays = function() { return this.valueOf()/1000/60/60/24};
    result.inHours = function() { return this.valueOf()/1000/60/60};
    result.inMinutes = function() { return this.valueOf()/1000/60};
    result.inSeconds = function() { return this.valueOf()/1000};
    result.inMilliseconds = function() { return this.valueOf() };
    result.getInstant = function(date) { 
        if (date)
            return new MyInstantDate(+date+this.inMilliseconds());  
		return new MyInstantDate(+new Date()+this.inMilliseconds());
	};
    return result;
};

exports.in = lambdaFactory([
    {nameFuncs:['days','d'],          func:function(acum, t) {return new MyDate(t*24*60*60*1000+acum.inMilliseconds())}},
    {nameFuncs:['hours','h'],         func:function(acum, t) {return new MyDate(t*60*60*1000+acum.inMilliseconds())}},
    {nameFuncs:['minutes','m'],       func:function(acum, t) {return new MyDate(t*60*1000+acum.inMilliseconds())}},
    {nameFuncs:['seconds','s'],       func:function(acum, t) {return new MyDate(t*1000+acum.inMilliseconds())}},
	{nameFuncs:['milliseconds','ms'], func:function(acum, t) {return new MyDate(t+acum.inMilliseconds())}}],
    new MyDate(0));
  
  
/**
* AT Factory
*/

// var MyAtInstantDate = function(date) {
//     var result = new MyDate(milliseconds);
//     result.isExpired = function(){
//         return (Date.now() > this.inMilliseconds()); 
//     };
//     result.timeRemaining = function(){
//         return this.isExpired() ? new MyDate(0) : new MyDate(this.inMilliseconds()-Date.now());    
//     };
//     return result;
// };

var MyAtDate = function() {
    var result = new Date(0);
    result.lastMonthDay = 0;
    result.weekDay = 0;
    result.lastWeek = 0;
 //    result.getInstant = function(date) { 
 //        if (date)
 //            return new MyInstantDate(+date+this.inMilliseconds());  
 //    	return new MyInstantDate(+new Date()+this.inMilliseconds());
	// };
    return result;
};
    
exports.at = lambdaFactory([
    {nameFuncs:['day','d','lastMonthDay','weekDay','lastWeek'], func:function(acum, t, nameFunc) {
        (acum[nameFunc])&&(typeof acum[nameFunc] !== 'function') ? acum[nameFunc] = t : acum.setUTCDate(t); 
        return acum;
    }},
    {nameFuncs:['month','M'], func:function(acum, t) {acum.setUTCMonth(t-1); return acum}},
    {nameFuncs:['year','y'], func:function(acum, t) {acum.setUTCFullYear(t); return acum}},
    {nameFuncs:['hour','h'], func:function(acum, t) {acum.setUTCHours(t); return acum}},
    {nameFuncs:['minute','m'], func:function(acum, t) {acum.setUTCMinutes(t); return acum}},
    {nameFuncs:['second','s'], func:function(acum, t) {acum.setUTCSeconds(t); return acum}},
    {nameFuncs:['millisecond','ms'], func:function(acum, t) {acum.setUTCMilliseconds(t); return acum}}], 
    new MyAtDate());
