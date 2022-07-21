const userApi = 'http://localhost:3000/user';

window.addEventListener('load', ()=> {
    document.querySelector('.container').style ='display: none';
})
function getUser(callback) {
    fetch(userApi) 
        .then((response) => {
            return response.json();
        })
        .then(callback)
}

loginMessenger();

//  đăng nhập 
function loginMessenger() {
    const loginBtn = document.querySelector('.login');
    loginBtn.onclick = () => {
        getUser(findUser);
    }
    const inputs = document.querySelectorAll('.inp');
    for(let item in inputs) {
        if(inputs.hasOwnProperty(item))
            inputs[item].onkeyup = (e)=>{
                if(e.which === 13)
                    getUser(findUser);
            };
    }
}
function findUser(users) {
    let email = document.querySelector('.email').value.trim()
    let password = document.querySelector('.password').value.trim()
    let user = users.find((item) => {
        return item.email === email && item.password === password;
    })
    if(user === undefined) 
        alert('Bạn nhập sai email hoặc mật khẩu')
    else {
        localStorage.setItem('uid', user.id)
        window.location = 'index.html';
    }
}