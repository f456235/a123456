import React from 'react';
import AddImage from '../img/add-image.png'


const Login = () =>{
    return (
        <div className='RegisterContainer'>
            <div className='RegisterWrpper'>
                <span className='logo'>Chat Room </span>
                <span className='title'>Login</span>
                <form>
                  
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                 
                    <button className='signup'>Sign In</button>
                </form>
                <p className='signup'>You don't have an account? Register</p>
            </div>
        </div>
    );

};


export default Login;