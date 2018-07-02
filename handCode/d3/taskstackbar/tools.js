function dataFormat (date, format) {
  date = new Date(date);
  const map = {
      "M": date.getMonth() + 1, //月份
      "d": date.getDate(), //日
      "h": date.getHours(), //小时
      "m": date.getMinutes(), //分
      "s": date.getSeconds(), //秒
      "q": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
      let v = map[t];
      if (v !== undefined) {
          if (all.length > 1) {
              v = '0' + v;
              v = v.substr(v.length - 2);
          }
          return v;
      }
      else if (t === 'y') {
          return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
  });
  return format;
};

function percentFormat (num, total) {
  if (total == 0 || num == 0) return '0'
  return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
};

/**
 * 返回svg的宽高
 * @param {String} id 元素id 
 */
/*
Element.getBBox()
对象。返回元素的边界框描述：
{
  cx:数值。中心点x位置。
  cy:数值。中心点y位置。
  h:数值。高度。
  height:数值。高度。
  path:字符串。盒子的路径命令。
  r0:数值。完全封闭盒子圆半径。
  r1:数值。能闭合的最小圆半径。
  r2:数值。能闭合的最大圆半径。
  vb:字符串。作为视窗盒子的命令。
  w:数值。宽度。
  width:数值。宽度。
  x2:数值。右侧的x位置值。
  x:数值。左侧的x位置值。
  y2:数值。底边缘的y位置值。
  y:数值。上边缘的y位置值。
}
*/
function getDimensions(id) {
  // console.log(id)
  const el = document.getElementById(id);
  let w = 0,
      h = 0;
  if (el) {
    const dimensions = el.getBBox();
    // console.log(dimensions)
    w = dimensions.width;
    h = dimensions.height;
  } else {
      console.log("error: getDimensions() " + id + " not found.");
  }
  // console.log('wh @' + w ,'@' + h)
  return {
      w: w,
      h: h
  };
}