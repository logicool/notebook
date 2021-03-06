const fs = require('fs')
const path = require('path')

const months = ['四月份']
const fields = ['新旅服','新分销','运价','总体','数据','系维','航空产品','机场产品','结算产品']
const groups = [
                ['ALG','INV','FLT','CSM','RCT/IROP','SEAT'], 
                ['BKG','DOC','UTL','EBD/SAT'],
                ['AV','SHOP','PRIC'],
                ['TODE','JCF','TSI','PAAS','信息安全'],
                ['ODSs','BDP','数据科学'],
                ['AMS','LDP','DEP','ICS','DCS'],
                ['RI','收益辅助','零售产品','直销产品','旅客服务','APG','用户体验','商务数据','核心业务','海外业务','产品服务'],
                ['旅客产品','运营产品','信息产品','服务支持'],
                ['客运组','技术组','货邮组','机场组','BSP']
              ]
const regions = ['北京','重庆','东北','广州','外协','外专']
const sections = [
                    ['管理','产品','开发','测试','运维'],
                    ['开发','测试'],
                    ['开发','测试'],
                    ['产品','开发','测试'],
                    ['开发','测试'],
                    ['合计'],
                ]
const datas4 = [
    0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1
    ,6,2,3,0,1,3,5,6,0,4,1,6,6,0,0,0,0,0,1,0,0,0,1,3,0,0,1,1,1,1,2,2,0,1,1,0,0,0,0,0,0,0,0,0,1,1
    ,7,13,7,6,5,7,21,23,3,16,7,25,12,2,4,23,6,2,6,23,9,7,5,10,15,7,6,7,4,8,8,0,10,4,0,0,0,12,5,8,0,23,11,3,4,14
    ,3,4,2,2,2,3,4,2,0,4,2,2,6,0,0,1,0,0,0,3,0,0,2,4,0,0,2,0,0,0,2,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0
    ,2,3,1,1,1,2,1,6,1,3,2,3,5,0,0,7,0,0,2,0,0,1,0,3,14,6,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,27,0,9,0,4,0,5,0,0,0,0,1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,8,8,51,34,26,0,0,3,18,3,0,0,0,0,0,0,0,0,0,0
    ,6,2,2,2,1,1,1,6,1,2,0,0,0,0,3,3,0,0,3,0,0,4,2,0,7,3,4,4,18,13,8,0,0,1,11,1,0,0,0,0,0,0,0,0,0,0
    ,0,11,7,9,9,7,20,18,0,27,0,9,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,6,4,1,4,5,5,6,0,7,3,3,17,0,0,0,0,0,0,6,1,0,0,3,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0
    ,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,0,0,1,0,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,1,0,0,1,4,1,19,2,3,0,2,8,6,0,1,1,0,0,0,8,2,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,1,3,2,1,2,2,4,3,0,1,0,3,1,0,0,1,0,0,0,2,0,0,1,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,0,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]

const datas3 = [
    1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1
    ,6,2,3,0,1,3,5,6,0,4,1,6,6,0,0,0,0,0,1,0,0,0,1,3,0,0,1,1,1,1,2,2,0,1,1,0,0,0,0,0,0,0,0,0,1,1
    ,8,13,7,7,5,7,21,23,3,16,7,25,12,2,4,22,6,4,6,24,9,7,7,10,15,7,6,9,4,9,8,0,10,4,0,0,0,12,5,8,0,23,11,3,4,14
    ,3,4,2,2,2,3,4,2,0,4,2,2,6,0,0,2,0,0,0,3,0,0,3,4,0,0,2,0,0,0,2,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0
    ,2,3,1,1,1,2,1,6,1,4,2,3,5,0,0,6,0,0,2,0,0,1,0,3,14,6,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,27,0,9,0,4,0,5,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,8,8,47,33,25,0,0,3,19,3,0,0,0,0,0,0,0,0,0,0
    ,7,2,2,1,1,1,2,4,1,2,0,0,0,0,3,3,0,0,4,0,0,3,2,0,8,3,2,4,17,13,8,0,0,1,11,1,0,0,0,0,0,0,0,0,0,0
    ,0,11,5,8,9,8,15,18,0,24,0,7,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,3,3,0,3,5,4,4,0,3,3,0,11,0,0,0,0,0,0,5,1,0,0,3,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0
    ,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,0,0,1,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,1,0,0,1,4,1,20,2,3,0,2,8,7,0,1,1,0,0,0,7,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,1,3,2,1,2,2,4,3,0,1,0,3,1,0,0,1,0,0,0,2,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,0,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]

const baseLineData = function() {
    let lineData = [];
    let dataNum = 0;
    // month - field - group - region - section
    // for (let a = 0; a < months.length; a++) {
    //     const month = months[a];
    //     for (let b = 0; b < fields.length; b++) {
    //         const field = fields[b];
    //         // const group = groups[b];
    //         for (let c = 0; c < groups[b].length; c++) {
    //             const group = groups[b][c];
    //             for (let d = 0; d < regions.length; d++) {
    //                 const region = regions[d];
    //                 // const section = sections[d];
    //                 for (let e = 0; e < sections[d].length; e++) {
    //                     const section = sections[d][e];
    //                     const name = [month, field, group, region, section].join('-')
    //                     const value = datas[dataNum]
    //                     lineData.push({name, value})
    //                     dataNum++
    //                 }
    //             }
    //         }
    //     }
    // }

    // region - section - field - group
    for (let b = 0; b < regions.length; b++) {
        const region = regions[b];
        for (let c = 0; c < sections[b].length; c++) {
            const section = sections[b][c];
            for (let d = 0; d < fields.length; d++) {
                const field = fields[d];
                for (let e = 0; e < groups[d].length; e++) {
                    const group = groups[d][e];
                    const name = [field, group, region, section].join('-')
                    const value = datas4[dataNum]
                    lineData.push({name, value})
                    dataNum++
                }
            }
        }
    }

    // console.dir(lineData)
    return lineData
}

const outputfile = path.resolve(__dirname, './lineData.json')
fs.writeFile(outputfile, JSON.stringify(baseLineData()), function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
})