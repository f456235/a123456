import React, { useContext, useEffect, useState } from "react";
import { onSnapshot,doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import img from "../img/chat_group.png";
import { ChatContext } from "../context/ChatContext";
const Chats = () => {

    const [chats,setChats] = useState([])
    const {currentUser} = useContext(AuthContext);
    const {data,dispatch} = useContext(ChatContext) ;
    useEffect (()=>{
       const getChats = () =>{
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
          });

            return ()=>{
                unsub();
            };
       };
       
       currentUser.uid && getChats();
    },[currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload: u})
    };
    //console.log(chats);
    try{
        //console.log(data);
    }catch(err){
        console.log(err.message);
    }
    try{
        //console.log(chats);
    }catch(err){
        console.log(err.message);
    }
    Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
        console.log(chat);
    });
    return(
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
                 <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[0])}>
                 <img className="userChatimg" src={chat[1].userInfo.photoURL} alt="hello"/>
                 <div className="userInfo">
                     <span className="userChat-span">{chat[0]}</span>
                     <p className="userChat-sentence">{chat[1].lastMessage?.text}</p>
                 </div>
             </div>
            ))}
        
        </div>
        
       
    )
}

export default Chats;