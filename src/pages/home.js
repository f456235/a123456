import React from "react";
import Chat from "../components/chat";
import Chats from "../components/chats";
import Input from "../components/input";
import Message from "../components/message";
import Navbar from "../components/navbar";
import Search from "../components/search";
import Sidebar from "../components/sidebar";
import '../style.css';
const Home = () => {
    return(
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home;