"use client"
import React, { useState ,useContext} from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from '../firebaseconfig';
import { auth } from '../firebaseconfig';
import { useRouter } from 'next/navigation';
import { AppContext } from '../appContext';
export default function Login() {
  const appContext = useContext(AppContext);
  const [isRegister, setIsRegister] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const email = event.target.email.value;
    const password = event.target.password.value;

    if(isRegister){

    }else{
      //login
      console.log(appContext.apiRoute);
      signInWithEmailAndPassword(auth,email,password).then((result)=>{
        fetch(`${appContext.apiRoute}/login-account`, {
          method: "POST",
          body: JSON.stringify({ email:email,uid:result.user.uid}),
          headers: {
            "Content-type": "application/json"
          }
        }).then(response => {
          if (response.headers.get('Content-Type').includes('text/plain')) {
            // If the content type is plain text, parse as text
            return response.text()}else{
              return response.json();
            }

          }
          
        ).then((text) => {
          if (text == "Server Error" || text == "UID not found"){
            setApiResponse('Server error.');
          }else{
            setApiResponse('Account logged in! Loading..');
            console.log(text);
            router.push('/dashboard');
          }
        } );
      }).catch((error)=>{
      setApiResponse('Error with login.');
      
      //console.log(error.message);
    });
    }
    /*
    //This function gets ran when a user creates an account.
    event.preventDefault();
    
    createUserWithEmailAndPassword(auth,email,password).then( (result)=>{
      //created a firebase account
      
      // creating mongoDB info + account validation
      //console.log(JSON.stringify({ email,uid: result.user.uid }));
      fetch("https://codebyte-1b9af19e473e.herokuapp.com/create-account", {
        method: "POST",
        body: JSON.stringify({ email,uid:  result.user.uid }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {return response.text()}).then((text) => {
        if(text == 'Success'){
        setApiResponse('Account created!');
        console.log('created successfully.');
        router.push('/dashboard');
        }else if (text == "Server Error" || text == "UID not found"){
          setApiResponse('Server error.');
        }
      } );
      
    })
    .catch((error)=>{
      setApiResponse('Error with account creation');
      if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
        setApiResponse('Weak password. Make your password longer than 5 characters.');
      }else if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
        setApiResponse('Account already exists.');
      }
      console.log(error.message);
    });
    */
  };

  

  return (
    <main>
      <h2 className="form-title">{isRegister ? 'Register for CourtIQ' : 'Login to CourtIQ'}</h2>
      <form className="login-form login-container" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="your_unique_email@email.com" required className="button" />
      <input type="password" name="password" placeholder="youruniquepass$182" required className="button" />
        
        <button type="submit" onClick={()=>{setIsRegister(true);}} className="special-button">
          Register</button>
          <button type="submit" onClick={()=>{setIsRegister(false);}} className="special-button">
          Login</button>
      </form>
      <span className="api-response">{apiResponse}</span>
    </main>
  );
}