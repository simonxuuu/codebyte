"use client";

import React, { useState,useEffect,useContext } from 'react';
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";


import CreateAccountHomepage from "./createAccountHomepage";
import styles from './page.module.css'
import { useRouter } from 'next/navigation';


import { AppContext } from './AppContext';

export default function Home() {
  const router = useRouter();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const appContext = useContext(AppContext);

  

  const handleClickNotLoggedIn = (e) => {
    e.preventDefault();
    setShowWaitlist(true);
  };
  const gotoDashboard = (e) =>{
    e.preventDefault();
    router.push('/dashboard');
  }
  return (
    <main className={styles.main}>
      
       {/*<SvgBackground /> */}
      <h1>Why spend thousands on bootcamps?</h1>
      <p>Learn to code in as fast as 3 weeks.</p>

      {!showWaitlist ? (
        <Link href="#" className="button" onClick={appContext.loggedIn ? gotoDashboard : handleClickNotLoggedIn}>
          <span className="button-text">{appContext.loggedIn ? 'Go to dashboard':'Create an account'}</span>
        </Link>
      ) : (
        <div className="fade-in">
          <CreateAccountHomepage/>
        </div>
      )}

      
     
      
    </main>
  );
}