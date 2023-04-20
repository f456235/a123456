import React from 'react';
import AddImage from '../img/add-image.png'

//create html objects
/*var outerdiv = document.createElement('div');
var innerdiv = document.createElement('div');

var logo = document.createElement('span');
var title = document.createElement('span');
var form  = document.createElement('form');
var para = document.createElement('p');

var name = document.createElement('input');
var email = document.createElement('input');
var password = document.createElement('input');
var file = document.createElement('input');
var sign_up_button = document.createElement('button');

//set up html object attribute
logo.className='logo';
title.className='title';
outerdiv.className='formContainer';
innerdiv.className='wrapContainer'
name.type='text';
email.type='email';
password.type='password';
file.type='file';
para.innerText="Already have an account? Login";
sign_up_button.innerText="Sign Up";
logo.innerText="Chat Room";
title.innerText="Register";

//make object connects to each other
outerdiv.appendChild(innerdiv);

innerdiv.appendChild(logo);
innerdiv.appendChild(title);
innerdiv.appendChild(form);
innerdiv.appendChild(para);

form.appendChild(name);
form.appendChild(email);
form.appendChild(password);
form.appendChild(file);

console.log(outerdiv);  */

const Register = () =>{
    return (
        <div className='RegisterContainer'>
            <div className='RegisterWrpper'>
                <span className='logo'>Chat Room </span>
                <span className='title'>Register</span>
                <form>
                    <input type='text' placeholder='name'/>
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                    <input style={{display:'none'}} type='file' id ='file'/>
                    <label htmlFor='file'className="signupimage">
                        <img  id = "addimage"src={AddImage} alt="add image"/>
                        <span>Add ur own image</span>
                    </label >
                    <button className='signup'>Sign Up</button>
                </form>
                <p className='signup'>Already have an account? Login</p>
            </div>
        </div>
    );

};


export default Register;