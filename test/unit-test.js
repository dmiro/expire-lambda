var assert = require('assert'),
    expire = require('../lib/expire-lambda.js');
    
console.log('> init test');
 
assert.equal(expire.at.d(5).inDays(), 5);
 
assert.equal(expire.in.seconds(10).milliseconds(200).inMilliseconds(), 10*1000+200); 
assert.equal(expire.in.seconds(10).inSeconds(), 10);
assert.equal(expire.in.s(10).inSeconds(), 10);

assert.equal(expire.in.hours(1).minutes(10).seconds(2).inSeconds(), 60*60+10*60+2);
assert.equal(expire.in.h(1).m(10).s(2).inSeconds(), 60*60+10*60+2);

assert.equal(expire.in.days(0).hours(1).minutes(0).inSeconds(), 60*60);
assert.equal(expire.in.days(0).h(1).m(0).inSeconds(), 60*60);

assert.equal(expire.in.days(1).minutes(10).inSeconds(), 24*60*60+10*60);  
assert.equal(expire.in.d(1).m(10).inSeconds(), 24*60*60+10*60);  

assert.equal(expire.in.days(0).hours(3).inSeconds(), 3*60*60);
assert.equal(expire.in.d(0).h(3).inSeconds(), 3*60*60);

assert.equal(expire.in.hours(3).inSeconds(), 3*60*60);
assert.equal(expire.in.hours(3).inMinutes(), 3*60);
assert.equal(expire.in.hours(3).inHours(), 3);
assert.equal(expire.in.hours(3).inDays(), 3/24);
assert.equal(expire.in.h(3).inSeconds(), 3*60*60);
assert.equal(expire.in.h(3).inMinutes(), 3*60);
assert.equal(expire.in.h(3).inHours(), 3);
assert.equal(expire.in.h(3).inDays(), 3/24);

assert.throws(function(){expire.in.minuts(5).days(1).miSeconds()}, Error);
assert.throws(function(){expire.in.minuts(5).s(8).days(1).miSeconds()}, Error);

assert.equal(expire.in.seconds(10).getInstant().isExpired(), false);
assert.equal(expire.in.seconds(10).getInstant().timeRemaining().inSeconds(), 10);
assert.equal(expire.in.d(20).h(0).m(30).s(10).getInstant(new Date("December 17, 1995 03:24:00")).timeRemaining().inSeconds(), 0);
assert.notEqual(expire.in.d(20).h(0).m(30).s(10).getInstant(new Date("December 31, 2100 10:00:00")).timeRemaining().inSeconds(), 0);
assert.equal(expire.in.seconds(10).getInstant(new Date("December 17, 1995 03:24:00")).isExpired(), true);
assert.equal(expire.in.seconds(10).getInstant(new Date("December 31, 2100 10:00:00")).isExpired(), false);

var miInst =expire.in.seconds(1).getInstant();
setTimeout(function() {assert.equal(miInst.isExpired(),true);}, expire.in.seconds(3).inMilliseconds());
var miInst =expire.in.seconds(3).getInstant();
setTimeout(function() {assert.equal(miInst.isExpired(),false);}, expire.in.seconds(1).inMilliseconds());

console.log('> end test');
