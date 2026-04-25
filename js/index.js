checkToken(); // NOTE - 验证token
renderUserName(); // NOTE - 回显用户名
logout(); // NOTE - 退出登录

// NOTE - 获取统计数据
const getData = async () => {
    const res = await axios({
        url: "/dashboard",
        method: "GET",
    })
    const { overview, year, salaryData, genderData, groupData } = res.data
    renderOverview(overview)
    renderYear(year)
    renderSalaryData(salaryData)
    renderGroupData(groupData)
    renderGenderData(salaryData)
    
}
getData()

// NOTE - 渲染统计数据
const renderOverview = overview => {
    console.log(overview)
    Object.keys(overview).forEach(item => {
        document.querySelector(`.${item}`).innerHTML = overview[item]
    })
}

// NOTE - 折线图渲染
const renderYear = year => {

    const myChart = echarts.init(document.querySelector('#line'))
    const option = {
        title: {
            text: '2022全学科薪资走势',
            left: 5,
            top: 10,
        },
        grid: {
            top: '15%',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: year.map(item => item.month),
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                }
            }
        },
        series: [
            {
                data: year.map(item => item.salary),
                type: 'line',
                symbolSize: 10,
                lineStyle: {
                    width: 10,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            { offset: 0, color: '#479dee' },
                            { offset: 1, color: '#5c75f0' }
                        ]
                    }
                },
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#a9d2f7' },
                            { offset: 1, color: 'rgba(255, 255, 255, 0)' }
                        ]
                    }
                }
            }
        ]
    };
    myChart.setOption(option)
}

// NOTE -完成饼图渲染
const renderSalaryData = salaryData => {
    const myChart = echarts.init(document.querySelector('#salary'))
    const option = {
        tooltip: {
            trigger: 'item'
        },
        title: {
            text: '班级薪资分布',
            top: 10,
            left: 10,
            textStyle: {
                fontSize: 16
            }
        },
        legend: {
            bottom: 0,
            left: 'center'
        },
        series: [
            {
                name: '班级薪资分布',
                type: 'pie',

                radius: ['60%', '80%'],

                itemStyle: {
                    borderRadius: 20,
                    borderColor: '#fff',
                    borderWidth: 2
                },

                label: {
                    show: false,
                },

                labelLine: {
                    show: false
                },
                data: salaryData.map(item => ({
                    value: item.g_count + item.b_count,
                    name: item.label
                })),
            }
        ],

        color: ['#fda224', '#5097ff', '#3abcfa', '#34d39a']
    }

    myChart.setOption(option)
}

// NOTE - 渲染班级薪资分布
const renderGroupData = (groupData) => {
    const myChart = echarts.init(document.querySelector('#lines'))
    const option = {
        tooltip: {},
        grid: {
            left: 70,
            top: 30,
            right: 30,
            bottom: 50
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ccc'
                }
            },
            data: groupData[1].map(item => item.name),
            axisLabel: {
                color: '#999'
            }
        },

        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },

        series: [
            {
                data: groupData[1].map(item => item.hope_salary),
                type: 'bar',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#34D39A'
                        }, {
                            offset: 1, color: 'rgba(52,211,154,0.2)'
                        }],
                        global: false
                    }
                }
            },
            {
                data: groupData[1].map(item => item.salary),
                type: 'bar',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#499FEE'
                        }, {
                            offset: 1, color: 'rgba(73,159,238,0.2)'
                        }],
                        global: false
                    }
                }
            }
        ]
    }

    myChart.setOption(option)
}

// NOTE - 男女薪资分布
const renderGenderData = (salaryData) => {
    const myChart = echarts.init(document.querySelector('#gender'))
    const option = {
        tooltip: {},
        title: [
            {
                text: '男女薪资分布',
                top: 10,
                left: 10,
                textStyle: {
                    fontSize: 16
                }
            },
            {
                text: '男生',
                left: '50%',
                top: '45%',
                textStyle: {
                    fontSize: 12
                }
            },
            {
                text: '女生',
                left: '50%',
                top: '85%',
                textStyle: {
                    fontSize: 12
                }
            },
        ],
        // 颜色
        color: ['#fda224', '#5097ff', '#3abcfa', '#34d39a'],
        series: [
            {
                name: '男生',
                type: 'pie',
                radius: ['20%', '30%'], // 圆的半径
                center: ['50%', '30%'], // 圆的位置 
                // roseType: 'area', // 根据数据显示饼图的大小
                // itemStyle: {
                //   borderRadius: 8
                // },
                data: salaryData.map(item => ({
                    value: item.b_count,
                    name: item.label
                }))
            },
            {
                name: '女生',
                type: 'pie',
                radius: ['20%', '30%'], // 圆的半径
                center: ['50%', '70%'],
                // roseType: 'area',
                // itemStyle: {
                //   borderRadius: 8
                // },
                data: salaryData.map(item => ({
                    value: item.g_count,
                    name: item.label
                }))
            }
        ]
    }
    myChart.setOption(option)
}