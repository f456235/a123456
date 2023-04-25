import React from "react";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/ChatContext";
import { useContext ,useState,useEffect} from "react";
import img from "../img/addNewPeople.png"
import { db } from "../firebase";
import { arrayUnion, collection,query,serverTimestamp,setDoc,where } from "firebase/firestore";
import { getDocs ,updateDoc,doc,getDoc} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import addChatRoom from "../img/chatroom.png";
const Chat = () => {
    const { data } = useContext(ChatContext) ;
    console.log(data);
    const [text, setText] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [userName, setUserName] = useState("");
  const [userUid, setuserUid] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    const getPhotoURL = async (name) => {
      const q = query(collection(db, "users"), where("displayName", "==", name));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setPhotoURL(doc.data().photoURL);
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    const getUserName = async (name) => {
      const q = query(collection(db, "users"), where("displayName", "==", name));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setUserName(doc.data().displayName);
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    const getUserUid = async (name) => {
      const q = query(collection(db, "users"), where("displayName", "==", name));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setuserUid(doc.data().uid);
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    if (text) {
      getPhotoURL(text);
      getUserName(text);
      getUserUid(text);
    }
  }, [text]);

  const handleClick = async () => {
    const inputText = prompt("Please give a name.");
    console.log(inputText);
    setText(inputText);
    try {
        await updateDoc(doc(db, "chats", data.chatId), {
          member: arrayUnion({
            uid: userUid,
            displayName: userName,
            photoURL: photoURL,
          }),
        }).then(() => {
          updateDoc(doc(db, "userChats", userUid), {
            [data.chatId + ".userInfo"]: {
              uid: userUid,
              displayName: userName,
              photoURL: photoURL,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        });
      } catch (err) {
        setErr(true);
    }
  };
    return(

        <div className="chat">
            <div className="chatInfo">
                {data.chatId !== "null" && <span>{data.chatId}</span>}
                {data.chatId === "null" && <span>please select or create a chatroom on the left hand side!</span>}
                <img src={img} onClick={()=>handleClick()} className="addpeople"/>
                
            </div>
            <Messages />
            <Input/ >
        </div>

    )
}

export default Chat;