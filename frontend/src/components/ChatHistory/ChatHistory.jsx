import "./ChatHistory.scss";
import React from "react";

//属性
function ChatHistory(props) {
    const messages = props.chatHistory.map((msg, index) => (
        <p key={index} >{msg.data}</p>
    ));
    return (
        <div className="chatHistory">
            <h2>Chat History</h2>
            {messages}
        </div>
    );
}
export default ChatHistory;