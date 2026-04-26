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
                <td>第${group}组</td>
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
    document.querySelector('.total').innerHTML = data.length
}
render()

// NOTE - 新增学生
const newStudent = () => {
    const modalDom = document.querySelector('#modal')
    const myModal = new bootstrap.Modal(modalDom)
    document.querySelector('#openModal').addEventListener('click', e => {
        myModal.show()
    })
}
newStudent()

// NOTE - 省市区联动
const selectInit = async () => {
    const provinceDom = document.querySelector('[name="province"]')
    const cityDom = document.querySelector('[name="city"]')
    const areaDom = document.querySelector('[name="area"]')
    const { list } = await axios.get('/api/province')
    provinceDom.innerHTML += list.map(item => {
        return `<option value="${item}">${item}</option>`
    }).join('')
    provinceDom.addEventListener('change', async e => {
        cityDom.innerHTML = '<option value="">--城市--</option>'
        const { list } = await axios.get('/api/city', {
            params: {
                pname: e.target.value
            }
        })
        cityDom.innerHTML += list.map(item => {
            return `<option value="${item}">${item}</option>`
        }).join('')
    })
    cityDom.addEventListener('change', async e => {
        areaDom.innerHTML = '<option value="">--地区--</option>'
        const { list } = await axios.get('/api/area', {
            params: {
                pname: provinceDom.value,
                cname: e.target.value           
            }
        })
        areaDom.innerHTML += list.map(item => {
            return `<option value="${item}">${item}</option>`
        }).join('')
    })
}
selectInit()