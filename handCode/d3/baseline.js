
const width = 750,  height = 650
const radius = Math.min(width, height)/2
const sequence_config = {
  w: 75, h: 30, s: 3, t: 10
}
const colors = [
  "#ce5242", 
  "#762f07", 
  "#96514d", 
  "#b8d200",
  "#e6b422",
  "#2792c3",
  "#006e54",
  "#8c6450",
  "#895b8a",
  "#70f3ff",
  "#425066"
]

/**
 * 定义D3
 */
let sunburst = d3.select("#chart")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
          .append("svg:g")
          .attr("id", "container")
          .attr("transform", "translate(" + width/2 + "," + height/2 + ")")

/**
 * 处理层次化数据
 */
let partition = d3.partition().size([2 * Math.PI, radius * radius])

/**
 * 定义圆弧
 */
let arc = d3.arc()
        .startAngle(function(d) {return d.x0})
        .endAngle(function(d) {return d.x1})
        .innerRadius(function(d) {return Math.sqrt(d.y0)})
        .outerRadius(function(d) {return Math.sqrt(d.y1)})

/**
 * 读取数据并开始布局
 */
d3.json("./lineData.json").then(function(text) {
  // 洗下数据
  const json = buildHierarchy(text)
  console.log("json", json)
  createSunbrust(json)
});

/**
 * 构造旭日图
 * @param {json} json 数据
 */
function createSunbrust(json) {
  // 初始化序列
  initbreadcrumb()
  // 添加透明圆，辅助监测鼠标离开
  sunburst.append("svg:circle").attr("r", radius).style("opacity", 0)
  
  // 对数据进行层级布局
  const root = d3.hierarchy(json)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; })

  console.log("root", root)
  // partition()将root数据进行分区布局，类似树型结构，然后通过descendants将布局后的
  // 数据结构按照从根节点开始，以拓扑顺序跟随子节点进行排序，最后返回拓扑排序的节点数组
  // descendants()返回一个扁平的数组来表达root的子孙后代
  const nodes = partition(root).descendants()

  // 绘制圆弧
  var path = sunburst.data([json])
          .selectAll("g")
          .data(nodes)
          .enter()
          .append("svg:g")
          .attr("display", function (d) { return d.depth ? null : "none" })

  path.append("svg:path")
      .attr("d", arc)
      .attr("stroke", "#fff")
      .attr("fill", function(d) {  d._color = colours(d); return d._color })
      .attr("fill-rule", "evenodd")
      .style("opacity", 1)
      .on("mouseover", mouseover)

  path.append("svg:text")
      .attr("transform", function (d) {
        const r = (90 * (d.x1 + d.x0) / Math.PI) - 90
        return "rotate(" + r + ")"
      })
      .attr("x", function (d) { return Math.sqrt(d.y0)})
      .attr("dx", "6")
      .attr("dy", ".1em")
      .text(function (d) { return d.data.name })
      .attr("display", function (d) { return d.children ? null : "none" })
      .on("mouseover", mouseover)

  d3.select("#container").on("mouseleave", mouseleave)
}

/**
 * 鼠标覆盖
 * @param {data} d 
 */
function mouseover(d) {

  // 中心区域文字操作
  d3.select("#numberLabel").text(d.value);
  d3.select("#explanation").style("visibility", "")

  // ancestors()从当前节点开始，返回祖先节点的数组，一直到根节点结束
  // reverse()将该数组反转
  let sequenceArray = d.ancestors().reverse()

  // shift()移除反转后的根节点
  sequenceArray.shift()
  
  // 更新序列
  updateBreadcrumb(sequenceArray, d.value);

  // 全透明.3
  d3.selectAll("#chart path")
      .style("opacity", 0.3);
  
  // 高亮当前的所有父节点
  sunburst.selectAll("path")
      .filter(function (node) {
        return (sequenceArray.indexOf(node) >= 0) 
      })
      .style("opacity", 1)
}

/**
 * 鼠标离开
 * @param {data} d 
 */
