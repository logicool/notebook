# CSS相关(CSS揭秘读书笔记)

## 响应式网页设计（RWD）
>比较常见的实践是用多种分辨率来测试一个网站,然后添加越来越多的 媒体查询(Media Query)规则来修补网站在这些分辨率下出现的问题。但是**每个媒体查询都会增加成本**。

下面有一些建议,可能会帮你避免不必要的媒体查询。

* 使用百分比长度来取代固定长度。如果实在做不到这一点,也应该 尝试使用与视口相关的单位(vw、vh、vmin 和 vmax),它们的值解析为视口宽度或高度的百分比。
* 当你需要在较大分辨率下得到固定宽度时,使用 max-width而不是 width,因为它可以适应较小的分辨率,而无需使用媒体查询。
 不要忘记为替换元素(比如 img、object、video、iframe 等)设 置一个 max-width,值为 100%。
* 假如背景图片需要完整地铺满一个容器,不管容器的尺寸如何变化, background-size: cover 这个属性都可以做到。但是,我们也要时刻牢记——带宽并不是无限的,因此在移动网页中通过 CSS 把一张 大图缩小显示往往是不太明智的。
* 当图片(或其他元素)以行列式进行布局时,让视口的宽度来决定列的数量。弹性盒布局(即 Flexbox)或者 display: inline-block 加上常规的文本折行行为,都可以实现这一点。
* 在使用多列文本时,指定column-width(列宽)而不是指定 column-count(列数),这样它就可以在较小的屏幕上自动显示为单列布局。

## currentColor
>这个关键字并没有绑定到一个固定的颜色值,而是一 直被解析为 color，也就是说currentColor等价于当前的文本的颜色。很多已有的属性也具有类似的行为。举例来说,如果你没有给边框指定颜色,它就会自动地从文本颜色那里得到颜色。这是因为currentColor本身就是很多CSS颜色属性的初始值,比如 border-color 和 outline-color,以及text-shadow 和 box-shadow 的颜色值

## inherit
>继承。inherit 可以用在任何CSS属性中,而且它总是绑定到父元素的计算值(对伪元素来说,则会取生成该伪元素的宿主元素)。

例如，tooltip的三角箭头总是希望能够自动继承背景和边框的式样

```css
.callout { position: relative; }
.callout::before { 
    content: "";
    position: absolute;
    top: -.4em; 
    left: 1em; 
    padding: .35em; 

    background: inherit; 
    border: inherit; 

    border-right: 0; 
    border-bottom: 0; 
    transform: rotate(45deg);
}
```

## background-clip
> 规定背景的绘制区域
> * border-box	背景被裁剪到边框盒
> * padding-box	背景被裁剪到内边距框
> * content-box	背景被裁剪到内容框

>如果要实现半透明的边框该怎么做？下面的代码你会发现半透明border不存在，或者说被backgound遮盖了，那么怎么办？
>
```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
```
>这就需要用到background-clip
>
```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
background-clip: padding-box;
```

## mix-blend-mode & background-blend-mode
> 混合模式 & 背景混合模式

>和ps上的混合模式一样

* mix-blend-mode: normal;          //正常
* mix-blend-mode: multiply;        //正片叠底
* mix-blend-mode: screen;          //滤色
* mix-blend-mode: overlay;         //叠加
* mix-blend-mode: darken;          //变暗
* mix-blend-mode: lighten;         //变亮
* mix-blend-mode: color-dodge;     //颜色减淡
* mix-blend-mode: color-burn;      //颜色加深
* mix-blend-mode: hard-light;      //强光
* mix-blend-mode: soft-light;      //柔光
* mix-blend-mode: difference;      //差值
* mix-blend-mode: exclusion;       //排除
* mix-blend-mode: hue;             //色相
* mix-blend-mode: saturation;      //饱和度
* mix-blend-mode: color;           //颜色
* mix-blend-mode: luminosity;      //亮度
* mix-blend-mode: initial;         //初始
* mix-blend-mode: inherit;         //继承
* mix-blend-mode: unset;           //复原

