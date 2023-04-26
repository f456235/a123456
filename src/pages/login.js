import React from 'react';
import AddImage from '../img/add-image.png'
import {  GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import { getDoc ,doc} from 'firebase/firestore';
import { db } from '../firebase';
const Login = () =>{
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const LoginSumbitEvent = async (e) =>{
        e.preventDefault();
     
        const email = e.target[0].value;
        const password = e.target[1].value;
 
        
        try{
           await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch(error){
            alert("wrong account/password!");
            setError(true);
            e.target[0].value = "";
            e.target[1].value = "";
        } 
    }
   
    return (
        <div className='RegisterContainer'>
            <div className='RegisterWrpper'>
                <span className='logo'>Chat Room </span>
                <span className='title'>Login</span>
                <form onSubmit={LoginSumbitEvent} className="register-form">
                  
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                 
                    <button className='signup'>Sign In</button>
                    {error && <span>Something went wrong !</span>}
                </form>
                
                <p className='signup'>You don't have an account?   <Link to="/register">Register</Link></p>
            </div>
        </div>
    );

};


export default Login;