"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../appContext';
import { auth, signOut } from "../../firebaseconfig";
import { useRouter } from 'next/navigation';
export default function Page() {
    const appContext = useContext(AppContext);
    const router = useRouter();

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

    return (
        <main className='userProfilePage'>
            <h1 className="userProfileName">{appContext.email}</h1>
            <button onClick={signout}>log out</button>
        </main>
    );
}