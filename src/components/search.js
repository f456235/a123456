import React from "react";

const Search = () => {
    return(
        <div className="search">
            <div className="searchInput">
                <input type="text" className="search" placeholder="find user"/>
            </div>
            <div className="userChat">
                <img className="userChatimg" src="https://people.com/thmb/KOkE3oygOMWE8rMF-dF0uBfrSe0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(625x19:627x21)/Joel-Embiid-e435ad7fb7cd451294191de9afa7ce7b.jpg" alt=""/>
                <div className="userInfo">
                    <span className="userChat-span">Joel Embiid</span>
                </div>
            </div>
        </div>
    )
}

export default Search;