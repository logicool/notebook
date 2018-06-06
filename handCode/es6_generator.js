// 0
function *gen(x) {
  yield 1;
  yield 2;
  var y = yield x + 2;
  var z = yield x *10;
  console.log(x);
  console.log(y);
  console.log(z);
  return {x,y,z};
}
var g = gen(1)
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next('test1'))
console.log(g.next('test2'))

// 1
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);


// 2
var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}

//3
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('handCode/etc/fstab');
  var f2 = yield readFile('handCode/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 手动执行
var g = gen();

g.next().value.then(function(data){
  console.log('@', data.toString())
  g.next(data).value.then(function(data){
    console.log('#', data.toString())
    g.next(data);
  });
})

// 自动执行器
function run(gen){
  var g = gen();
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }
  next();
}

run(gen);

// 4
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);


// 5
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
console.log(a.next()) // Object{value:6, done:false}
console.log(a.next()) // Object{value:NaN, done:false}
console.log(a.next()) // Object{value:NaN, done:true}

var b = foo(5);
console.log(b.next()) // { value:6, done:false }
console.log(b.next(12)) // { value:8, done:false }
console.log(b.next(13)) // { value:42, done:true }

// 6
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b


// 7 for...of 可以不用next方法遍历出generator函数的iterator对象
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true)  {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// 8
// 利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj); // 这里用到了反射reflect

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe', full: 'Jane Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}

// 加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面
// 以上等价于
function* objectEntries() {
  let propKeys = Object.keys(this); // <======

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe', full: 'Jane Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) { // <======
  console.log(`${key}: ${value}`);
}

// 9 yield* 表达式
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// // 等同于
// function* bar() {
//   yield 'x';
//   yield 'a';
//   yield 'b';
//   yield 'y';
// }

// // 等同于
// function* bar() {
//   yield 'x';
//   for (let v of foo()) {
//     yield v;
//   }
//   yield 'y';
// }

for (let v of bar()){
  console.log(v);
}

// 10 状态机

/*
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
*/
var clock = (function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
}());
clock.next()
clock.next()