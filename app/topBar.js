"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useContext } from "react";
import { auth, signOut } from "./firebaseconfig";

import { usePathname, useRouter } from "next/navigation";

import { AppContext } from "./appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./components/modals/ProfileModal";
import Dashboard from "./dashboard/page";
import  "../styles/globals.css";


const TopBar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  const pathname = usePathname();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const hamburger = useRef(null);
  const appContext = useContext(AppContext);
 

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
    <>
      {showProfileModal && (
        <ProfileModal closeModalAction={() => setShowProfileModal(false)} />
      )}
      <div
        className={`flex flex-col items-center ${
          pathname.includes("/dashboard") && "hidden"
        }`}
      >
        <header style={{backgroundColor:'var(--topBarColor)',borderColor:'var(--topBarBorderColor)',borderWidth:'0.15em'}}className=" bg-zinc-800/70 shadow-lg shadow-black/20 lg:py-4 py-2.5 px-6 lg:rounded-2xl flex items-center">
          <Link href="/" className="text-xl flex-1" style={{fontWeight:500}}>
            edCode
          </Link>

          <div className="absolute lg:flex  items-center space-x-3 left-1/2 -translate-x-1/2">
              {appContext.loggedIn && (
                <Link href='/dashboard'>
                  <p className=" my-0 text-base text-zinc-400 menuItem">Dashboard</p>
                </Link>
              )}
            
          </div>

          <nav className="lg:flex  items-center gap-2">
            <Link
              href="/login"
              className={`text-xl ${
                appContext.loggedIn ? "hidden" : " "
              }`}
            >
              <p className="my-0 text-base">Log in</p>
            </Link>

            <Link
              href="/register"
              className={`text-xl ${
                appContext.loggedIn ? "hidden" : " "
              }`}
            >
              <button className="my-0 bg-gradient-to-b from-zinc-100 to-zinc-200 border-t border-t-white px-2 py-1 rounded-lg text-zinc-800 text-base">
                Sign up
              </button>
            </Link>

            {appContext.loggedIn && (
             <button onClick={signout} className="my-0 bg-gradient-to-b from-zinc-100 to-zinc-200 border-t border-t-white px-2 py-1 rounded-lg text-zinc-800 text-base">
             Log out
           </button>
            )}
          </nav>

          <button
            ref={hamburger}
            className="hamburger hamburger--spin"
            type="button"
            onClick={() => {
              setMobileMenuOpen(!isMobileMenuOpen);
              if (hamburger.current) {
                hamburger.current.classList.toggle("is-active");
              }
            }}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="border-b border-zinc-800 shadow-2xl shadow-zinc-950/70 fixed top-[60px] w-screen bg-zinc-900/80 backdrop-blur-lg z-[500] text-white flex flex-col gap-2">
            <div className="p-6 flex-1">
            {appContext.loggedIn && (
                  <Link href={`/dashboard`}>
                    <div className="w-full text-left text-lg py-1 flex items-center gap-2">
                      <span className="flex-1">Dashboard</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-zinc-400"
                      />
                    </div>
                  </Link>
                )
            }
            </div>

            <div className="p-6 flex flex-col gap-2 text-lg">
              <Link
                href="/login"
                className={`text-xl ${
                  appContext.loggedIn ? "hidden" : "visible"
                }`}
              >
                <button className="my-0 text-base w-full border border-zinc-800 p-2 rounded-lg">
                  Log in
                </button>
              </Link>

              <Link
                href="/login"
                className={`text-xl ${
                  appContext.loggedIn ? "hidden" : "visible"
                }`}
              >
                <button className="my-0 text-base w-full border border-transparent bg-white text-zinc-800 p-2 rounded-lg">
                  Sign up
                </button>
              </Link>

              <button
                className={`text-xl my-0 w-full border border-transparent bg-red-400 text-black p-2 rounded-lg ${
                  appContext.loggedIn ? "visible" : "hidden"
                }`}
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopBar;
