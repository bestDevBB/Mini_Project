let handleId = 0; // 시계가 움직이는 동작을 만들었을 때 그 동작에 대한 id를 저장
// id를 토대로 동작을 멈추게 할 수도 있음

const h1 = document.getElementById("time");
const goBtn = document.getElementById("go");
const stopBtn = document.getElementById("stop");

function getTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    
    const time = `${hours}:${minutes}:${seconds}`
    h1.innerText = time;
};

function goClock(event) {
    if(handleId == 0) {
        handleId = setInterval(getTime, 1000);
    };
};

function stopClock(event) {
    clearInterval(handleId);
    handleId = 0; // 초기화
}

goBtn.addEventListener("click", goClock);
stopBtn.addEventListener("click", stopClock);

getTime();