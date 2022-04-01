"use strict";

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13) { // Enter이면
        send();
    };
});

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value,
    }
    socket.emit("chatting", param);
    chatInput.value = "";
};

sendButton.addEventListener("click", send);


// 서버에서 보낸 데이터 받기
socket.on("chatting", (data) => { // data는 서버에서 보낸 내용. object로 담김
    console.log(data);
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        // 채팅을 받았을 때 li로 받기
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="http://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
};