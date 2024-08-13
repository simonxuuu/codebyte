'use client';
import Link from 'next/link';
import { useEffect, useState,useRef } from 'react';
const TopBar = () => {


  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburger = useRef(null);
  useEffect(()=>{
    //add open mobile menu logic
    console.log(isMobileMenuOpen);
    if(hamburger.current){hamburger.current.classList.toggle("is-active");}
  },[isMobileMenuOpen]);


  return (
    <header>
      <Link href="/" className="logo">
        Code<span className='pixelText' style={{marginLeft:'0.1rem'}}>byte</span>
      </Link>

      <nav>
        <Link href="/dashboard">
          DashboardTest
        </Link>
        <Link href="/hello.html">
          Coaches
        </Link>
        <Link href="/hello.html">
          Recruiters
        </Link>
      </nav>

      <button ref={hamburger} className="hamburger hamburger--spin " type="button"  onClick={()=>{setMobileMenuOpen(isMobileMenuOpen => !isMobileMenuOpen);}}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </header>
  );
};

export default TopBar;