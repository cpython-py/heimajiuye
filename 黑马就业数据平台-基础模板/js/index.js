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
            // headers: {
            //     Authorization: token
            // }
        })
        renderOverview(res.data.data.overview)
    } catch (err) {
        // console.dir(err)
        // if (err.response.status === 401) {
        //     showToast('登录过期，请重新登录')
        //     localStorage.removeItem('userMsg')
        //     setTimeout(() => {
        //         location.href = './login.html'
        //     }, 1500)
        // }
    }
}
getData()

const renderOverview = overview => {
    console.log(overview)
    Object.keys(overview).forEach(item => {
        document.querySelector(`.${item}`).innerHTML = overview[item]
    })
}
