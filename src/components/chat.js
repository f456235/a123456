import React from "react";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
import img from "../img/addNewPeople.png"
const Chat = () => {
    const { data } = useContext(ChatContext) ;
    const handleClick = () =>{
        var text = prompt ("enter a name.");
        console.log(text);
    }
    return(

        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <img src={img} onClick={()=>handleClick()} className="addpeople"/>
                
            </div>
            <Messages />
            <Input/ >
        </div>

    )
}

export default Chat;