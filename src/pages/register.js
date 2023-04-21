import React from 'react';
import { useState } from 'react';
import AddImage from '../img/add-image.png'
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth,storage,db} from  "../firebase";
import { UserCredential } from 'firebase/auth';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
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
    const [error,setError] = useState(false);
    const SumbitEvent = async (e) =>{
        e.preventDefault();
        const userName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const userFile = e.target[3].files[0];
        
        try{
            const result = await createUserWithEmailAndPassword (auth,email,password);
            const storageRef = ref(storage, userName);

            const uploadTask = uploadBytesResumable(storageRef, userFile);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            console.log('nothing la');
                            break;
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    setError(true);
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        await updateProfile(result.user,{
                            userName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", result.user.uid),{
                            uid: result.user.uid,
                            userName,
                            email,
                            photoURL: downloadURL, 
                        });
                    });
                }
            );
        }catch(err){
            setError(true);
        } 
    }
    return (
        <div className='RegisterContainer'>
            <div className='RegisterWrpper'>
                <span className='logo'>Chat Room </span>
                <span className='title'>Register</span>
                <form onSubmit={SumbitEvent}>
                    <input type='text' placeholder='name'/>
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                    <input style={{display:'none'}} type='file' id ='file'/>
                    <label htmlFor='file'className="signupimage">
                        <img  id = "addimage" src={AddImage} alt="add"/>
                        <span>Add ur own image</span>
                    </label >
                    <button className='signup'>Sign Up</button>
                </form>
                {error && <span>Something Went Wrong</span>}
                <p className='signup'>Already have an account? Login</p>
            </div>
        </div>
    );

};


export default Register;