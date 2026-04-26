checkToken() // NOTE - 登录校验
renderUserName() // NOTE - 渲染用户名
logout() // NOTE - 退出登录

// NOTE - 渲染业务
const render = async () => {
    const { data } = await axios.get('/students', { params: {} })
    document.querySelector('.list').innerHTML = data.map(item => {
        const { age, area, city, gender, group, hope_salary, salary, name, province } = item
        return `
            <tr>
                <td>${name}</td>
                <td>${age}</td>
                <td>${gender?'女':'男'}</td>
                <td>${group}</td>
                <td>${hope_salary}</td>
                <td>${salary}</td>
                <td>${province}${city}${area}</td>
                <td>
                    <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
                    <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
                </td>
            </tr>
        `
    }).join('')
}
render()