
 [TOC] 
 
# 目录


## Selector

* 基本选择器
	* \* 通配选择器
	* E 元素选择器
	* \#id ID选择器
	* \.class 类选择器
	* selector1,selectorN 群组选择器
* 层次选择器
	* E F 后代选择器
	* E>F 子选择器
	* E+F 相邻兄弟选择器（将选择E元素后面的同辈元素F）
	* E~F 通用选择器（将选择E元素后面的所有F元素）
* 动态伪类选择器
	* E:link 链接选择器（未被访问）
	* E:visited 链接选择器（已被访问）
	* E:active 被激活
	* E:hover 鼠标停留
	* E:focus 获得焦点
* 目标伪类选择器
	* E:target 被相关URL指向(`<a href="#xxx" />`)
* 语言伪类选择器 E:lang(language)
* UI元素状态伪类选择器
	* E:checked 选中
	* E:enabled 启用
	* E:disabled 禁用
* 结构伪类选择器
	* E:root 选择E所在文档的跟元素。在HTML中，跟元素始终是html
	* E:first-child 作为父元素的第一个子元素E。等同E:nth-child(1)
	* E:last-child 作为父元素的最后一个子元素E。等同E:nth-last-child(1)
	* E F:nth-child(n) 选择父元素E的第n个子元素F。n是整数且从1开始，n可以是整数或公式2n+1，或关键字even odd
	* E F:nth-last-child(n) 
	* E:first-of-type 选择父元素内具有指定类型的第一个E元素。等同E:nth-of-type(1)
	* E:last-of-type 最后一个E元素。等同E:nth-last-of-type(1)
	* E:nth-of-type(n) 选择父元素内具有指定类型的第n个E元素
	* E:nth-last-of-type(n) 
	* [E:only-child](http://www.w3school.com.cn/tiy/t.asp?f=css_sel_only-child) 选择父元素只包含一个子元素，且该子元素匹配E。
	* [E:only-of-type](http://www.w3school.com.cn/tiy/t.asp?f=css_sel_only-of-type) 选择父元素只包含一个同类型的子元素，且该子元素匹配E。
	* E:empty 选择没有子元素的元素，且该元素也不包含任何文本节点。
* 否定伪类选择器 
	* E:not(F) 匹配所有除元素F以外的E元素
* 伪元素
	* ::first-letter
	* ::first-line
	* ::before
	* ::after
	* ::selection
* 属性选择器
	* E[attr]
	* E[attr=val]
	* E[attr|=val] 具有val或val-开头的属性值匹配的E元素
	* E[attr~=val] attr属性有多个空格分割的值，其中的一个匹配val的E元素
	* E[attr*=val] attr属性包含val
	* E[attr^=val] 以val开头
	* E[attr$=val] 以val结尾

	>> 扩展 nth-child 和 nth-of-type的区别, 首先有如下代码
	
	```html
	<div class='demo'>
		<p> first </p>
		<p> second </p>
	</div>
	```
	> 下面的代码实现的效果是一样的 
	
	```css
		.demo>p:nth-child(2) {color: red;}
		.demo>p:nth-of-type(2) {color: red;}
	```
	> 那么他们是一致的吗？其实不然，我们稍微改造下,在前面加个其他标签`<span>`
	
	```html
	<div class='demo'>
		<span> title </span>
		<p> first </p>
		<p> second </p>
	</div>
	```
	> .demo>p:nth-child(2) {color: red;} -> 选择了第一个`<p>first</p>`
	
	> .demo>p:nth-of-type(2) {color: red;} -> 选择了想要选择的`<p>second</p>` 
	
	> 那么如果在`<span>`后面再加一个`<span>`呢？`nth-child(2)`选择不到任何元素了。
	
	> 所以只需要明确一点，:nth-child 选择的是某父元素的子元素，这个子元素并没有指定确切的类型，需要同时满足两个条件时才有效果：*一、是子元素；二、此子元素刚好处在那个位置上*。 **所以相对于脆弱的随时会被其他子元素挤出选择范围的:nth-child，:nth-of-type更稳定，更可靠。**
	
## Border
### 基本属性
#### border: border-width border-style border-color 其中style是必须的

* border-style: top right bottom left
* border-style: top right&left bottom
* border-style: top&bottom right&left

| 属性        | 功能    |
| :-------- | -----  |
| none	| 无边框	| 
| hidden	| 与none相同，但对于table时可以解决边框冲突 | 
| dotted	| 点 | 
| dashed	| 虚线	|
| solid	| 实线	|
| double | 双线 |
| groove | 3D凹槽 |
| ridge | 3D凸起 |
| inset | 3D inset |
| outset | 3D outset |
| inherit | 继承父元素 |

#### border-image

| 属性        | 功能    |
| :-------- | -----  |
| border-image-source | 用在边框的图片的路径 |
| border-image-slice | 图片边框向内偏移 |
| border-image-width | 图片边框的宽度 |
| border-image-outset | 边框图像区域超出边框的量 |
| border-image-repeat | 图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched) |

#### border-radius
> border-radius: top right bottom left / top right bottom left

* border-radius 分内半径和外半径，当border-width < border-radius 时可以很明显的看出效果

#### box-shadow

> box-shadow none | [inset x-offset y-offset blur spread color], ...

| 属性        | 功能    |
| :-------- | -----  |
| inset | 可选。将外部阴影 (outset) 改为内部阴影。 默认outset|
| x-offset | 必需。水平阴影的位置。允许负值。 |
| y-offset | 必需。垂直阴影的位置。允许负值。 |
| blur | 可选。模糊距离。只能是正值 |
| spread | 可选。阴影的尺寸。 允许负值 |
| color | 可选。阴影的颜色。 |

> 单边阴影

```css
.shadow {
	box-shadow:0 -2px 5px red;
}
```
如上代码呈现的阴影，除了顶部的阴影外，其他三边也会被加上蛋蛋的阴影效果，可这并不是我们所需要的。不过我们通过spread来调节就可以了。

```css
.shadow {
	box-shadow:0 -4px 5px -3px red;
}
```

>> 扩展 我们知道只用spread可以用shadow实现border效果，那么border和box-shadow实现的border有什么差别呢？

```html
<div class="box border"></div>
<div class="box shadow"></div>

.box {
	width: 200px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	float: left;
	margin-right: 20px;
	margin-top: 10px;
}
.border {
	box-sizing: content-box;
	border: 10px solid red;
}
.shadow {
	box-shadow: 0 0 0 10px red;
}
```
[实现效果看这里](http://result.dabblet.com/gist/3368804cfedca61a43801fbe39fab72b/5cd653b5dfc88264cece98b7cf056d84b194c168)
> 证明了box-shadow不会影响页面的任何布局。border元素的边框被计算了宽度，但box-shadow的阴影被浏览器忽略不计。


## Background
### 基本属性
* background-color 背景颜色
* background-image 背景图片
* background-repeat 背景图片展示方式
* background-attachment 背景图片固定还是滚动
* background-position 背景图片位置

### 新增属性
* background-origin 指定绘制背景图片的起点
* background-clip 指定背景图片的显示范围
* background-size 指定背景图片的尺寸大小

> background-origin: padding-box|border-box|content-box;

> background-clip: border-box|padding-box|content-box;

* border-box: 到border外沿
* padding-box: 到padding的外沿
* content-box: 到内容的外沿

## Text
### 字体类型
| 属性        | 功能    | 值 |
| :-------- | --- | -------------- |
| font-family | 字体类型 | "Times New Roman",Georgia,Serif ... |
| font-style | 字体样式 | normal,italic,oblique,inherit |
| font-size/line-height | 字体尺寸和行高 | **font-size**:xx-small,x-small,small,medium,large,x-large,xx-large,smaller(设置为比父元素更小的尺寸) ,larger,length,%,inherit,**line-height**: normal,number(数字，此数字会与当前的字体尺寸相乘来设置行间距),length,% ,inherit |
| font-weight | 字体粗细 | 100~900(400 等同于 normal，而 700 等同于 bold),normal,bold,bolder,lighter, inherit |
| font-variant | 字体大小写 | normal，small-caps(小型大写字母), inherit |

### 文本类型
| 属性        | 功能    | 值 |
| :-------- | -----  | --- |
| color	| 设置文本的颜色 | |
| direction |	规定文本的方向/书写方向 | ltr,rtl,inherit |
| letter-spacing	| 设置字符间距 | normal,length |
| line-height	 | 设置行高 | normal,number(数字，此数字会与当前的字体尺寸相乘来设置行间距),length,%,inherit |
| text-align	| 规定文本的水平对齐方式 | left,center,right,inherit |
| text-decoration | 规定添加到文本的装饰效果 | none,underline(下),overline（上）,line-through（删除线）, inherit |
| text-indent | 规定文本块首行的缩进 | length,%(定义基于父元素宽度的百分比的缩进),inherit |
| text-shadow | 向文本添加阴影 | text-shadow: x-offset y-offset blur color |
| text-transform | 控制文本的大小写 | none,uppercase,lowercase,capitalize, inherit |
| white-space	 | 规定如何处理元素中的空白 | normal,nowrap(文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止,空白合并),pre(空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签),pre-wrap（保留空白符序列，但是正常地进行换行）,pre-line（合并空白符序列，但是保留换行符） |
| word-spacing | 设置单词间距 | normal,length(可以为负),inherit |
| text-overflow | 规定当文本溢出包含元素时发生的事情 | clip，ellipsis（显示省略符号来代表被修剪的文本），string（使用给定的字符串来代表被修剪的文本） |
| word-break | 规定非中日韩文本的换行规则 | normal，break-all（允许在单词内换行），keep-all（只能在半角空格或连字符处换行） |
| word-wrap | 允许对长的不可分割的单词进行分割并换行到下一行 | normal，break-word（在长单词或 URL 地址内部进行换行） |

---
> 文本显示省略标记（...）的方法：
>
```css 
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
```

---

> 运用text-shadow还可以制作3D立体文字
> [实现效果看这里](http://result.dabblet.com/gist/9f952e80e87befb20334c432b4d6fad3/ab7670844af4b5a2e922ce597d951fbf997693a9)



## Box
### box-sizing
> box-sizing: content-box|border-box|inherit;

* box-sizing:content-box 宽度和高度分别应用到元素的内容框(content), 在宽度和高度之外绘制元素的内边距和边框,即：元素的实际宽度 = width + padding + border + margin
* box-sizing:border-box 为元素设定的宽度和高度决定了元素的边框盒。就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制,通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度,即：元素的事迹宽度 = width + margin 而content的宽度 = width - border - padding



## Transition

## Animation

