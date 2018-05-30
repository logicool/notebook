/**
 * curry
 * curry 的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
 */
// 这就是curry
// var add = function(x) {
//   return function(y) {
//     return x + y;
//   };
// };
// var increment = add(1);
// var addTen = add(10);
// increment(2); // 3
// addTen(2); // 12
//========================================start========================================
require('./libs/support') // 已经curry化的函数
var _ = require('ramda'); // curry化函数的第三方库

// 通过局部调用（partial apply）移除所有参数
// var words = function(str) {
//   return split(' ', str);
// };
//========================================
var words = split(' ');
console.log('words@',words('i am spider-man'));


// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组
var sentences = undefined;
//========================================
var sentences = map(words);
console.log('sentences@',sentences(['i am spider-man', 'i am iron-man']))


// 通过局部调用（partial apply）移除所有参数
// var filterQs = function(xs) {
//   return filter(function(x){ return match(/q/i, x); }, xs);
// };
//========================================
var filterQs = filter(match(/q/i));
console.log('filterQs@',filterQs(['qq', 'jquery', 'quite', 'steam']))


// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数
// 无须改动:
var _keepHighest = function(x,y){ return x >= y ? x : y; };
// 重构这段代码:
// var max = function(xs) {
//   return reduce(function(acc, x){
//     return _keepHighest(acc, x);
//   }, -Infinity, xs);
// };
//========================================
var max = reduce(_keepHighest, -Infinity);
console.log('max@',max([123,123,33,44,0,-12]));


// 包裹数组的 `slice` 函数使之成为 curry 函数
//[1,2,3].slice(0, 2)
var slice = undefined;
//========================================
var slice = _.curry(function(start, end, xs) { return xs.slice(start, end); });
var doSlice = slice(1,3);
console.log('slice@',doSlice(['first', 'second', 'third', 'forth', 'fifth']));
console.log('slice@',slice(1)(3)(['first', 'second', 'third', 'forth', 'fifth']));


// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
var take = undefined;
//========================================
var take = slice(0);
console.log('take@',take(2)(['a', 'b', 'c', 'd']));


/**
 * compose
 * compose 组合看起来像是在饲养函数。你就是饲养员，选择两个有特点又遭你喜欢的函数，让它们结合，产下一个崭新的函数。
 */
// 这就是组合 compose
// var compose = function(f,g) {
//   return function(x) {
//     return f(g(x)); // 在 compose 的定义中，g 将先于 f 执行，因此就创建了一个从右到左的数据流
//   };
// };
// var toUpperCase = function(x) { return x.toUpperCase(); };
// var exclaim = function(x) { return x + '!'; };
// var shout = compose(exclaim, toUpperCase);
// shout("send in the clowns"); //=> "SEND IN THE CLOWNS!"

//========================================start========================================
require('./libs/support') // 已经curry化的函数
var _ = require('ramda'); // curry化函数的第三方库
var accounting = require('accounting');

// 示例数据
var CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
// var isLastInStock = function(cars) {
//   var last_car = _.last(cars);
//   return _.prop('in_stock', last_car);
// };
//========================================
var isLastInStock = _.compose(_.prop('in_stock'), _.last)
console.log('isLastInStock@', isLastInStock(CARS));


// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = undefined;
//========================================
var nameOfFirstCar = _.compose(_.prop('name'), _.head);
console.log('nameOfFirstCar@', nameOfFirstCar(CARS));


// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动
// var averageDollarValue = function(cars) {
//   var dollar_values = map(function(c) { return c.dollar_value; }, cars);
//   return _average(dollar_values);
// };
//========================================
var _average = _.compose(_average, _.map(_.prop('dollar_value')));
console.log('_average@', _average(CARS));


// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。
var _underscore = replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它
var sanitizeNames = undefined;
//========================================
// var sanitizeNames = _.compose(_.map(_underscore), _.map(_.toLower), _.map(_.prop('name')))
// ===> 可以提取出 _.map 变成下面
var sanitizeNames = _.map(_.compose(_underscore, _.toLower, _.prop('name')))
console.log('sanitizeNames@', sanitizeNames(CARS));


// 使用 compose 重构 availablePrices
// var availablePrices = function(cars) {
//   var available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x){
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };
//========================================
var formatPrice = _.compose(accounting.formatMoney, _.prop('dollar_value'));
var availablePrices = _.compose(join(', '), _.map(formatPrice), _.filter(_.prop('in_stock')));
console.log('availablePrices@', availablePrices(CARS))


// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()用来反转参数
// var fastestCar = function(cars) {
//   var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
//   var fastest = _.last(sorted);
//   return fastest.name + ' is the fastest';
// };
//========================================
var append = _.flip(_.concat);
var fastestCar = _.compose(append(' is the fastest'), _.prop('name') ,_.last ,_.sortBy(_.prop('horsepower')))
console.log('fastestCar@', fastestCar(CARS))




