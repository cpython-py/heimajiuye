// 1.配置axios基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 2.公共的提示框函数
const showToast = msg => {
    const myToast = document.querySelector('.my-toast')
    const toastObj = new bootstrap.Toast(myToast)
    toastObj.show()
    document.querySelector('.toast-body').innerHTML = msg
}
const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')) : {}
// 3.公共的token是否存在验证
const checkToken = () => {
    const { token } = data
    // console.log(token)
    if (!token) {
        showToast('请先登录')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)
    }
}

// 4.回显用户名
const renderUserName = () => {
    const { username } = data
    // console.log(username)
    if (username) document.querySelector('.username').innerHTML = username
}

// 5.退出登录
const logout = () => {
    document.querySelector('#logout').addEventListener('click', e => {
        localStorage.removeItem('userMsg')
        showToast('退出登录成功')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)
    })
}

// 6.请求拦截器
axios.interceptors.request.use(config => {
    const { token } = data
    if (token) config.headers['Authorization'] = token
    return config
}, error => {
    return Promise.reject(error)
})

// 7.响应拦截器
axios.interceptors.response.use(response => {
    return response
}, error => {

    if (error.response.status === 401) {
        showToast('登录过期，请重新登录')
        localStorage.removeItem('userMsg')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)

    }
    return Promise.reject(error)
})