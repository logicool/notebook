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

# 如果table中的td内容太长了可以使用省略点，给td标签增加如下类：

```css
.autocut {  
  max-width:180px;  
  overflow:hidden;  
  white-space:nowrap;  
  text-overflow:ellipsis;  
  -o-text-overflow:ellipsis;  
  -icab-text-overflow: ellipsis;  
  -khtml-text-overflow: ellipsis;  
  -moz-text-overflow: ellipsis;  
  -webkit-text-overflow: ellipsis;  
}
```

# 增加tooltip

bootstrap中tooltip常见用法如下：
```html
<td class="autocut" data-toggle="tooltip" title="Example tooltip">请悬停在我的上面</td>
```
title就是鼠标hover上去显示的tooltip内容
问题是不管有没有省略点td标签都有tooltip出现，这一点看起来不太友好，在没有省略点能完全展示内容的时候不应该有tooltip
实现方法

html代码
```html
<td class="autocut">请悬停在我的上面</td>
```

js代码，params-table是外层的div

```js
$('#params-table').on('mouseenter', "table td", function() {
  // 判断有没有省略点
  if (this.offsetWidth < this.scrollWidth) {
    $(this).attr('data-toggle', 'tooltip').attr('title', $(this).text());
  }
});
$('#params-table').on('mouseleave', 'table td', function() {
  $(this).attr('data-toggle', '');
});
```