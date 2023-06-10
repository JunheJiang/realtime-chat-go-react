import React from "react";
import "./ChatInput.scss";

function ChatInput(props){
    console.log(props);
    return (
    <div claseName="chatInput">
          <input onKeyDown={props.send}/>
    </div>);
}

export default ChatInput;