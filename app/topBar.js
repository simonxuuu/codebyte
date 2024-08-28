"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useContext } from "react";
import { auth, signOut } from "./firebaseconfig";

import { usePathname, useRouter } from "next/navigation";

import { AppContext } from "./appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const baseNavPages = [
  {
    name: "About",
    link: "",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
];

const TopBar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navPages, setNavPages] = useState([...baseNavPages]);
  const pathname = usePathname();

  const hamburger = useRef(null);
  const appContext = useContext(AppContext);
  useEffect(() => {
    //add open mobile menu logi
    if (hamburger.current) {
      hamburger.current.classList.toggle("is-active");
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    console.log(appContext);
    if (appContext.loggedIn) {
      setNavPages([
        ...baseNavPages,
        { name: "Dashboard", link: "/dashboard" },
        { name: "Feedback", link: "/feedback" },
        { name: "Profile", link: "/dashboard/profile" },
      ]);
    }
  }, [appContext]);

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
    <div className="flex flex-col items-center">
      <header className="outline outline-[1px] outline-white/10 border-t border-white/15 bg-zinc-800/70 shadow-lg shadow-black/20 lg:py-4 py-2.5 px-6 lg:rounded-2xl flex items-center">
        <Link href="/" className="text-xl flex-1">
          codigo
        </Link>

        <div className="absolute lg:flex hidden items-center space-x-3 left-1/2 -translate-x-1/2">
          {navPages.map((link, i) => {
            return (
              <Link href={link.link} key={i}>
                <p className="my-0 text-base text-zinc-400">{link.name}</p>
              </Link>
            );
          })}
        </div>

        <nav className="lg:flex hidden items-center gap-2">
          <Link
            href="/login"
            className={`text-xl ${appContext.loggedIn ? "hidden" : "visible"}`}
          >
            <p className="my-0 text-base">Log in</p>
          </Link>

          <Link
            href="/register"
            className={`text-xl ${appContext.loggedIn ? "hidden" : "visible"}`}
          >
            <button className="my-0 bg-white px-2 py-1 rounded-lg text-zinc-800 text-base">
              Sign up
            </button>
          </Link>

          <div
            className={`text-xl ${appContext.loggedIn ? "visible" : "hidden"}`}
          >
            <button
              onClick={() => {
                signout();
              }}
              className="my-0 bg-red-500 border-t border-red-400 shadow-md shadow-red-500/30 px-2 py-1 rounded-lg text-red-900 text-base"
            >
              Log out
            </button>
          </div>
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

      {isMobileMenuOpen && (
        <div className="border-b border-zinc-800 shadow-2xl shadow-zinc-950/70 fixed top-[60px] w-screen bg-zinc-900/80 backdrop-blur-lg z-[500] text-white flex flex-col gap-2">
          <div className="p-6 flex-1">
            {navPages.map((page, i) => {
              return (
                <Link href={`${page.link}`} key={`fsadffaosdufjasdf=${i}`}>
                  <div className="w-full text-left text-lg py-1 flex items-center gap-2">
                    <span className="flex-1">{page.name}</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-zinc-400"
                    />
                  </div>
                </Link>
              );
            })}
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
  );
};

export default TopBar;
