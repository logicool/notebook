
## javascript

### 1.script标签的defer、async的区别? 
>* defer是在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行; 
>* async是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关 
### 2.延迟加载js的方法有哪些？你觉得最好的是哪个？ 
> defer, async, js在页面底部；推荐用法： 
>    ```html
>        // 这些代码应被放置在</body>标签前(接近HTML文件底部)
>        <script type="text/javascript">
>          function downloadJSAtOnload() {
>            var element = document.createElement("script");
>            element.src = "defer.js";
>            document.body.appendChild(element);
>          }
>          if (window.addEventListener)
>            window.addEventListener("load", downloadJSAtOnload, false);
>          else if (window.attachEvent) window.attachEvent("onload", downloadJSAtOnload);
>          else window.onload = downloadJSAtOnload;
>        </script>
>    ```

### 3.js中改变上下文的方式有哪些？ 
> call，apply，bind
### 4.js中的函数有几种？
>普通函数，匿名函数， 闭包函数，自动执行函数等；
### 5. **@** 如下代码的区别是什么? `function a() {alert(1)}; var a = function() {alert(1)}` 
>函数声明和函数表达式； 在预解析的时候函数声明优于函数表达式（等同于变量声明）先声明
### 6.js获取url参数的方法有什么？ 
>window.location.href/document.location.href
### 7.js中创建dom节点的方法有哪些？ 
>createElement,createTextNode,createAttribute,createComment,createDocumentFragment(*);
### 8. **@** createDocumentFragment的常用方法是什么？ 
>当需要添加多个dom元素时，如果先将这些元素添加到DocumentFragment中，再统一将DocumentFragment添加到页面，会减少页面渲染dom的次数，效率会明显提升

## jquery & ajax

### 1.jquery中的选择器有哪些？ 
>基本选择器（id,tag,class,属性等），层次选择器，过滤选择器，表单选择器（不要求全答出来，至少答出2种就可以）
### 2.jq的ajax请求有几种方法？ 
>load(),$.get(),$.post(),$.ajax()
### 3.$.ajax()一般什么时候使用？
>需要提交前回调函数,失败后处理,成功后处理及请求完成后处理回调函数等的时候
### 4.用jq做过什么动画效果吗？描述一下实现的方式？ 
>主要是了解下是否做过相关的动画
### 5.项目中ajax的跨域问题如何做的？ 
>一般会用到jsnop或者cors
### 6.针对jsnop或cors详细问，如何实现的？（jsnop需要前后端做callback的配合，cors的java设置也可以问一下！） 
>略。
### 7.如果用到iframe，如何做跨域？（可以细问实现方法） 
>主域相同： document.domain；主域不同：location.hash 和  window.name 

## vue

### 1.vue的主要生命周期是什么？ 
>create mounted update beforeDestory （答出以上就可以）
### 2.methods和 watch的区别是什么？ 
>只要发生重新渲染method总是会执行而 计算属性watch只有在它的相关依赖发生改变时才会重新求值
### 3.vue如何做双向绑定? 
>v-model
### 4.如何添加自定义事件？ 
>Vue.directive
### 5.你觉得哪些项目适合vue框架? 
>略；
### 6.单页（SPA）和多页哪个更优？ 
>没有哪个更优，看看对于多页和单页的理解；
### 7.vue可以做多页吗？ 搜索引擎优化怎么做？ 
>可以； SEO可以用webpack插件提前做静态html渲染（prerender）或者做SSR（服务端渲染）；
### 8.vue中父子组件中，父组件如何传值给子组件？ （可能会用vuex的方式回答，答完后可以接着问不用vuex的方式，下面2道题同样适用！）
>通过子组件的props属性来实现父传子；
### 9.子组件如何传给父组件？ 
>通过子组件使用`$emit`发出自定义事件触发父组件方法的方法来传值；
### 10.非父子组件如何通信呢？ 
>通过eventBus（消息总线）的方式，也就是先`let Bus = new Vue(); // 创建总线` ，然后通过`$emit`和`$on`来发送和接受消息；
### 11.vue-router如何实现动态路由加载？ 
>略；
### 12.路由实现有几种方式是什么？分别是什么？你用过哪种？ 
>2种；分别是History和Hash；
### 13.如果用过hash的方式，那么后端是怎么配合的？有过什么坑？
>后端需要配置404页面等路径；坑如：webpack静态路径配置、baseRoute设置等；
### 14.是否用vue做过组件？举个列子？ 
>略；
### 15. **@**  想在组件的根元素上监听一个原生事件，如何做？ 
>组件中`v-on:click.native="fucntion dosomething()"`
### 16.**@** 那么如果我不想用`click.native`而只想用`click`，那么要怎么做？或者说要怎么修改修改组件？ 
> 1、子组件监听父组件给的click事件；
> 
> 2、子组件通过`$emit('click', fn)`的方式触发；

## css3

