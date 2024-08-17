'use client';
import Link from 'next/link';
import { useEffect, useState,useRef,useContext } from 'react';import { auth,signOut } from './firebaseconfig';

import { useRouter } from 'next/navigation';

import { AppContext } from './appContext';



const TopBar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburger = useRef(null);
  const appContext = useContext(AppContext);
  useEffect(()=>{
    //add open mobile menu logi
    if(hamburger.current){hamburger.current.classList.toggle("is-active");}
  },[isMobileMenuOpen]);

  function signout(){
    signOut(auth).then((result) => {
      console.log("Signed out success.");
      router.push('/');
      appContext.setLoggedIn(false);
    }).catch(err =>{
      console.log(err);
    })
  }

  return (
    <header>
      <Link href="/" className="logo">
        Code<span className='pixelText' style={{marginLeft:'0.1rem'}}>byte</span>
      </Link>

      <nav>
      <Link href="" onClick={()=>{signout(); }} className={appContext.loggedIn ? 'visible' : 'hidden'}>
          Log out
        </Link>
      <Link href="/feedback" className={appContext.loggedIn ? 'visible' : 'hidden'}>
          Feedback
        </Link>
        <Link href="/dashboard" className={appContext.loggedIn ? 'visible' : 'hidden'}>
          Dashboard
        </Link>
        
        <Link href="/login" className={appContext.loggedIn ? 'hidden' : 'visible'}>
          Login
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