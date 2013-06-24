/**
* Expire factory
* @param [{namefunc, mult},{namefunc, mult}...] lambda
* @param {Object} acumulator
*/
function expireFactory(lambda, acum) {  
        
    var getFunc =  function (lambda, func){
            return function(t) {
                return expireFactory(lambda, func(acum,t));
            };
    };
    
    for (var i=0;i<lambda.length;i++) {
        var miFunc = lambda[i];
        if (miFunc !== undefined) {
            for (var x in miFunc.nameFuncs) {
				acum[miFunc.nameFuncs[x]] = getFunc(lambda.slice(i+1), miFunc.func);
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

exports.in = expireFactory([
    {nameFuncs:['days','d'],          func:function(acum, t) {return new MyDate(t*24*60*60*1000+acum.inMilliseconds())}},
    {nameFuncs:['hours','h'],         func:function(acum, t) {return new MyDate(t*60*60*1000+acum.inMilliseconds())}},
    {nameFuncs:['minutes','m'],       func:function(acum, t) {return new MyDate(t*60*1000+acum.inMilliseconds())}},
    {nameFuncs:['seconds','s'],       func:function(acum, t) {return new MyDate(t*1000+acum.inMilliseconds())}},
	{nameFuncs:['milliseconds','ms'], func:function(acum, t) {return new MyDate(t+acum.inMilliseconds())}}],
    new MyDate(0));
  
  
/**
* AT Factory
*/
exports.at = expireFactory([
    {nameFuncs:['day','d','last-month-day','weekday','last-week'], func:function(acum, t) {}},
    {nameFuncs:['month','M'], func:function(acum, t) {}},
    {nameFuncs:['year','y'], func:function(acum, t) {}},
    {nameFuncs:['hour','h'], func:function(acum, t) {}},
    {nameFuncs:['minute','h'], func:function(acum, t) {}},
    {nameFuncs:['second','h'], func:function(acum, t) {}},
    {nameFuncs:['millisecond','h'], func:function(acum, t) {}}], 
    new MyDate(0));