### 1.css3与css有哪些区别？
>多了些效果的支持，如圆角，渐变等；
### 2.是否用过scss或less等css预编译器？用他们有什么好处？实际怎么用的？
### 3.如果用过，那么问pc和mobile的适配如何做的？
>主要看是否答出rem，viewport，@media等
### 4.可以深入的问rem的实现方式？
>这个比较多，答案略吧。。。
### 5.如果适配回答用2个资源的方案，那么问如何判断pc和mobile端？
>navigator.userAgent
### 6.多浏览器如何适配？ 
>这个问题很大，一般会答出一大堆东西，主要几点-moz-、-ms-、-webkit-和-o-的前缀，!important这类东西，或者又说到Normalize.css或Reset
### 7.box-sizing的作用? 
>设置CSS盒模型为标准模型或IE模型。标准模型的宽度只包括content，IE模型包括border和padding



## webpack

### 1.webpack配置文件主要有哪几部分？ 
>entry,output,Loader,Plugins
### 2.列举一下常用的插件有哪些？
>各种loader，Plugins；
### 3.想屏蔽掉生产环境中的console输出怎么做？ 
>UglifyJsPlugin配置中drop_console: true屏蔽掉
### 4.**@** Loader的主要用途是什么？
>能够调用外部的脚本或者工具，实现对不同格式文件的处理;
### 5.是否做过code-splitting？是否做过按需加载？如何实现？ 
>分离业务代码和第三方库; 利用 import() 语法按需加载；

## 其他
### 0.**@** 描述一下什么是CommonJS, AMD, CMD规范? 
> 主要内容：
> * CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}， NodeJS、webpack都是用CommonJS规范编写的；
> * AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"，因为`require`是同步加载的，服务端还好，对于浏览器来说commonJS的require加载模块会造成阻塞，所以AMD的require的模块加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行，RequireJS，必须采用特定的define()函数来定义，AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块；
> * CMD 即Common Module Definition公共模块定义，代表库SeaJS，CMD推崇就近依赖，只有在用到某个模块的时候再去require；
> * 还有个UMD的概念，Universal Module Definition通用模块定义，是AMD和CommonJS的一个糅合，AMD是浏览器优先，异步加载；CommonJS是服务器优先，同步加载，如果要通用呢?那就先判断是否支持node.js的模块,存在就用node，然后再判断是否支持AMD（define是否存在），存在就用AMD的方式加载。
### 1. 一个网页的浏览器的渲染过程是什么？
> * 首先获取html，然后构建dom树；
> * 其次根据css构建render树，render树中不包含定位和几何信息；
> * 最后构建布局数，布局是含有元素的定位和几何信息

### 2. 浏览器多进程有哪些？渲染进程有哪些线程？
> * 浏览器多进程：主进程（Brower进程），只有一个；插件进程，多个；GPU进程，最多一个； 渲染进程（浏览器内核 Renderer进程，内部多线程），每个tab分页一个进程；
> * 渲染进程：GUI渲染线程、JS引擎线程（GUI和JS进程互斥）、事件触发线程、定时触发器线程、异步http请求线程

### 3. GUI渲染线程与JS引擎线程的关系是什么？为什么？
> 互斥；
>
> 由于JavaScript是可操纵DOM的，如果在修改这些元素属性同时渲染界面（即JS线程和UI线程同时运行），那么渲染线程前后获得的元素数据就可能不一致了。
### 4. WebWorker线程是什么？
> Html5新支持的web worker，它为Web内容在后台线程中运行脚本提供了一种简单的方法，workers运行在另一个全局上下文中；
>
> * 创建Worker时，JS引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作DOM）
> * JS引擎线程与worker线程间通过特定的方式通信（postMessage API，需要通过序列化对象来与线程交互特定的数据）
### 5.load事件与DOMContentLoaded事件的先后?
> * 当 DOMContentLoaded 事件触发时，仅当DOM加载完成时触发，不包括样式表，图片。例如async的script就不一定完成；
> * 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片都已经加载完成了。
> 
> 因此 DOMContentLoaded -> load的顺序
### 6.JS分为同步任务和异步任务？
> * 同步任务都在主线程上执行，形成一个执行栈
> * 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
> * 一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。
### 7.如下代码的运行结果是什么？为什么？
> ```js
> console.log('js start');
> setTimeout(function () {
>   console.log('setTimeout 0');
> }, 0);
> Promise.resolve().then(function () {
>   console.log('promise1');
> }).then(function () {
>   console.log('promise2');
> });
> console.log('js end');
> ```

> 结果： js start -> js end -> promise1 -> promise2 -> setTimeout 0
> 
> 重点内容是Promise和setTiemout的顺序问题，其他的顺序原因参考上一题@5
>
> * JS中分为两种任务类型: macrotask和microtask,在ES里，microtask称为jobs，macrotask可称为task；
> * 每次执行栈执行的代码就是一个macrotask，浏览器的执行顺序是:`task->渲染->task->...`
> * microtask则是在当前 task 执行结束后立即执行的任务，而setTimeout是task，所以js end（macrotask）后先执行promise（microtask），渲染，在执行另一个macrotask（setTimeout）

> 补充
> * macrotask：主代码块，setTimeout，setInterval等（事件队列中的每一个事件都是一个macrotask）
> * microtask：Promise，process.nextTick等
> * 在node环境下，process.nextTick的优先级高于Promise
> * setImmediate则是在下一次EventLoop（macrotask）时触发，优先级高于setTimeout；





-----


## 如果table中的td内容太长了可以使用省略点，给td标签增加如下类：

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

## 增加tooltip

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