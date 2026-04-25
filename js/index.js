checkToken(); // NOTE - 验证token
renderUserName(); // NOTE - 回显用户名
logout(); // NOTE - 退出登录

const getData = async () => {
    const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')) : {}
    const { token } = data
    try {
        const res = await axios({
            url: "/dashboard",
            method: "GET",
        })
        renderOverview(res.data.overview)
    } catch (err) {
    }
}
getData()

const renderOverview = overview => {
    console.log(overview)
    Object.keys(overview).forEach(item => {
        document.querySelector(`.${item}`).innerHTML = overview[item]
    })
}
