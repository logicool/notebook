const width = 650,
    height = 550
const margin = {
    top: 20,
    right: 30,
    bottom: 60,
    left: 60
}
const group = ['notcomplete', 'complete', 'waitcomplete']
const groupName = {notcomplete:'未完成', complete:'已完成', waitcomplete:'待完成'}
const legendColor = ['#CB2C1A', '#829E18', '#73A4D9']
/**
 * 初始化
 */
const stackBar = d3.select('#chart')
    .append('svg:svg')
    .attr("width", width)
    .attr('height', height)

const stack = d3.stack()
    .keys(group)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)

const series = stack(versionCount)

const axisX = d3.scaleBand()
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1)
    .domain(versionCount.map(function (d) {
        return d.version_id
    }))

const axisY = d3.scaleLinear()
    .rangeRound([height - margin.bottom, margin.top])
    .domain([d3.min(series, stackMin), d3.max(series, stackMax)])

function stackMin(series) {
    return d3.min(series, function (d) {
        return d[0]
    })
}

function stackMax(series) {
    return d3.max(series, function (d) {
        return d[1]
    })
}

var z = d3.scaleOrdinal(legendColor);

const mainBar = stackBar
    .append("svg:g")
    .selectAll("g")
    .data(series)
const groupsBar = mainBar
    .enter().append("svg:g")
    .attr('fill', function (d) {
        return z(d.key)
    })

const rect = groupsBar.selectAll('rect')
    .data(function (d) {
        d.forEach(function (item) {
            item.key = d.key
            return item
        })
        return d
    })
    .enter().append('svg:rect')
    .attr('data', function (d) {
        let data = {}
        data['key'] = d.key
        data['value'] = d.data[d.key]
        data['version'] = d.data['version_id']
        let total = 0
        group.map(function (item) {
            total = total + d.data[item]
        })
        data['total'] = total
        return JSON.stringify(data)
    })
    .attr('width', axisX.bandwidth)
    .attr('x', function (d) {
        return axisX(d.data.version_id)
    })
    .attr('y', function (d) {
        return axisY(d[1])
    })
    .attr('height', function (d) {
        return axisY(d[0]) - axisY(d[1])
    })

// 鼠标tooltip
rect.on('mouseover', function() {
    const currentEvent = d3.select(this)
    const fadeSpeed = 120
    d3.select('#tooltip_stack')
        .transition()
        .duration(fadeSpeed)
        .style('opacity', function() {
            return 1
        })
    d3.select('#tooltip_stack').attr('transform', function(d) {
        const mouseCoords = d3.mouse(this.parentNode)
        let xCo = 0
        let yCo = 0
        if (mouseCoords[0] + 10 >= width* 0.8) {
            xCo = mouseCoords[0] - parseFloat(d3.selectAll("#tooltip_stack_rect").attr('width'))
            yCo = mouseCoords[1] + 10
        } else {
            xCo = mouseCoords[0] + 10
            yCo = mouseCoords[1]
        }
        return "translate(" + xCo + "," + yCo + ")"
    })
    const tooltipData = JSON.parse(currentEvent.attr('data'))
    // 清空之前的text
    d3.selectAll('#tooltip_stack_text').text("");

    let yPos = 0
    d3.selectAll('#tooltip_stack_text')
    .append("tspan")
    .attr("x", 0).attr("y", yPos * 10)
    .attr("dy", "1.9em")
    .text("版本" + ":  " + tooltipData.version)
    yPos = yPos + 1
    d3.selectAll('#tooltip_stack_text')
        .append("tspan")
        .attr("x", 0).attr("y", yPos * 10)
        .attr("dy", "1.9em")
        .text(groupName[tooltipData.key] + ":  " + tooltipData.value)
    yPos = yPos + 1
    d3.selectAll("#tooltip_stack_text")
        .append("tspan")
        .attr("x", 0).attr("y", yPos * 10)
        .attr("dy", "1.9em")
        .text("总数" + ":  " + tooltipData.total);
    
    const dims = getDimensions("tooltip_stack_text");
    d3.selectAll("#tooltip_stack_text tspan")
        .attr("x", dims.w + 4);

    d3.selectAll("#tooltip_stack_rect")
        .attr("width", dims.w + 10)
        .attr("height", dims.h + 20);
})

rect.on('mousemove', function() {
    d3.select('#tooltip_stack').attr('transform', function(d) {
        const mouseCoords = d3.mouse(this.parentNode)
        let xCo = 0
        let yCo = 0
        if (mouseCoords[0] + 10 >= width* 0.8) {
            xCo = mouseCoords[0] - parseFloat(d3.selectAll("#tooltip_stack_rect").attr('width'))
            yCo = mouseCoords[1] + 10
        } else {
            xCo = mouseCoords[0] + 10
            yCo = mouseCoords[1]
        }
        return "translate(" + xCo + "," + yCo + ")"
    })
})

rect.on('mouseout', function() {
    d3.select("#tooltip_stack")
    .style("opacity", function() {
        return 0;
    })
    .attr("transform", "translate(-500, -500)");
})

/** 辅助内容 */
/**
 * 坐标系
 */
stackBar.append("svg:g").attr('id', 'axisX')
    .attr("transform", "translate(0," + axisY(0) + ")")
    .call(d3.axisBottom(axisX))
    .selectAll("text")
            .attr("class", 'notwrap')
            .attr("text-anchor", "start")
            .attr("transform", "rotate(45)")

stackBar.select('#axisX').append("text")
    .attr("x", width / 2)
    .attr("y", margin.bottom * 0.7)
    .attr("dx", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .text("版本");

stackBar.append("svg:g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(axisY).ticks(20))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2))
    .attr("y", 25 - (margin.left))
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text("任务");

/**
 * tooltip
 */
var rectTooltipg = stackBar.append("svg:g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .attr("id", "tooltip_stack")
            .attr("style", "opacity:0")
            .attr("transform", "translate(-500,-500)");

rectTooltipg.append("rect")
    .attr("id", "tooltip_stack_rect")
    .attr("x", 0)
    .attr("width", 120)
    .attr("height", 80)
    .attr("opacity", 0.71)
    .style("fill", "#000000");

rectTooltipg
    .append("text")
    .attr("id", "tooltip_stack_text")
    .attr("x", 30)
    .attr("y", 15)
    .attr("fill", function() {
        return "#fff"
    })
    .style("font-size", function(d) {
        return 10;
    })
    .style("font-family", function(d) {
        return "arial";
    })
    .text(function(d, i) {
        return "";
    });