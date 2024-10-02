"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../appContext';
import { auth, signOut } from "../../firebaseconfig";
import { useRouter } from 'next/navigation';
export default function Page() {
    const appContext = useContext(AppContext);
    const router = useRouter();
    const [usernameInputMsg,setusernameInputMsg] = useState('');
    const [usernameInputMsgerror,setusernameInputMsgerror] = useState(false);
    function signout() {
        signOut(auth)
          .then((result) => {
            console.log("Signed out success.");
            router.push("/");
            appContext.setLoggedIn(false);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    function updateUser(value) {
      if(value.length <= 0 || !value || value == undefined){
        
        return;
      }
      appContext.changeUsername(value).then(res =>{
        setusernameInputMsg(res);
        if(res == "Success"){
          appContext.setUsername(value);
          setusernameInputMsgerror(false);
        }
        else{
          setusernameInputMsgerror(true);
        }
      })
  }
    return (
        <main className='userProfilePage'>
            <h1 className="userProfileName">{appContext.email}</h1>
            <input className='styledInput' style={{width:'25em',height:'2em',marginBottom:0}} onKeyUp={(e)=>{if(e.key == "Enter"){
        updateUser(e.target.value);
      }}} onBlur={(e)=>{updateUser(e.target.value)}} placeholder={`Username: ${appContext.username} (Click to edit)`}></input>
      <h3 style={{fontSize:'1em',marginTop:3,color:`${usernameInputMsgerror ? 'var(--red)' : 'var(--green)'}`}}>{usernameInputMsg}</h3>
            <button onClick={signout}>log out</button>
        </main>
    );
}