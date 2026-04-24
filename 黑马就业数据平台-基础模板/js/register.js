document.querySelector('#btn-register').addEventListener('click', async e => {
    // NOTE 1.1 收集注册数据并校验
    const data = serialize(document.querySelector('.register-form'), { hash: true, empty: true })
    console.log(data)
    if (!data.username) return showToast('用户名不能为空')
    if (data.username.length < 8 || data.username.length > 30) return showToast('用户名长度必须在8-30之间')
    if (!data.password) return showToast('密码不能为空')
    if (data.password.length < 6 || data.password.length > 30) return showToast('密码长度必须在6-30之间')
    
    // NOTE 1.2 发送请求
    const res = await axios.post('/register', data)
    console.log(res)

    // NOTE 1.3 显示结果
    showToast(res.data.message)

    // NOTE 1.4 跳转至登录页
    setTimeout(() => {
        location.href = './login.html'
    }, 800)
})