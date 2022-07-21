const userApi = 'http://localhost:3000/user';
const uid = Number(localStorage.getItem('idMe'))
let userMe = {};

const oldPass = document.querySelector('.oldPass');
const newPass = document.querySelector('.newPass');
const rePass = document.querySelector('.rePass');
const changeBtn = document.querySelector('.change');


window.addEventListener('load', ()=> {
    document.querySelector('.container').style ='display: none';
})

const inputs = document.querySelectorAll('.inp');
inputs.forEach((input)=> {
    input.onkeyup = (e)=>{
        if(e.which === 13) 
            getUser(handleChangePass)
    }
})

changeBtn.onclick = ()=> {
    getUser(handleChangePass)
}

function getUser(callback) {
    fetch(userApi) 
        .then((response) => {
            return response.json();
        })
        .then(callback)
}
function handleChangePass(users) {
    if(oldPass.value ==='' || newPass.value === '' || rePass.value === '') 
        alert('Bạn phải nhập đầy đủ các trường');
    else {
        userMe = users.find((item)=> {
            return item.id === uid;
        })
        if(userMe.password !== oldPass.value) {
            alert('Bạn nhập sai mật khẩu cũ, vui lòng nhập lại!')
        } else {
            if(newPass.value !== rePass.value) {
                alert('Mật khẩu mới và mật khẩu lặp lại không trùng khớp, vui lòng nhập lại!');
            } else {
                let data = {
                    password: newPass.value
                }
                let options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    body: JSON.stringify(data)
                };
                fetch(userApi +'/'+ uid, options)
                    .then(()=>{
                        window.location = './index.html';
                    })
            }
        }
    }
}