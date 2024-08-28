"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebaseconfig";
import { auth } from "../firebaseconfig";
import { useRouter } from "next/navigation";
import { AppContext } from "../appContext";
export default function Login() {
  const appContext = useContext(AppContext);
  const [isRegister, setIsRegister] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (isRegister) {
    } else {
      //login
      console.log(appContext.apiRoute);
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          fetch(`${appContext.apiRoute}/login-account`, {
            method: "POST",
            body: JSON.stringify({ email: email, uid: result.user.uid }),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((response) => {
              if (response.headers.get("Content-Type").includes("text/plain")) {
                // If the content type is plain text, parse as text
                return response.text();
              } else {
                return response.json();
              }
            })
            .then((text) => {
              if (text == "Server Error" || text == "UID not found") {
                setApiResponse("Server error.");
              } else {
                setApiResponse("Account logged in! Loading..");
                console.log(text);
                router.push("/dashboard");
              }
            });
        })
        .catch((error) => {
          setApiResponse("Error with login.");

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
    <div className="flex flex-col items-center p-2 m-0 h-[100vh] pt-24">
      <div className="basis-full flex-none xl:w-[20%] lg:w-[50%] md:w-[90%] w-full text-center flex flex-col items-center justify-center">
        <div className="">
          <h2 className="text-2xl mb-0 font-medium">
            {isRegister ? "Register for Codebyte" : "Log in to Codebyte"}
          </h2>
        </div>
        <form
          className="mt-8 flex flex-col gap-2 w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-900 border border-zinc-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-900 border border-zinc-700"
          />

          <button
            type="submit"
            onClick={() => {
              setIsRegister(false);
            }}
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-100 border border-transparent text-zinc-800"
          >
            Login
          </button>

          {!isRegister && (
            <button
              type="submit"
              onClick={() => {
                setIsRegister(true);
              }}
              className="text-sm mt-2 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-zinc-800 text-zinc-500"
            >
              No account yet?{" "}
              <span className="text-sky-700 underline">Register</span>
            </button>
          )}

          {isRegister && (
            <button
              type="submit"
              onClick={() => {
                setIsRegister(false);
              }}
              className="text-sm mt-2 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-zinc-800 text-zinc-500"
            >
              Already have an account?{" "}
              <span className="text-sky-700 underline">Log in</span>
            </button>
          )}
        </form>

        {apiResponse && apiResponse.length > 0 && (
          <span className="text-sm mt-8 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-red-900 bg-red-900/10 text-red-600">
            {apiResponse}
          </span>
        )}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