function mouseleave(d) {

  // 隐藏序列
  d3.select("#trail").style("visibility", "hidden");
  // 隐藏中央文字
  d3.select("#explanation").style("visibility", "hidden");

  // 移除mouseover
  d3.selectAll("path").on("mouseover", null);

  d3.selectAll("path")
      .transition()
      .duration(1e3)
      .style("opacity", 1)
      // 重新启用mouseover监听
      .on("end", function () { d3.select(this).on("mouseover", mouseover) })
}


/**
 * 初始化面包屑序列
 */
function initbreadcrumb() {
  let trail = d3.select('#sequence')
            .append("svg:svg")
            .attr("width", width)
            .attr("height", 50)
            .attr("class", 'trail')
  // // 末尾文字
  trail.append("svg:text")
      .attr("class", 'breadcumb-text')
      .style("fill", "#000000")
}

/**
 * 绘制序列
 * @param {*} d 
 * @param {*} i 
 */
function breadcrumbPoints(d, i) {
  let c = []
  const r = sequence_config
  c.push("0,0")
  c.push(r.w + ",0")
  c.push(r.w + r.t + "," + r.h / 2)
  c.push(r.w + "," + r.h)
  c.push("0," + r.h)
  i > 0 && c.push(r.t + "," + r.h / 2)
  return c.join(" ")
}

/**
 * 更新序列
 * @param {Array} nodeArray 数据
 * @param {String} textString 末尾文字
 */
function updateBreadcrumb(nodeArray, textString) {
  const r = sequence_config
  // 绑定数据
  let trail = d3.select('#sequence .trail').selectAll("g")
            .data(nodeArray, function(d) {return d.data.name + d.depth })
  
  // enter
  let entering = trail.enter().append("svg:g")

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return d._color }) // TODO color

  entering.append("svg:text")
      .attr("x", (r.w + r.t) / 2)
      .attr("y", r.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("class", "breadcumb-text")
      .style("fill", function (d) { return getcolor(d3.rgb(d._color)) < 150 ? "#fff" : "#000" })
      .text(function(d) { return d.data.name; })

  entering.merge(trail)
      .attr("transform", function(d, i) {
        return "translate(" + i * (r.w + r.s) + ", 0)"
      })

      console.log("@@@@@", textString)
  // 尾部文字
  d3.select(".trail").select(".breadcumb-text")
      .attr("x", (nodeArray.length + 0.5) * (r.w + r.s))
      .attr("y", r.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(textString)

  // exit
  trail.exit().remove()

  d3.select(".trail").style("visibility", "");
}


/**
 * 调色
 * @param {object} color rgb颜色
 */
function getcolor(color) {
  return .299 * color.r + .587 * color.g + .114 * color.b
}

let coloralternative = 0
function colours(a) {
  const d = [-.15, -.1, -.05, 0]
  if (1 == a.depth) {
      var e = colors[coloralternative % 9]
      coloralternative++
      return e
  }
  if (a.depth > 1) {
      var f = d[a.value % 4];
      return d3.rgb(a.parent._color).brighter(.2 * a.depth + f * a.depth)
  }
}


/**
 * 格式化json文件
 * @param {json} json 数据文件
 */
function buildHierarchy(json) {
  let root = {name: "root", children: []}

  for (let i = 0; i < json.length; i++) {
    const item = json[i]
    const sequence = item.name
    let size = +item.value

    if (isNaN(size)) continue

    const parts = sequence.split("-");
    // 先初始化当前节点
    let currentNode = root
    
    for (let j = 0; j < parts.length; j++) {
      // 初始化当前节点的children字段
      let children = currentNode["children"];
      // 获取当前节点的名称
      let nodeName = parts[j]
      let childNode = []
      
      // 未到序列的最后，则继续进行
      if (j + 1 < parts.length) {
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k]
            foundChild = true
            break
          }
        }

        // 若此节点还没有创建子节点，那么为其创建
        if (!foundChild) {
          childNode = {name:nodeName, children: []}
          children.push(childNode)
        }
        currentNode = childNode;
      } else {
        childNode = {name: nodeName, size: size}
        children.push(childNode)
      }
    }
  }
  return root
}