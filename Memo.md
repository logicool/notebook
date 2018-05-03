# H5 清除console

```js
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
 
    while (length--) {
        method = methods[length];
 
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
```

# debounce的实现

```js
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
```

# 标签元素的宽高值获取

```js
//绝对宽度
Obj.offsetWidth
//绝对高度
Obj.offsetHeight

/*以下是获取窗口对象的宽高值。
clientHeight   获取对象的高度，不计算任何边距、边框、滚动条，但包括该对象的补白。
clientLeft   获取   offsetLeft   属性和客户区域的实际左边之间的距离。
clientTop   获取   offsetTop   属性和客户区域的实际顶端之间的距离。
clientWidth   获取对象的宽度，不计算任何边距、边框、滚动条，但包括该对象的补白。
clientX   设置或获取鼠标指针位置相对于窗口客户区域的   x   坐标，其中客户区域不包括窗口自身的控件和滚动条。 
clientY   设置或获取鼠标指针位置相对于窗口客户区域的   y   坐标，其中客户区域不包括窗口自身的控件和滚动条。
clip   设置或获取定位对象的哪个部分可见。
clipBottom   获取对象剪裁区域的底边坐标。
clipLeft   获取对象剪裁区域的左边坐标。
clipRight   获取对象剪裁区域的右边坐标。
clipTop   获取对象剪裁区域的顶边坐标。*/
```