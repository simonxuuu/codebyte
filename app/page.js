"use client";

import React, { useState,useEffect,useContext } from 'react';
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign } from "@fortawesome/fontawesome-free-solid"

import CreateAccountHomepage from "./createAccountHomepage";
import styles from './page.module.css'
import { useRouter } from 'next/navigation';


import { AppContext } from './appContext';

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
      <div className='h-screen flex flex-col items-center justify-center'>
        <h1 style={{fontWeight:'900'}}className=' text-5xl relative'>Don&apos;t just learn to <span className="mx-2 bg-gradient-to-b from-rose-400 to-rose-600 w-[90px] h-[60px] p-1 rounded-xl flex -skew-y-6 -skew-x-2" style={{ boxShadow: '0px 0px 12px #f43f5e' }}>
            <span className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-3xl text-white flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} />
            </span>
          </span> code,<br />learn to problem solve</h1>
      </div>

      
        {/* First thing user sees, call to action */}
      <h1>Why spend thousands on bootcamps?</h1>
      <p>Learn to code in as fast as 3 weeks.</p>


      {/* Waitlist Button, user action */}
      {!showWaitlist ? (
        <Link href="#" className="button" onClick={appContext.loggedIn ? gotoDashboard : handleClickNotLoggedIn}>
          <span className="button-text">{appContext.loggedIn ? 'Go to dashboard':'Create an account'}</span>
        </Link>
      ) : (
        <div className="fade-in">
          <CreateAccountHomepage/>
        </div>
      )}
      {/* Divide area here into sections <section> and have 1-2 column layout per section */}
      <section></section>
     
      
    </main>
  );
}