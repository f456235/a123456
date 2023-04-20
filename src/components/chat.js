import React from "react";
import faceTime from "../img/facetime.png";
import addPeople from "../img/addNewPeople.png"
import More from "../img/more.png";
import Messages from "./messages";
import Input from "./input";
const chat = () => {
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>Joel Embiid</span>
                <div className="selection-bars">
                    <img src={faceTime} className="chatIcons"/>
                    <img src={addPeople} className="chatIcons"/>
                    <img src={More} className="chatIcons2"/>
                </div>
            </div>
            <Messages />
            <Input/ >
        </div>

    )
}

export default chat;