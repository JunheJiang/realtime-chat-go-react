import React, { useEffect, useState } from "react";
import "./Message.scss";

function Message(props) {

    const [message, setMessage] = useState("");

    useEffect(() => {
    }, [message]);

    return (
        <div className="message">
            {message}
        </div>
    );
}

export default Message;