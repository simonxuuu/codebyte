"use client"


import React, { useState,} from 'react';
import Waitlist from '../Waitlist.js';

export default function WaitlistPage() {  
  return (  
    <main>
      <h2>CourtIQ is launching soon,</h2>
      <h3>join the wait list to become world class — with AI.</h3>
      <Waitlist />
    </main>
  );
}

