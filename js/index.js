checkToken(); // NOTE - 验证token
renderUserName(); // NOTE - 回显用户名
logout(); // NOTE - 退出登录

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
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                areaStyle: {}
            }
        ]
    };
    myChart.setOption(option)
}
