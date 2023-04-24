import React, { useContext, useEffect, useRef ,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { query,collection,getDocs,where } from "firebase/firestore";
import { db } from "../firebase";

const Message = ({message}) => {
    const ref = useRef();
    const {currentUser}  = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const [photoURL, setPhotoURL] = useState("");
    const [userName, setUserName] = useState("");
    const convert  = (m)=>{
        return m.date.toDate().toString().slice(4,21);
    }
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    //console.log(message);
    
    useEffect(() => {
        const getPhotoURL = async (m) => {
          const q = query(collection(db, "users"), where("uid", "==", m));
        
          try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setPhotoURL(doc.data().photoURL);
            });
          } catch (err) {
            console.log(err.message);
          }
        };
        getPhotoURL(message.senderId);
        
        const getUserName = async (m) => {
            const q = query(collection(db, "users"), where("uid", "==", m));
          
            try {
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                setUserName(doc.data().displayName);
              });
            } catch (err) {
              console.log(err.message);
            }
          };
      
          getUserName(message.senderId);
      }, [message.senderId]);
    return(
        <div className={`message ${message.senderId === currentUser.uid && "owner"}`}
            ref={ref}
        >
            <div className={`messageinfo ${message.senderId === currentUser.uid && "owner"}`}>
                <p className="userName">
                    {message.senderId === currentUser.uid
                            ? currentUser.displayName
                            : userName || "default-username"}             
                </p>
                <img src=  {message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : photoURL || "default-image-url"}
                     alt=""
                     className="messageinfo"
                />
                <span className="time">{convert(message)}</span>
            </div>
            <div className="messagecontent">
                {message.text !== "" && <p className={`message ${message.senderId === currentUser.uid && "owner"}`}>{message.text}</p>}
                {message.img && < img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;