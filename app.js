const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
// createServer안에 express로 구현한 app을 담아서 express가 http를 통해서 실행될 수 있도록 함
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;

// front에서 받은 데이터 받기
io.on("connection", (socket) => { // 두 번째 인자는 error function
    socket.on("chatting", (data) => { // client에서 보낸 내용을 data로 받음
        // console.log(data); // object 형태로 받음!
        
        const { name, msg } = data;

        // 받은 데이터에 대한 응답
        io.emit("chatting", {
            // name: name, // 넘겨줄 때: 넘겨받은
            name,
            msg,
            time: moment(new Date()).format("h:mm A")
        });
    })
}); // connection method, connection이 이루어지면 connection에 대한 객체 연결이 이루어졌을 때 socket에 담음

server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});