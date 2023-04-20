import React from "react";
import attachment from "../img/attachment.png";
import add from "../img/add-image.png";
const input = () => {
    return(
        <div className="chat-input">
            <input type="text" placeholder="start chatting..." className="chats"/>
            <div className="send">
                <img className="attachment" src={attachment} alt = "attach"/>
                <input type="file" style={{display:"none"}} className="file"/>
                <label htmlFor="file">
                    <img className="chat-file" src={add} alt="add file"/>
                </label>
                <button className="input-send">Send</button>
            </div>
        </div>
    )
}

export default input;