[各种background-blend-mode背景](http://bennettfeely.com/gradients/)

## isolation
> isolation是一个CSS3属性，顾名思意是“隔离”，支持的值除了万年不变的inherit外还包括auto和isolate.继承没什么好说的。auto实际上就是不干事的意思，是元素的默认值。所以，我们只需要关心isolation: isolate这个声明就好了。isolation: isolate正如其语义，就是隔离的意思，那隔离什么呢？本义是用来隔离mix-blend-mode元素的混合。

>当元素应用了混合模式的时候，默认情况下，其会混合z轴上所有层叠顺序比其低的层叠元素。但是，有时候，我们希望混合模式只到某一个元素，或者只是某一组元素怎么办呢？isolation: isolate就是为了解决这个问题产生的。

---


# 内容（部分内容略）

## 半透明边框

```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
background-clip: padding-box; <=====
```

## 多重边框

> 有box-shadow及outline两种方案 

* box-shadow
    ```css
    background: yellowgreen;
    box-shadow: 0 0 0 10px #655,
                0 0 0 15px deeppink,
                0 2px 5px 15px rgba(0,0,0,.6);
    ```
* outline
    ```css
    background: yellowgreen;
    border: 10px solid #655;
    outline: 5px solid deeppink;
    ```

## 边框内圆角

> border-radius,box-shadow和outline的配合；border-radius画圆角，outline画外框，box-shadow填充空白区域；

```css
background: tan;
border-radius: .8em;
padding: 1em;
box-shadow: 0 0 0 .6em #655;
outline: .6em solid #655;
```

## 自适应椭圆

> border-radius 它可以单独指定水平和垂直半径， 只要用一个斜杠（ /） 分隔这两个值即可

自适应的话只需要
```css
border-radius: 50% / 50%;  ==等价于==> border-radius: 50%
```

* 半椭圆
    ```css
    border-radius: 50% / 100% 100% 0 0;

    border-radius: 100% 0 0 100% / 50%;
    ```

* 四分之一椭圆
    ```css
    border-radius: 100% 0 0 0;
    ```

## 平行四边形

> 通过将矩形skew()变形后获得 ```transform: skewX(-45deg);```

* 嵌套方案
    ```html
    <a href="#yolo" class="button">
    <div>Click me</div>
    </a>

    <style>
    .button { transform: skewX(-45deg); }
    .button > div { transform: skewX(45deg); }
    </style>
    ```

* 伪元素方案
    ```css
    .button {
        position: relative;
        /* 其他的文字颜色、内边距等样式…… */
    }
    .button::before {
        content: ''; /* 用伪元素来生成一个矩形 */
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: -1;
        background: #58a;
        transform: skew(45deg);
    }
    ```

## 菱形图片

> 运用rotate的旋转效果及scale的放大效果来达到

```css
<div class="picture">
<img src="adam-catlace.jpg" alt="..." />
</div>

.picture {
    width: 400px;
    transform: rotate(45deg);
    overflow: hidden;
}
.picture > img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
}
```

> **部分浏览器（chrome&firefox）支持**的`clip-path`方法

```css
clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
```

甚至可以添加动画效果：

*只要我们的动画是在同一种形状函数（ 比如这里是 polygon()） 之间进行的， 而且点的数量是相同的。*

```css
img {
    clip-path: polygon(50% 0, 100% 50%,
    50% 100%, 0 50%);
    transition: 1s clip-path;
}
img:hover {
    clip-path: polygon(0 0, 100% 0,
    100% 100%, 0 100%);
}
```

## 切角效果

> 运用背景的 **线性渐变** 来达到

* 右下角切角
    ```css
    background: #58a;
    background: linear-gradient(-45deg, transparent 15px, #58a 0);
    ```

* 四角切角
    ```css
    background: #58a;
    background:
        linear-gradient(135deg, transparent 15px, #58a 0)
            top left,
        linear-gradient(-135deg, transparent 15px, #58a 0)
            top right,
        linear-gradient(-45deg, transparent 15px, #58a 0)
            bottom right,
        linear-gradient(45deg, transparent 15px, #58a 0)
            bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    ```

* More DRY SCSS的写法
    ```scss
    @mixin beveled-corners($bg, $tl:0, $tr:$tl, $br:$tl, $bl:$tr) 
    {
        background: $bg;
        background:
            linear-gradient(135deg, transparent $tl, $bg 0)
                top left,
            linear-gradient(225deg, transparent $tr, $bg 0)
                top right,
            linear-gradient(-45deg, transparent $br, $bg 0)
                bottom right,
            linear-gradient(45deg, transparent $bl, $bg 0)
                bottom left;
        background-size: 50% 50%;
        background-repeat: no-repeat;
    }
    ```
    然后， 在需要的时候， 我们就可以直接调用它， 并传入 2~5 个参数:

    ```scss 
    @include beveled-corners(#58a, 15px, 5px);
    ```

* 弧形切角（内凹切角）

    > 只需要用 **径向渐变** 替换 **线性渐变**  

    ```css
    background: #58a;
    background:
        radial-gradient(circle at top left,
            transparent 15px, #58a 0) top left,
        radial-gradient(circle at top right,
            transparent 15px, #58a 0) top right,
        radial-gradient(circle at bottom right,
            transparent 15px, #58a 0) bottom right,
        radial-gradient(circle at bottom left,
            transparent 15px, #58a 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    ```

* 内联svg与border-image方案

    *运用 **background-clip** 属性来避免背景色蔓延到边框区域*

    ```css
    border: 20px solid #58a;
    border-image: 1 url('data:image/svg+xml,\
        <svg xmlns="http://www.w3.org/2000/svg"
        width="3" height="3" fill="%2358a">\
        <polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/>\
        </svg>');
    background: #58a;
    background-clip: padding-box;
    ```

* 裁切路径的方案
    > 这个方法最大的好处在于， 我们可以使用任意类型的背景， 甚至可以对替换元素（ 比如图片） 进行裁切

    ```css
    background: #58a;
    clip-path: polygon(
        20px 0, calc(100% - 20px) 0, 100% 20px,
        100% calc(100% - 20px), calc(100% - 20px) 100%,
        20px 100%, 0 calc(100% - 20px), 0 20px
    );
    ```

## 提醒标签页

> 运用3D旋转来实现，配合Y轴的scale放大效果及底边固定旋转``transform-origin`
```css
transform: scaleY(1.3) perspective(.5em)
    rotateX(5deg);
transform-origin: bottom;
```

完整标签代码：
```css
nav > a {
    position: relative;
    display: inline-block;
    padding: .3em 1em 0;
}
nav > a::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    background: #ccc;
    background-image: linear-gradient(
    hsla(0,0%,100%,.6),
    hsla(0,0%,100%,0));
    border: 1px solid rgba(0,0,0,.4);
    border-bottom: none;
    border-radius: .5em .5em 0 0;
    box-shadow: 0 .15em white inset;
    transform: perspective(.5em) rotateX(5deg);
    transform-origin: bottom;
}
```
*transform-origin 改成bottom left 或 bottom right， 就可以立即得到左侧倾斜或右侧倾斜的标签页*

## 单侧投影

> 最终的解决方案来自 box-shadow 鲜为人知的第四个长度参数。 它排在模糊半径参数之后， 称作扩张半径。 这个参数会根据你指定的值去扩大或（当指定负值时） 缩小投影的尺寸。 举例来说， 一个 -5px 的扩张半径会把投影的宽度和高度各减少 10px（即每边各 5px）。

例：
* 底边投影 
    ```css
    box-shadow: 0 5px 4px -4px black
    ```
* 临边投影
    ```css
    box-shadow: 3px 3px 6px -3px black;
    ```
* 双侧投影
    ```css
    box-shadow: 5px 0 5px -5px black,
               -5px 0 5px -5px black;
    ```

## 不规则投影

> 通过css美化过后的元素无法完美渲染box-shadow的投影

**解决方案：** => 通过css3从svg那里学来的filter滤镜属性drop-shadow

例如：
```box-shadow: 2px 2px 10px rgba(0,0,0,.5);```

可以这样来写：
```filter: drop-shadow(2px 2px 10px rgba(0,0,0,.5));```

## 染色效果

*  saturate() 滤镜

    ```css
    img {
        transition: .5s filter;
        filter: sepia(1) saturate(4) hue-rotate(295deg);
    }
    img:hover,
    img:focus {
        filter: none;
    }
    ```
* 混合模式 mix-blend-mode: luminosity;//亮度
    ```html
    <div class="tinted-image"
        style="background-image:url(tiger.jpg)">
    </div>

    <style>
        tinted-image {
            width: 640px; height: 440px;
            background-size: cover;
            background-color: hsl(335, 100%, 50%);
            background-blend-mode: luminosity;
            transition: .5s background-color;
        }
        .tinted-image:hover {
            background-color: transparent;
        }
    </style>
    ```
## 毛玻璃效果

```html
<main>
    <blockquote>
        "The only way to get rid of a temptation[...]"
        <footer>－
            <cite>
                Oscar Wilde, The Picture of Dorian Gray
            </cite>
        </footer>
    </blockquote>
