import React from "react";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
const Chat = () => {
    const { data } = useContext(ChatContext) ;
    
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="selection-bars"></div>
            </div>
            <Messages />
            <Input/ >
        </div>

    )
}

export default Chat;