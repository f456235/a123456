import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    return(
        <div className="navbar">
            <span className="navbar-logo">Chatrooms</span>
            <div className="navbar-user">
                <img src={currentUser.photoURL} alt="" className="navbar-user-img"/>
                <span>{currentUser.userName}</span>
                <button className="navbar-button" onClick={()=> signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default Navbar;