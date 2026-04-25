const loginForm = document.querySelector('.login-form')
// 1. NOTE - 注册事件
document.querySelector('#btn-login').addEventListener('click', async e => {
    // 2. NOTE - 收集表单数据并验证
    const data = serialize(loginForm, { hash: true, empty: true })
    if (!data.username || !data.password) return showToast('请输入用户名或密码')
    if (data.username.length < 8 || data.username.length > 30) return showToast('用户名长度必须在8-30之间')
    if (data.password.length < 6 || data.password.length > 30) return showToast('密码长度必须在6-30之间')
    
    // 3.发送请求,判断响应结果,提示用户
    try {
        const res = await axios.post('/login', data)
        console.log(res)
        const obj = {}
        obj.username = res.data.data.username
        obj.token = res.data.data.token
        // 4.如果成功,则本地存储用户名
        localStorage.setItem('userMsg', JSON.stringify(obj))
        console.log(localStorage.getItem('userMsg'))
        showToast(res.data.message)
        // 5.跳转页面
        setTimeout(() => {
            location.href = './index.html'
        }, 1500)
    }
    catch (err) { showToast(err.response.data.message) }
    
})