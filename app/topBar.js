"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useContext } from "react";
import { auth, signOut } from "./firebaseconfig";

import { useRouter } from "next/navigation";

import { AppContext } from "./appContext";

const TopBar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburger = useRef(null);
  const appContext = useContext(AppContext);
  useEffect(() => {
    //add open mobile menu logi
    if (hamburger.current) {
      hamburger.current.classList.toggle("is-active");
    }
  }, [isMobileMenuOpen]);

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
    <header className="outline outline-[1px] outline-white/10 border-t border-white/15 bg-zinc-800/70 shadow-lg shadow-black/20 py-4 px-6 rounded-2xl flex items-center">
      <Link href="/" className="text-xl flex-1">
        codebyte
      </Link>

      <div className="absolute flex items-center space-x-3 left-1/2 -translate-x-1/2">
        {[
          {
            name: "Test",
            link: "",
          },
          {
            name: "About",
            link: "",
          },
        ].map((link, i) => {
          return (
            <Link href={link.link} key={i}>
              <p className="my-0 text-base text-zinc-400">{link.name}</p>
            </Link>
          );
        })}
      </div>

      <nav className="flex items-center gap-2">
        <Link
          href=""
          onClick={() => {
            signout();
          }}
          className={appContext.loggedIn ? "visible" : "hidden"}
        >
          Log out
        </Link>
        <Link
          href="/feedback"
          className={appContext.loggedIn ? "visible" : "hidden"}
        >
          Feedback
        </Link>
        <Link
          href="/dashboard"
          className={appContext.loggedIn ? "visible" : "hidden"}
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/profile"
          className={appContext.loggedIn ? "visible" : "hidden"}
        >
          Profile
        </Link>

        <Link
          href="/login"
          className={`text-xl ${appContext.loggedIn ? "hidden" : "visible"}`}
        >
          <p className="my-0 text-base">Log in</p>
        </Link>

        <Link
          href="/login"
          className={`text-xl ${appContext.loggedIn ? "hidden" : "visible"}`}
        >
          <button className="my-0 bg-white px-2 py-1 rounded-lg text-zinc-800 text-base">
            Sign up
          </button>
        </Link>
      </nav>

      <button
        ref={hamburger}
        className="hamburger hamburger--spin "
        type="button"
        onClick={() => {
          setMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
        }}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </header>
  );
};

export default TopBar;
