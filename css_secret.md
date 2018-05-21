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