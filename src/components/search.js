import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { collection,query,serverTimestamp,setDoc,where } from "firebase/firestore";
import { getDocs ,updateDoc,doc,getDoc} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  
  //console.log(currentUser);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    console.log(user);
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        setUser(doc.data());
        //console.log(user.uid);
        
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      const currentUserRef = doc(db,"userChats",currentUser.uid);
      const userRef = doc(db,"userChats",user.uid);
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        
        //console.log(currentUserRef);
        //create user chats
        console.log("a");
        
        await updateDoc( doc(db,"userChats",currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("b");
        console.log("c");
        console.log(currentUser);
        console.log(username);
        await updateDoc(doc(db,"userChats",user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },


          [combinedId + ".date"]: serverTimestamp(),

         
        });
        console.log("d");
      }
    }catch (err) {
      console.log(err.message);
      setErr(true);
    }

    setUser(null);
    setUsername("")
  };

    return(
        <div className="search">
            <div className="searchInput">
                <input type="text" className="search" placeholder="find user"
                onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}
                value={username}
                />
            </div>
            {err && <span>Oops! no one was found.</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img className="userChatimg" src={user.photoURL} alt=""/>
                <div className="userInfo">
                    <span className="userChat-span">{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;