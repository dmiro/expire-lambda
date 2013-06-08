var assert = require('assert'),
    expire = require('../expire-lambda.js').expire;
    
console.log('> init test');

assert.equal(expire.seconds(10).milliseconds(200).inMilliseconds(), 10*1000+200);  // <-- error

assert.equal(expire.seconds(10).inSeconds(), 10);
assert.equal(expire.s(10).inSeconds(), 10);

assert.equal(expire.days(0).hours(1).minutes(10).seconds(2).inSeconds(), 60*60+10*60+2);
assert.equal(expire.days(0).h(1).m(10).s(2).inSeconds(), 60*60+10*60+2);

assert.equal(expire.days(0).hours(1).minutes(0).inSeconds(), 60*60);
assert.equal(expire.d(0).h(1).m(0).inSeconds(), 60*60);

//assert.equal(expire.days(1).minutes(10).inSeconds(), 24*60*60*60+10*60);  // <-- error
//assert.equal(expire.d(1).m(10).inSeconds(), 24*60*60*60+10*60);  // <-- error

assert.equal(expire.days(0).hours(3).inSeconds(), 3*60*60);
assert.equal(expire.d(0).h(3).inSeconds(), 3*60*60);

assert.equal(expire.hours(3).inSeconds(), 3*60*60);
assert.equal(expire.hours(3).inMinutes(), 3*60);
assert.equal(expire.hours(3).inHours(), 3);
assert.equal(expire.hours(3).inDays(), 3/24);
assert.equal(expire.h(3).inSeconds(), 3*60*60);
assert.equal(expire.h(3).inMinutes(), 3*60);
assert.equal(expire.h(3).inHours(), 3);
assert.equal(expire.h(3).inDays(), 3/24);

assert.throws(function(){expire.minuts(5).days(1).miSeconds()}, Error);
assert.throws(function(){expire.minuts(5).s(8).days(1).miSeconds()}, Error);

assert.equal(expire.seconds(10).getInstant().isExpired(), false);
assert.equal(expire.seconds(10).getInstant().timeRemaining().inSeconds(), 10);
assert.equal(expire.d(20).h(0).m(30).s(10).getInstant(new Date("December 17, 1995 03:24:00")).timeRemaining().inSeconds(), 0);
assert.notEqual(expire.d(20).h(0).m(30).s(10).getInstant(new Date("December 31, 2100 10:00:00")).timeRemaining().inSeconds(), 0);
assert.equal(expire.seconds(10).getInstant(new Date("December 17, 1995 03:24:00")).isExpired(), true);
assert.equal(expire.seconds(10).getInstant(new Date("December 31, 2100 10:00:00")).isExpired(), false);

console.log('> test ok');


