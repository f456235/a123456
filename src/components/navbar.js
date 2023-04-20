import React from "react";

const Navbar = () => {
    return(
        <div className="navbar">
            <span className="navbar-logo">Chatrooms</span>
            <div className="navbar-user">
                <img src="https://s27522.pcdn.co/wp-content/uploads/2023/03/James-Outman-2023-Spring-Training-2-Fxgl74.jpeg" alt="" className="navbar-user-img"/>
                <span>Richard</span>
                <button className="navbar-button">logout</button>
            </div>
        </div>
    )
}

export default Navbar;