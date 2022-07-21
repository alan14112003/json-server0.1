const userApi = 'http://localhost:3000/user';
const nameInp = document.querySelector('.name');
const emailInp = document.querySelector('.email');
const passInp = document.querySelector('.password');
const avatarInp = document.querySelector('.avatar');
const signupBtn = document.querySelector('.signup');
const cancel = document.querySelector('.cancel');
const uid = Number(localStorage.getItem('idMe'))
let userMe = {};


window.addEventListener('load', ()=> {
    document.querySelector('.container').style ='display: none';
})
if(uid === 0) {
    evenSignup()
}
function evenSignup() {
    const inputs = document.querySelectorAll('.inp');
    signupBtn.onclick = ()=>{
        signup()
    };
    cancel.onclick = ()=> {
        window.location = './login.html'
    }
    for(let item in inputs) {
        if(inputs.hasOwnProperty(item))
            inputs[item].onkeyup = (e)=>{
                if(e.which === 13)
                    signup();
            };
    }
}

function signup() {
    if(nameInp.value.trim() === '' || emailInp.value.trim() === '' || passInp.value.trim() === '') 
        alert('bạn phải điền đầy đủ các trường tên, email và mật khẩu');
    else {
        let data = {
            email: emailInp.value.trim(),
            password: passInp.value.trim(),
            name: nameInp.value.trim(),
            avatar: avatarInp.value.trim()
        }
        createUser(data)
        window.location = 'login.html';
        alert('đăng kí thành công');
    }
}

function createUser(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    };
    fetch(userApi, options)
}

function getUser(callback) {
    fetch(userApi) 
        .then((response) => {
            return response.json();
        })
        .then(callback)
}

//  đổi thông tin

if(uid !== 0) {
    document.querySelector('title').innerText = 'Đổi thông tin'
    document.querySelector('.title').innerText = 'Đổi thông tin'
    fetch(userApi) 
        .then((response) => {
            return response.json();
        })
        .then((users)=> {
            let user = users.find((item)=>{
                return item.id === uid;
            })
            console.log(user)
            nameInp.value = user.name;
            emailInp.value = user.email;
            avatarInp.value = user.avatar;
            passInp.style = 'display: none';
            signupBtn.innerText = 'Đổi thông tin'
            return user;
        })
        .then((user)=>{
            userMe = user
        });
        signupBtn.onclick = ()=> {
            updateUser();
        }
        let inputs = document.querySelectorAll('.inp');
        inputs.forEach((item)=> {
            item.onkeyup = (e)=>{
                if(e.which === 13) 
                    updateUser();
            }
        })
        cancel.onclick = ()=> {
            window.location = './index.html'
        }
}
function updateUser() {
    let data = {
        email: emailInp.value.trim(),
        password: userMe.password,
        name: nameInp.value.trim(),
        avatar: avatarInp.value.trim()
    }
    console.log(data);
    let options = {
        method: 'PUT',
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