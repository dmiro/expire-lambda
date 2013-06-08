var MyDate = function(milliseconds) {
    var result = new Date(milliseconds);
    result.inDays = function() {
        return this.valueOf() / 1000 / 60 / 60 / 24;
    };
    result.inHours = function() {
        return this.valueOf() / 1000 / 60 / 60;
    };
    result.inMinutes = function() {
        return this.valueOf() / 1000 / 60;
    };
    result.inSeconds = function() {
        return this.valueOf() / 1000;
    };
    result.inMilliseconds = function() {
        return this.valueOf();
    };
    return result;
};

var MyInstantDate = function(milliseconds) {
    var result = new MyDate(milliseconds);
    result.isExpired = function(){
        return (Date.now() > this.inMilliseconds()); 
    };
    result.timeRemaining = function(){
        return this.isExpired() ? new MyDate(0) : new MyDate(this.inMilliseconds()-Date.now());    
    };
    return result;
}

/**
* Expire factory
* @param [{namefunc, mult},{namefunc, mult}...] lambda
* @param {Numeric} multiplier factor
*/
function expireFactory(lambda, acum) {  
    
    //var miAcum = acum;
    var miResult = new MyDate(acum);
    var miFunc;
    
    var getFunc =  function (lambda, mult){
            return function(t) {
                return expireFactory(lambda, t*mult+miResult.inMilliseconds());
            };
    };
    
    for (var i in lambda) {
        miFunc = lambda[i];
        if (miFunc !== undefined) {
            for (var x in miFunc.nameFuncs) {
				miResult[miFunc.nameFuncs[x]] = getFunc(lambda.slice(i+1), miFunc.mult);
			}
        }
    }
    
    miResult.getInstant = function(date) { 
		if (date)
			return new MyInstantDate(+date+miResult.inMilliseconds());  
		return new MyInstantDate(+new Date()+miResult.inMilliseconds());
	};
        
    return miResult;
}

exports.expire = expireFactory([
    {nameFuncs:['days','d'], mult:24*60*60*1000},
    {nameFuncs:['hours','h'], mult:60*60*1000},
    {nameFuncs:['minutes','m'], mult:60*1000},
    {nameFuncs:['seconds','s'], mult:1000},
	{nameFuncs:['milliseconds','ms'], mult:1}],
    0);