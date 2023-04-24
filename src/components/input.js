import React, { useState,useContext } from "react";
import attachment from "../img/attachment.png";
import add from "../img/add-image.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
const Input = () => {
    const [text,setText] = useState("");
    const [img, setImg] = useState (null);
    const [error,setError] = useState(false);
    const {currentUser}  = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const handleSend = async () => {
        try {
          if (img) {
            const storageRef = ref(storage, uuid());
            console.log(storageRef);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // TODO: Show progress
              },
              (error) => {
                setError(true);
                console.error(error);
              },
              () => {
                console.log("File uploaded successfully");
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                  await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });
                });
              }
            );
          } else {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          }
          setText("");
          setImg(null);
          setError(false);
        } catch (error) {
          console.error(error);
          setError(true);
        }
      };

    return(
        <div className="chat-input">
            <input type="text" value={text} placeholder="start chatting..." className="chats" 
             onChange={(e)=>setText(e.target.value)} />
             
            <div className="send">
                <input type="file" style={{display:"none"}} id="input-file" onChange={(e)=>setImg(e.target.files[0])}/>
                    <label htmlFor="input-file">
                        <img className="chat-file" src={attachment} alt="add file"/>
                    </label>
                    <button className="input-send" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input;