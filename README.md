
expire-lambda [EN]
=============

Function library to calculate the date &amp; time expiration 

### Activity diagram

![expire-lambda activity diagram](https://github.com/dmiro/expire-lambda/raw/master/resources/expire_activity.png)

Example 1
---------

```js
   var expire = require('expire-lambda.js');
   console.log(expire.in.hours(3).minutes(10).inSeconds()); // 10810 seconds
   console.log(expire.in.h(3).m(10).inSeconds()); // 10810 seconds
```

Example 2
---------

```js
    var expire = require('expire-lambda.js');
    console.log(expire.in.seconds(10).getInstant().timeRemaining().inSeconds()); // 10 seconds
```

Example 3
---------

```js
    var expire = require('expire-lambda.js');
    var miExpire = expire.in.seconds(10);
    var miInst = miExpire.getInstant();
    setTimeout(function() {  
        console.log('expired?:',miInst.isExpired()); // false
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 8.998
    }, expire.in.seconds(1).inMilliseconds());
    setTimeout(function() {
        console.log('expired?:',miInst.isExpired());// true
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 0
    }, expire.in.seconds(10).inMilliseconds());
```

:yum: How to contribute
-----------------------

Have an idea? Found a bug? [add a new issue](https://github.com/dmiro/expire-lambda/issues) or [fork] (https://github.com/dmiro/expire-lambda#fork-destination-box) and sendme a pull request. Don't forget to add your name to the Contributors section of this document.

:scroll: License
----------------

Licensed under the MIT, see `LICENSE`

:heart_eyes: Contributors
--------------------------

David Miro <lite.3engine@gmail.com>


expire-lambda [ES]
=============

Biblioteca de funciones para calcular la fecha y hora de caducidad

### Diagrama de actividades

![expire-lambda activity diagram](https://github.com/dmiro/expire-lambda/raw/master/resources/expire_activity.png)

Ejemplo 1
---------

```js
    var expire = require('expire-lambda.js');
    console.log(expire.in.hours(3).minutes(10).inSeconds()); // 10810 segundos
    console.log(expire.in.h(3).m(10).inSeconds()); // 10810 segundos
```

Ejemplo 2
---------
```js
    var expire = require('expire-lambda.js');
    console.log(expire.in.seconds(10).getInstant().timeRemaining().inSeconds()); // 10 segundos.
```

Ejemplo 3
---------

```js
    var expire = require('expire-lambda.js');
    var miExpire = expire.in.seconds(10);
    var miInst = miExpire.getInstant();
    setTimeout(function() {  
        console.log('expired?:',miInst.isExpired()); // false
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 8.998
    }, expire.in.seconds(1).inMilliseconds());
    setTimeout(function() {
        console.log('expired?:',miInst.isExpired());// true
        console.log('time remaining?:',miInst.timeRemaining().inSeconds()); // 0
    }, expire.in.seconds(10).inMilliseconds());
```

:yum: Cómo contribuir
-----------------------

¿Alguna idea? ¿Encontrarte un error? [añade un nuevo issue](https://github.com/dmiro/expire-lambda/issues) o haz un [fork] (https://github.com/dmiro/expire-lambda#fork-destination-box) y enviame un pull request. No olvides añadir tu nombre en la sección de contribuyentes de este documento.

:scroll: Licencia
----------------

Licenciado bajo MIT, ver `LICENSE`

:heart_eyes: Contribuyentes
--------------------------

David Miro <lite.3engine@gmail.com>
