'use client';
import Link from 'next/link';
import { useEffect, useState,useRef } from 'react';import { auth,signOut } from './firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';





const TopBar = () => {

  const router = useRouter();
  const [loggedIn,setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburger = useRef(null);
  
  useEffect(()=>{
    //add open mobile menu logic
    console.log(isMobileMenuOpen);
    if(hamburger.current){hamburger.current.classList.toggle("is-active");}
  },[isMobileMenuOpen]);

  function signout(){
    signOut(auth).then((result) => {
      console.log("Signed out success.");
      router.push('/');
      setLoggedIn(false);
    }).catch(err =>{
      console.log(err);
    })
  }

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('logged in with:'+user.email);
       
        setLoggedIn(true);

      } else {
        console.log('NOT logged in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);
  return (
    <header>
      <Link href="/" className="logo">
        Code<span className='pixelText' style={{marginLeft:'0.1rem'}}>byte</span>
      </Link>

      <nav>
      <Link href="" onClick={()=>{signout(); }} className={loggedIn ? 'visible' : 'hidden'}>
          Log out
        </Link>
      <Link href="/feedback" className={loggedIn ? 'visible' : 'hidden'}>
          Feedback
        </Link>
        <Link href="/dashboard" className={loggedIn ? 'visible' : 'hidden'}>
          Dashboard
        </Link>
        <Link href="/dashboard/lessons" className={'visible'}>
          lessons
        </Link>
        <Link href="/login" className={loggedIn ? 'hidden' : 'visible'}>
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