</main>
```
```css
body,
main::before {
    background: url("tiger.jpg") 0 / cover fixed;
}

main {
    position: relative;
    background: hsla(0, 0%, 100%, .3);
    overflow: hidden;
}

main::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(20px);
    margin: -30px;
}
```

## 折角效果

* 45度折角
    ```css
    background: #58a; /* 回退样式 */
    background:
        linear-gradient(to left bottom,
            transparent 50%, rgba(0,0,0,.4) 0)
            no-repeat 100% 0 / 2em 2em,
        linear-gradient(-135deg,
            transparent 1.5em, #58a 0);
    ```

* 其他角度折角
    ```css
    .note {
        position: relative;
        background: #58a; /* 回退样式 */
        background: linear-gradient(-150deg,
            transparent 1.5em, #58a 0);
        border-radius: .5em;
    }
    .note::before {
        content: '';
        position: absolute;
        top: 0; right: 0;
        background: linear-gradient(to left bottom,
            transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4))
            100% 0 no-repeat;
        width: 1.73em;
        height: 3em;
        transform: translateY(-1.3em) rotate(-30deg);
        transform-origin: bottom right;
        border-bottom-left-radius: inherit;
        box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
    }
    ```

## 插入换行
```html
<dl>
    <dt>Name:</dt>
    <dd>Lea Verou</dd>
    <dt>Email:</dt>
    <dd>lea@verou.me</dd>
    <dt>Location:</dt>
    <dd>Earth</dd>
</dl>
```
```css
dd+dt::before {
    content: '\A';
    white-space: pre;
}
dd+dd::before {
    content: ', ';
    font-weight: normal;
}
```

## 根据兄弟元素的数量来设置样式
```css
li:only-child {
    /* 只有一个列表项时的样式 */
}
```
```css
li:first-child:nth-last-child(1) {
    /* 相当于li:only-child */
}
```
> 一个正好有四个列表项的列表中的第一个列表项
```css
li:first-child:nth-last-child(4),
li:first-child:nth-last-child(4) ~ li {
    /* 当列表正好包含四项时，命中所有列表项 */
}
```
*scss方案*
```scss
/* 定义mixin */
@mixin n-items($n) {
    &:first-child:nth-last-child(#{$n}),
    &:first-child:nth-last-child(#{$n})~& {
        @content;
    }
}
/* 调用时是这样的： */
li {
    @include n-items(4) {
        /* 属性与值写在这里 */
    }
}
```

> n+b 这种形式的表达式可以选中从第 b 个开始的所有子元素。 举例来说， :nth-child(n+4) 将会选中除了第一、 二、三个子元素之外的所有子元素
```css
li:first-child:nth-last-child(n+4),
li:first-child:nth-last-child(n+4) ~ li {
    /* 当列表至少包含四项时，命中所有列表项 */
}
```
> 同理， -n+b 这种形式的表达式可以选中开头的 b 个元素。
```css
li:first-child:nth-last-child(-n+4),
li:first-child:nth-last-child(-n+4) ~ li {
    /* 当列表最多包含四项时，命中所有列表项 */
}
```
> 可以把这两种技巧组合起来使用
```css
li:first-child:nth-last-child(n+2):nth-last-child(-n+6),
li:first-child:nth-last-child(n+2):nth-last-child(-n+6) ~ li {
    /* 当列表包含2～ 6项时，命中所有列表项 */
}
```

## 满幅的背景，定宽的内容

> *背景宽度满幅， 内容宽度固定*

```css
footer {
    padding: 1em;
    padding: 1em calc(50% - 450px);
    background: #333;
}
```

## 垂直居中

>在 CSS 中对元素进行水平居中是非常简单的： 如果它是一个行内元素，就对它的 **父元素** 应用 `text-align: center`； 如果它是一个块级元素， 就对它 **自身** 应用 `margin: auto`。 然而如果要对一个元素进行垂直居中， 可能光是想想就令人头皮发麻了。

* 表格布局法（利用表格的显示模式） 需要用到一些冗余的 HTML 元
素， 因此这里不多介绍。
* 行内块法也不作讨论， 因为在我看来这种方法 hack 的味道很浓。

> 基本html
```html
<body>
    <main>
        <h1>Am I centered yet?</h1>
        <p>Center me, please!</p>
    </main>
</body>
```

> ### 基于绝对定位的解决方案

* 要求元素具有固定的宽度和高度
    ```css
    main {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -3em; /* 6/2 = 3 */
        margin-left: -9em; /* 18/2 = 9 */
        width: 18em;
        height: 6em;
    }
    ```
    > 这段代码在本质上做了这样几件事情： 先把这个元素的左上角放置在视口（或最近的、 具有定位属性的祖先元素） 的正中心， 然后再利用负外边距把它向左、 向上移动（ 移动距离相当于它自身宽高的一半）， 从而把元素的正中心放置在视口的正中心。 借助强大的 calc()函数， 这段代码还可以省掉两行声明：
    ```css
    main {
        position: absolute;
        top: calc(50% - 3em);
        left: calc(50% - 9em);
        width: 18em;
        height: 6em;
    }
    ```
    *以上的方法最大的局限在于它要求元素的宽高是固定的。* 

* 适应自身宽高

    在通常情况下， 对那些需要居中的元素来说， 其尺寸往往是由其内容来决定的。 如果能找到一个属性的百分比值以元素自身的宽高作为解析基准， 那我们的难题就迎刃而解了！ 遗憾的是， 对于绝大多数 CSS 属性（ 包括 margin） 来说，百分比都是以其父元素的尺寸为基准进行解析的。

    > CSS 领域有一个很常见的现象， 真正的解决方案往往来自于我们最意想不到的地方。 在这个例子中， 答案来自于 CSS 变形属性。 当我们在translate() 变形函数中使用百分比值时， 是以这个元素自身的宽度和高度为基准进行换算和移动的， 而这正是我们所需要的。

    ```css
    main {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ```

> ### 基于视口单位的解决方案

*这个技巧的实用性是相当有限的， 因为它只适用于在视口中居中的场景。*

```css
main {
    width: 18em;
    padding: 1em 1.5em;
    margin: 50vh auto 0;
    transform: translateY(-50%);
}
```

> ### 基于flexbox的解决方案

**flexbox就是为了针对这类需求所设计的。**

```css
body {
    display: flex;
    min-height: 100vh;
    margin: 0;
}
main {
    margin: auto;
}
```

## 过度和动画

* 缓动效果 ==> 贝塞尔曲线
* 逐帧动画 ==> steps()
* 闪烁效果 ==> animation-direction:normal|reverse|alternate|alternate-reverse
* 打字动画 ==> width: 15ch; /* 15个字符的文本宽度 */ && steps(15) 相同的步数
* 状态平滑的动画 ==> animation-play-state: paused|running

* 沿环形路径平移的动画

    * 两个元素的解决方案

        ```html
        <div class="path">
            <div class="avatar">
                <img src="lea.jpg" />
            </div>
        </div>
        ```

        ```css
        @keyframes spin {
            to {
                transform: rotate(1turn);
            }
        }
        .avatar {
            animation: spin 3s infinite linear;
            transform-origin: 50% 150px; /* 150px = 路径的半径 */
        }
        .avatar>img {
            animation: inherit;
            animation-direction: reverse;
        }

        /* 基础布局 */
        .avatar {
            width: 50px;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
        }
        .avatar>img {
            display: block;
            width: inherit;
        }
        .path {
            width: 300px;
            height: 300px;
            padding: 20px;
            border-radius: 50%;
            background: #fb3;
        }
        ```

    * 单个元素的解决方案

        > 首先要明白这段话： **“transform-origin 只是一个语法糖而已。 实际上你总是可以用translate() 来代替它。”**
        ```css
        transform: rotate(30deg);
        transform-origin: 200px 300px;
        /* 上面的等价于下面的 */
        transform: translate(200px, 300px)
        rotate(30deg)
        translate(-200px, -300px);
        transform-origin: 0 0;
        ```

        于是两个元素的方案就可以变成如下一个元素的方案：
        ```html
        <div class="path">
            <img src="http://lea.verou.me/book/adamcatlace.jpg" class="avatar" />
        </div>
        ```
        ```css
        @keyframes spin {
            from {
                transform: translate(50%, 150px)   /* 2 */
                           rotate(0turn)
                           translate(-50%, -150px) /* 1 */
                           translate(50%, 50%)     /* 1 */
                           rotate(1turn)
                           translate(-50%, -50%)   /* 2 */
            }
            to {
                transform: translate(50%, 150px)
                           rotate(1turn)
                           translate(-50%, -150px)
                           translate(50%, 50%)
                           rotate(0turn)
                           translate(-50%, -50%);
            }
        }
        .avatar {
            animation: spin 3s infinite linear;
        }
        ```

        **下面来简化下上面css**

        > 首先从最简单的地方入手， 把连续的 translate() 变形操作合并起来， 尤其是 translate(-50%, -150px) 和 translate(50%, 50%) 这样的情况，但是Y轴的百分比和绝对长度是无法合并的，不过X轴单纯水平方向上的位移还是可以相互抵消的，也就是相当于在Y轴上做了两次位移即：`translateY(-150px) translateY(50%)`。由于同一关键帧内的两次旋转也会相互抵消， 我们还可以把旋转之前和之后的水平位移动作去掉，再把垂直位移合并起来。

        > 1&1合并Y，抵消X后 ==> translateY(-150px) translateY(50%)

        > 2&2合并Y，抵消X后 ==> translateY(150px) translateY(-50%)

        ```css
        @keyframes spin {
            from {
                transform: translateY(150px) 
                           translateY(-50%)
                           rotate(0turn)
                           translateY(-150px)
                           translateY(50%)
                           rotate(1turn);
            }
            to {
                transform: translateY(150px)
                           translateY(-50%)
                           rotate(1turn)
                           translateY(-150px)
                           translateY(50%)
                           rotate(0turn);
            }
        }
        .avatar {
            animation: spin 3s infinite linear;
        }
        ```

        如果 **把头像放在圆心并以此作为起点** ， 我们就可以消除最开始的那两个位移操作了， 而实际上这两个位移在本质上所做的就是把它放在圆心。 

        ```css
        @keyframes spin {
            from {
                transform: rotate(0turn)
                           translateY(-150px) translateY(50%)
                           rotate(1turn)
            }
            to {
                transform: rotate(1turn)
                           translateY(-150px) translateY(50%)
                           rotate(0turn);
            }
        }
        .avatar {
            animation: spin 3s infinite linear;
        }

        /* 基础布局 */
        .avatar {
            display: block;
            width: 50px;
            margin: calc(50% - 25px) auto 0; /* 把头像放在圆心并以此作为起点 */
            border-radius: 50%;
            overflow: hidden;
        }
        .path {
            width: 300px;
            height: 300px;
            padding: 20px;
            margin: 100px auto;
            border-radius: 50%;
            background: #fb3;
        }
        ```