# CSS相关(CSS揭秘读书笔记)

## currentColor
这个关键字并没有绑定到一个固定的颜色值,而是一 直被解析为 color，也就是说currentColor等价于当前的文本的颜色。很多已有的属性也具有类似的行为。举例来说,如果你没有给边框指定颜色,它就会自动地从文本颜色那里得到颜色。这是因为currentColor本身就是很多CSS颜色属性的初始值,比如 border-color 和 outline-color,以及text-shadow 和 box-shadow 的颜色值

## inherit
继承。inherit 可以用在任何CSS属性中,而且它总是绑定到父元素的计算值(对伪元素来说,则会取生成该伪元素的宿主元素)。

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

## 响应式网页设计（RWD）
比较常见的实践是用多种分辨率来测试一个网站,然后添加越来越多的 媒体查询(Media Query)规则来修补网站在这些分辨率下出现的问题。但是**每个媒体查询都会增加成本**。

下面有一些建议,可能会帮你避免不必要的媒体查询。
* 使用百分比长度来取代固定长度。如果实在做不到这一点,也应该 尝试使用与视口相关的单位(vw、vh、vmin 和 vmax),它们的值解析为视口宽度或高度的百分比。
* 当你需要在较大分辨率下得到固定宽度时,使用 max-width而不是 width,因为它可以适应较小的分辨率,而无需使用媒体查询。
 不要忘记为替换元素(比如 img、object、video、iframe 等)设 置一个 max-width,值为 100%。
* 假如背景图片需要完整地铺满一个容器,不管容器的尺寸如何变化, background-size: cover 这个属性都可以做到。但是,我们也要时刻牢记——带宽并不是无限的,因此在移动网页中通过 CSS 把一张 大图缩小显示往往是不太明智的。
* 当图片(或其他元素)以行列式进行布局时,让视口的宽度来决定列的数量。弹性盒布局(即 Flexbox)或者 display: inline-block 加上常规的文本折行行为,都可以实现这一点。
* 在使用多列文本时,指定column-width(列宽)而不是指定 column-count(列数),这样它就可以在较小的屏幕上自动显示为单列布局。