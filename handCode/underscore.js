(function() {
  // 创建一个root对象，在浏览器中表示为window（self）对象，在Node.js中表示global对象，this 在某些虚拟机
  // 之所以用self代替window是为了支持Web Worker
  var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || this || {};
  // 保存"_"(下划线变量)被覆盖之前的值
  var previousUnderscore = root._;
  // 原型赋值，便于压缩
  var ArrayProto = Array.protoytpe, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;
  // 将内置对象原型中的常用方法赋值给引用变量，以便快速访问核心原型。
  var push = ArrayProto.push,
      slice =ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;
  // 定义了一些我们想使用的ECMAScript 5方法
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  //用于代理-原型交换的裸函数引用。
  var Ctor = function(){};

  // 为下面的_对象创建一个安全的引用。
  var _ = function(obj) {
    // 如果在"_"的原型链上(即_的prototype所指向的对象是否跟obj是同一个对象，要满足"==="的关系)
    if (obj instanceof _) return obj;
    // 如果不是，则构造一个
    if (!this instanceof _) return new _(obj);
    // 以上都不是则将underscore对象存放在_.wrapped属性中
    this._wrapped = obj;
  }
  
  //针对不同的宿主环境, 将Undersocre的命名变量存放到不同的对象中
  if (typeof exports !='undefined' && !exports.nodeType) { // node环境
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else { // 浏览器环境
    root._ = _;
  }

  // 语义化当期版本
  _.VERSION = '1.9.0';

  // 优化callback,他是underscore内部用来执行函数的很重要的方法,并且改变所执行函数的作用域
  var optimizeCb = function(func, context, argCount) {
    // 作用域为undefined 返回函数
    if (context === void 0) return func;

    //argCount为函数参数的个数，针对不同参数个数进行不同的处理
    switch (argCount == null ? 3 : argCount) {
      //为单值的情况，例如times函数
      case 1: return function(value) {
        return func.call(context, value);
      };
      //因为2个参数的情况没有被用到，所以在新版中被删除了
      //3个参数用于一些迭代器函数，例如map函数
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection)
      };
      // 4个参数用于reduce和reduceRight函数
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      }
    }
    return function() {
      return func.apply(context, arguments);
    }
  }

  var builtinIteratee;

  // 真·回调
  var cb = function(value, context, argCount) {
    // 防止iteratee被重写
    if (_.iteratee != builtinIteratee) return _.iteratee(value, context);
    //如果为空，则返回value本身（identity函数就是一个返回本身的函数 ）
    if (value == null) return _.identity;
    //如果为函数，则改变所执行函数的作用域
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    //如果是对象并且不是个数组，判断是否匹配（matcher是一个用来判断是否匹配的方法）
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  }

  // 通过调用cb函数，生成每个元素的回调
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  }

  //TODO
}());