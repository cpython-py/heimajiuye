checkToken(); // NOTE - 验证token
renderUserName(); // NOTE - 回显用户名
logout(); // NOTE - 退出登录

// NOTE - 获取统计数据
const getData = async () => {
        const res = await axios({
            url: "/dashboard",
            method: "GET",
        })
    const { overview, year } = res.data
    renderOverview(overview)
    renderYear(year)
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
    console.log(year)
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
