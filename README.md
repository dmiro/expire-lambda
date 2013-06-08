> ALPHA VERSION!


expire-lambda [EN]
=============

Function library to calculate the date &amp; time expiration 

###### example 1

    var expire = require('expire-lambda.js').expire;
    console.log(expire.hours(3).minutes(10).inSeconds()); // 10810 seconds
    console.log(expire.h(3).m(10).inSeconds()); // 10810 seconds

###### example 2

    var expire = require('expire-lambda.js').expire;
    console.log(expire.seconds(10).getInstant().timeRemaining().inSeconds()); // 10 seconds


expire-lambda [ES]
=============

Biblioteca de funciones para calcular la fecha y hora de caducidad

###### ejemplo 1

    var expire = require('expire-lambda.js').expire;
    console.log(expire.hours(3).minutes(10).inSeconds()); // 10810 segundos
    console.log(expire.h(3).m(10).inSeconds()); // 10810 segundos

###### ejemplo 2

    var expire = require('expire-lambda.js').expire;
    console.log(expire.seconds(10).getInstant().timeRemaining().inSeconds()); // 10 segundos.
