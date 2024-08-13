"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import SvgBackground from "./SvgBackground";
import Waitlist from "./Waitlist";
import Testimonials from './Testimonials';
import Features from './Features';
import FAQ from './FAQ';
import CardHolder from './CardHolder';


export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  const cardsData = [
    { title: 'Real-Time', text: 'Our AI helps you get scouted by the best teams in the NBA.' },
    { title: 'Analysis', text: 'Our AI helps you improve your game and get better.' },
    { title: 'Insights', text: 'Our AI helps you get drafted by the best teams in the NBA.' }
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setShowWaitlist(true);
  };

  return (
    <main>
      
       {/*<SvgBackground /> */}
      <h1>Why spend thousands on bootcamps?</h1>
      <p>Learn to code in as fast as 3 weeks.</p>

      {!showWaitlist ? (
        <Link href="#" className="special-button" onClick={handleClick}>
          <span className="button-text">Join Waitlist</span>
        </Link>
      ) : (
        <div className="fade-in">
          <Waitlist />
        </div>
      )}

      
      <CardHolder cards={cardsData} />
      
    </main>
  );
}