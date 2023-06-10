var socket = new WebSocket("ws://localhost:8080/ws");
//代参 cb 回调函数
let connect = cb => {
    console.log("Attempting Connection");

    socket.onopen = () => {
        console.log("Suceesfully Connected");
    };

    socket.onmessage = msg => {
        console.log(msg);
        cb(msg)
    };

    socket.onclose = event => {
        console.log("Socket closed Connection:", event);
    };

    socket.onerror = err => {
        console.log("Socket Error:", err);
    };
};

let sendMsg = msg => {
    console.log("Client Sending Msg: ", msg);
    socket.send(msg)
};

export { connect, sendMsg }