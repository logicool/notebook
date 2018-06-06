# CSS World

> **CSS世界的诞生就是为图文信息展示服务的**

## 何为流
> 可以比作现实世界中的 *“水流”* ，可以将流想象成现实的水流，并符合水流的物理特性。
> 将盛水容器中的**水**和**木头** 对应到html中最具代表的`<div>`和`<span>`即**块级元素**和**内联元素**。

* div等会自动填满容器；
* span等图片文字依次排列，不足则换行；

## 块级元素 block-level element
> 首先，**块级元素**和**display为block的元素**不是一个概念；
> 例如，`<li>`的默认display为list-item，`<table>`的默认display为table,
> 但是他们都**块级元素**，因为他们都符合块级元素的**基本特征**：*一个水平流上只能单独显示一个元素，多个块级元素则换行显示*。

## 盒子相关

display：block | inline | inline-block | table | ...

> 简单来说每个元素有2个盒子，即外在盒子和内在盒子（容器盒子），这就是为什么inline-block的元素既能和图文一行显示又能直接设置width/height的原因。所以block可以理解为block-block，inline可以理解为inline-inline，table可以理解为block-table。