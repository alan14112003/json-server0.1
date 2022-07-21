const messageApi = 'http://localhost:3000/message';
const userApi = 'http://localhost:3000/user';
let message = document.querySelector('.message');
const boxMessengerList = document.querySelector('.boxMessenger__list');
let idMe = Number(localStorage.getItem('uid'));
//  method
window.addEventListener('load', () => {
    document.querySelector('.container').style = 'display: none';
})
start();
function start() {
    getMessenger();
    handleCreateMessage();
}

const avatarMe = document.querySelector('.avatarMe');
getUser((users)=>{
    let user = users.find((item)=>{
        return item.id === idMe;
    });
    if (user.avatar.trim() === '')
        user.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&usqp=CAU';
    
    avatarMe.src = user.avatar;
})

// tạo ra giao diện người dùng.
function getMessage(callback) {
    fetch(messageApi)
        .then((response) => {
            return response.json();
        })
        .then(callback)
}
function getUser(callback) {
    fetch(userApi)
        .then((response) => {
            return response.json();
        })
        .then(callback)
}

function getMessenger() {
    let users = [];
    getUser((user) => {
        users = user;
    })
    getMessage((messages) => {
        let htmls = messages.map((message) => {
            let user = users.find((item) => {
                return item.id === message.user_id;
            });
            let html = '', deleteMessage = '';
            if (user.avatar.trim() === '')
                user.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&usqp=CAU';
            let content = null;
            if (message.icon !== undefined) {
                content = `<img class="message__content__icon" src="${message.icon}">`
            } else if (message.content !== undefined) {
                content = `<p class="message__content__para">${message.content}</p>`
            }
            if (idMe === message.user_id) {
                user.name = 'Bạn';
                html = `<li class= "message-${message.id} isMe">`;
                deleteMessage = `<div class="delete" onclick="handleDeleteMsg(${message.id})"> xóa </div>`;
            } else
                html = `<li class= "message-${message.id}">`;

            html += `<div class="message__content">
                        <img src="${user.avatar}">
                        <div>
                            <span class="message__content__name">${user.name}</span>
                            ${content}
                        </div>
                        ${deleteMessage}
                    </div>
                    <span class="date">${message.time}</span>
                </li>`;
            return html;
        })
        boxMessengerList.innerHTML = htmls.join('');

        var boxMessenger = document.querySelector('.boxMessenger');
        boxMessenger.scrollTop = boxMessenger.scrollHeight;
    });
}

//  nhắn tin 
message.onkeyup = (e) => {
    if (e.which === 13) {
        if(message.value.trim() !== '') {
            let date = new Date();
            let newTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            let data = {
                content: message.value.trim(),
                user_id: idMe,
                time: newTime
            }
            createMsg(data, getMessenger)
            message.value = '';
        }
    }
}
function handleCreateMessage() {
    let seenBtn = document.querySelector('.seen');
    seenBtn.onclick = () => {
        if(message.value.trim() !== '') {
            let date = new Date();
            let newTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            let data = {
                content: message.value.trim(),
                user_id: idMe,
                time: newTime
            }
            createMsg(data, getMessenger)
            message.value = '';
        }
    }
}

function createMsg(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(messageApi, options)
        .then((response) => {
            return response.json();
        })
        .then(callback)
}
// nhắn icon
const iconBtn = document.querySelector('.iconBtn');
iconBtn.onclick = ()=>{
    document.querySelector('.listIcon').classList.toggle('openIcon')
}

const listIcons = document.querySelectorAll('.listIcon__icons .icons__icon img')
listIcons.forEach((icon)=>{
    icon.onclick = ()=>{
        let date = new Date();
        let newTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        let data = {
            icon: icon.src,
            user_id: idMe,
            time: newTime
        }
        createMsg(data, getMessenger)
    }
})
//  xóa tin nhắn 
function handleDeleteMsg(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    fetch(messageApi + '/' + id, options);
    document.querySelector(`.message-${id}`).remove();
}
// đăng xuát 
document.querySelector('.logOut').onclick = () => {
    localStorage.setItem('idMe', '0');
};
// đổi thông tin
const changeInfo = document.querySelector('.changeInfo');
changeInfo.onclick = () => {
    localStorage.setItem('idMe', idMe);
}
// đổi mật khẩu 

const changePass = document.querySelector('.changePass');
changePass.onclick = () => {
    localStorage.setItem('idMe', idMe);
}