> STABLE VERSION!


expire-lambda [EN]
=============

Function library to calculate the date &amp; time expiration 

### Activity diagram

![expire-lambda activity diagram](https://github.com/dmiro/expire-lambda/raw/master/resources/expire_activity.png)

###### example 1

    var expire = require('expire-lambda.js').expire;
    console.log(expire.hours(3).minutes(10).inSeconds()); // 10810 seconds
    console.log(expire.h(3).m(10).inSeconds()); // 10810 seconds

###### example 2

    var expire = require('expire-lambda.js').expire;
    console.log(expire.seconds(10).getInstant().timeRemaining().inSeconds()); // 10 seconds

###### example 3

    var miExpire = expire.seconds(10);
    var miInst = miExpire.getInstant();
    setTimeout(function() {  
        console.log('expired?:',miInst.isExpired()); // false
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 8.998
    }, expire.seconds(1).inMilliseconds());
    setTimeout(function() {
        console.log('expired?:',miInst.isExpired());// true
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 0
    }, expire.seconds(10).inMilliseconds());

expire-lambda [ES]
=============

Biblioteca de funciones para calcular la fecha y hora de caducidad

### Diagrama de actividades

![expire-lambda activity diagram](https://github.com/dmiro/expire-lambda/raw/master/resource/expire_activity.png)

###### ejemplo 1

    var expire = require('expire-lambda.js').expire;
    console.log(expire.hours(3).minutes(10).inSeconds()); // 10810 segundos
    console.log(expire.h(3).m(10).inSeconds()); // 10810 segundos

###### ejemplo 2

    var expire = require('expire-lambda.js').expire;
    console.log(expire.seconds(10).getInstant().timeRemaining().inSeconds()); // 10 segundos.

###### ejemplo 3

    var miExpire = expire.seconds(10);
    var miInst = miExpire.getInstant();
    setTimeout(function() {  
        console.log('expired?:',miInst.isExpired()); // false
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 8.998
    }, expire.seconds(1).inMilliseconds());
    setTimeout(function() {
        console.log('expired?:',miInst.isExpired());// true
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 0
    }, expire.seconds(10).inMilliseconds());
