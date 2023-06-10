var socket = new WebSocket("ws://localhost:8080/ws");

let connect = () => {
    console.log("Attempting Connection");

    socket.onopen = () => {
        console.log("Suceesfully Connected");
    };

    socket.onmessage = msg => {
        console.log(msg);
    };

    socket.onclose = event => {
        console.log("Socket closed Connection:", event);
    };

    socket.onerror = err => {
        console.log("Socket Error:", err);
    };
};
let sendMsg = msg => {
    console.log("sending msg: ", msg);
    socket.send(msg)
};

export { connect, sendMsg }