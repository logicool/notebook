> jquery -> ajax -> vue -> css3 -> bootstrap -> webpack  highcharts  java

## javascript

0. Q：一个网页的浏览器的渲染过程是什么？A：首先获取html，然后构建dom树；其次根据css构建render树，render树中不包含定位和几何信息；最后构建布局数，布局是含有元素的定位和几何信息
0. Q: script标签的defer、async的区别? A: defer是在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行; async是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关 
0. Q: js中改变上下文的方式有哪些？ A：call，apply，bind
0. Q：js中的函数有几种？A: 普通函数，匿名函数， 闭包函数，自动执行函数等；
0. Q: 如下代码的区别是什么? `function a() {alert(1)}; var a = function() {alert(1)}` A: 函数声明和函数表达式； 在预解析的时候函数声明优于函数表达式（等同于变量声明）先声明
0. Q: js获取url参数的方法有什么？ A: window.location.href/document.location.href
1. Q: js中创建dom节点的方法有哪些？ A: createElement,createTextNode,createAttribute,createComment,createDocumentFragment(*);
2. Q: createDocumentFragment的常用方法是什么？ A: 当需要添加多个dom元素时，如果先将这些元素添加到DocumentFragment中，再统一将DocumentFragment添加到页面，会减少页面渲染dom的次数，效率会明显提升
3. 

## jquery & ajax

1. Q: jquery中的选择器有哪些？ A: 基本选择器（id,tag,class,属性等），层次选择器，过滤选择器，表单选择器（不要求全答出来，至少答出2种就可以）
2. Q: jq的ajax请求有几种方法？ A: load(),$.get(),$.post(),$.ajax()
3. Q: $.ajax()一般什么时候使用？A: 需要提交前回调函数,失败后处理,成功后处理及请求完成后处理回调函数等的时候
4. Q: 用jq做过什么动画效果吗？描述一下实现的方式？ A: 主要是了解下是否做过相关的动画
5. Q：项目中ajax的跨域问题如何做的？ A: 一般会用到jsnop或者cros
6. Q：针对jsnop或cros详细问，如何实现的？（jsnop需要前后端做callback的配合，cros的java设置也可以问一下！） A: 略。
7. Q: 如果用到iframe，如何做跨域？（可以细问实现方法） A: 主域相同： document.domain；主域不同：location.hash 和  window.name 

## vue

1. Q: 是否知道vue全家桶？ A: vue-router,vuex等；
10. Q: vue的主要生命周期是什么？ A: create  mounted update beforeDestory （答出以上就可以）
11. Q: methods和 watch的区别是什么？ A: 只要发生重新渲染method总是会执行而 计算属性watch只有在它的相关依赖发生改变时才会重新求值
12. Q: vue如何做双向绑定? A: v-model
13. Q：如何添加自定义事件？ A: Vue.directive
14. Q: 你觉得哪些项目适合vue框架? A: 略；
15. Q: 单页（SPA）和多页哪个更优？ A：没有哪个更优，看看对于多页和单页的理解；
16. Q: vue可以做多页吗？ 搜索引擎优化怎么做？ A: 可以； SEO可以用webpack插件提前做静态html渲染（prerender）或者做SSR（服务端渲染）；
17. Q：vue中父子组件中，父组件如何传值给子组件？ （可能会用vuex的方式回答，答完后可以接着问不用vuex的方式，下面2道题同样适用！）A: 通过子组件的props属性来实现父传子；
18. Q: 子组件如何传给父组件？ A: 通过子组件使用`$emit`发出自定义事件触发父组件方法的方法来传值；
19. Q: 非父子组件如何通信呢？ A: 通过eventBus（消息总线）的方式，也就是先`let Bus = new Vue(); // 创建总线` ，然后通过`$emit`和`$on`来发送和接受消息；
20. Q：vue-router如何实现动态路由加载？ A：略；
21. Q: 路由实现有几种方式是什么？分别是什么？你用过哪种？ A: 2种；分别是History和Hash；
22. Q: 如果用过hash的方式，那么后端是怎么配合的？有过什么坑？A: 后端需要配置404页面等路径；坑如：webpack静态路径配置、baseRoute设置等；
21. Q: 是否用vue做过组件？举个列子？ A: 略；
22. Q：想在组件的根元素上监听一个原生事件，如何做？ A: 组件中`v-on:click.native="fucntion dosomething()"`
23. Q: 那么如果我不想用`click.native`而只想用`click`，那么要怎么做？或者说要怎么修改修改组件？ A: 1、子组件监听父组件给的click事件； 2、子组件通过`$emit('click', fn)`的方式触发；

## css3

1. Q: css3与css有哪些区别？A: 多了些效果的支持，如圆角，渐变等；
25. Q: 是否用过scss或less等css预编译器？用他们有什么好处？实际怎么用的？
26. Q: 如果用过，那么问pc和mobile的适配如何做的？A: 主要看是否答出rem，viewport，@media等
27. Q: 可以深入的问rem的实现方式？A： 这个比较多，答案略吧。。。
28. Q：如果适配回答用2个资源的方案，那么问如何判断pc和mobile端？A: navigator.userAgent
29. Q: 多浏览器如何适配？ A：这个问题很大，一般会答出一大堆东西，主要几点-moz-、-ms-、-webkit-和-o-的前缀，!important这类东西，或者又说到Normalize.css或Reset
30. Q: box-sizing的作用? A: 设置CSS盒模型为标准模型或IE模型。标准模型的宽度只包括content，IE模型包括border和padding



## webpack

1. Q：webpack配置文件主要有哪几部分？ A: entry,output,Loader,Plugins
31. Q：列举一下常用的插件有哪些？A: 各种loader，Plugins；
32. Q：Loader的主要用途是什么？A: 能够调用外部的脚本或者工具，实现对不同格式文件的处理;
33. Q: 是否做过code-splitting？是否做过按需加载？如何实现？ A:  分离业务代码和第三方库; 利用 import() 语法按需加载；

## hightcharts
这个不熟。。。我可以问d3.js吗？