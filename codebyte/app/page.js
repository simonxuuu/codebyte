"use client";

import React, { useState,useEffect } from 'react';
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged } from 'firebase/auth';
import SvgBackground from "./SvgBackground";
import CreateAccountHomepage from "./createAccountHomepage";
import Testimonials from './Testimonials';
import Features from './Features';
import FAQ from './FAQ';
import CardHolder from './CardHolder';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { auth } from './firebaseconfig';

export default function Home() {
  const router = useRouter();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [loggedIn,setLoggedIn]= useState(false);
  const cardsData = [
    { title: 'Real-Time', text: 'Our AI helps you get scouted by the best teams in the NBA.' },
    { title: 'Analysis', text: 'Our AI helps you improve your game and get better.' },
    { title: 'Insights', text: 'Our AI helps you get drafted by the best teams in the NBA.' }
  ];
  
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setLoggedIn(true);

      } else {
        console.log('NOT logged in');
        setLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);
  
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
        <Link href="#" className="button" onClick={loggedIn ? gotoDashboard : handleClickNotLoggedIn}>
          <span className="button-text">{loggedIn ? 'Go to dashboard':'Create an account'}</span>
        </Link>
      ) : (
        <div className="fade-in">
          <CreateAccountHomepage/>
        </div>
      )}

      
      <CardHolder cards={cardsData} />
      
    </main>
  );
}