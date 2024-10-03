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
export default function Register() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [apiResponse,setApiResponse] = useState('');
  const handleSubmit = (event) => {
    appContext.registerAccount(event).then((response) => {
     
      setApiResponse(response);
      if(response == 'Success!'){
        router.push('/dashboard');
      }
    });
  };
  const handleSubmitGoogle = (event) => {
    appContext.loginAccountWithGoogle(event).then((response) => {
      console.log(response);
      setApiResponse(response);
      if (response == "Success!") {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-2 m-0 h-[100vh] pt-24">
      <div className="basis-full flex-none xl:w-[20%] lg:w-[50%] md:w-[90%] w-full text-center flex flex-col items-center justify-center">
        <div className="">
          <h2
            style={{ maxWidth: "100%" }}
            className="text-2xl mb-0 font-medium"
          >
            {"Register for edCode"}
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
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-100 border border-transparent text-zinc-800"
          >
            Create account
          </button>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'var(--darkGrey)',marginTop:'0.5em',marginBottom:'0.5em'}}>
          <hr style={{width:'43%',border:'1px solid var(--darkGrey)'}}></hr><h3 style={{fontSize:'1em',margin:0,padding:0}}>or</h3> <hr style={{width:'43%',border:'1px solid var(--darkGrey)'}}></hr>

          </div>
         
          <button type='button' onClick={handleSubmitGoogle} style={{display:'flex',alignContent:'center',justifyContent:'center',fontWeight:'500'}}className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-100 border border-transparent text-zinc-800 ">
            
                <img
                  width="20px"
                  style={{marginRight: "1em",marginTop:'0.1em' }}
                  alt="Google sign-in"
                  src="/google.png"
                />
                Register with Google
              
          </button>

          <button
            type="button"
            onClick={() => {
              router.push("/login");
            }}
            className="text-sm mt-2 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-zinc-800 text-zinc-500"
          >
            Already have an account?{" "}
            <span className="text-sky-700 underline">Log in</span>
          </button>
        </form>

        {apiResponse && apiResponse != "Success!" && (
          <span className="text-sm mt-8 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-red-900 bg-red-900/10 text-red-600">
            {apiResponse}
          </span>
        )}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
