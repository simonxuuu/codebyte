"use client";

import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDollarSign,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import CreateAccountHomepage from "./createAccountHomepage";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { AppContext } from "./appContext";

export default function Home() {
  const router = useRouter();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const appContext = useContext(AppContext);
  const [highlightedSkill, setHighlightedSkill] = useState(0);

  const activeHighlightedSkill = "text-sky-500";
  const inactiveHighlightedSkill = "";

  useEffect(() => {
    const interval = setInterval(() => {
      // we got 3 from the # of skills in the hero section subtitle - 1
      if (highlightedSkill >= 3) {
        setHighlightedSkill(0);
      } else {
        setHighlightedSkill(highlightedSkill + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [highlightedSkill]);

  const handleClickNotLoggedIn = (e) => {
    e.preventDefault();
    setShowWaitlist(true);
  };
  const gotoDashboard = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  return (
    <main className={styles.main}>
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1
          style={{ fontWeight: "900" }}
          className="text-6xl flex items-center flex-wrap relative w-fit font-medium text-white"
        >
          Don&apos;t just learn to{" "}
          <span
            className=" mx-4 bg-gradient-to-b from-rose-400 to-rose-600 w-[70px] h-[60px] p-1 rounded-xl flex -skew-y-6 -skew-x-2"
            style={{
              boxShadow: "5px 5px 12px #f43f5e, 17px 17px 36px #e879f9",
            }}
          >
            <span className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-3xl text-white flex items-center justify-center">
              <FontAwesomeIcon icon={faCode} />
            </span>
          </span>{" "}
          code,
        </h1>
        <h1
          style={{ fontWeight: "900" }}
          className="mt-4 text-7xl flex items-center flex-wrap relative w-fit font-medium text-zinc-200"
        >
          learn to{" "}
          <span className="bg-gradient-to-b bg-clip-text text-transparent from-amber-400 to-orange-500 ml-3">
            problem-solve
          </span>{" "}
          <span
            className=" mx-4 bg-gradient-to-b from-amber-400 to-orange-600 w-[85px] h-[75px] p-1 rounded-xl flex skew-y-6 skew-x-2"
            style={{
              boxShadow: "-5px -5px 12px #e11d48, -17px -17px 24px #ea580c5F",
            }}
          >
            <span className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-4xl text-white flex items-center justify-center">
              <FontAwesomeIcon icon={faQuestion} />
            </span>
          </span>
        </h1>

        <p className="mt-8 text-3xl text-zinc-400">
          Tech is more than just programming.
          <br />
          It&apos;s about{" "}
          <span
            className={`transition-colors duration-400 ${
              highlightedSkill === 0
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            networking
          </span>
          ,{" "}
          <span
            className={`transition-colors duration-400 ${
              highlightedSkill === 1
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            people skills
          </span>
          ,{" "}
          <span
            className={`transition-colors duration-400 ${
              highlightedSkill === 2
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            teamwork
          </span>
          , and{" "}
          <span
            className={`transition-colors duration-400 ${
              highlightedSkill === 3
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            problem solving
          </span>
          .
        </p>

        <button className="mt-8 bg-emerald-600 p-1 rounded-xl flex">
          <div className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-2xl font-medium text-white flex items-center justify-center px-3 py-2">
            Get started today
          </div>
        </button>
      </div>

      {/* First thing user sees, call to action */}
      <h1>Why spend thousands on bootcamps?</h1>
      <p>Learn to code in as fast as 3 weeks.</p>

      {/* Waitlist Button, user action */}
      {!showWaitlist ? (
        <Link
          href="#"
          className="button"
          onClick={appContext.loggedIn ? gotoDashboard : handleClickNotLoggedIn}
        >
          <span className="button-text">
            {appContext.loggedIn ? "Go to dashboard" : "Create an account"}
          </span>
        </Link>
      ) : (
        <div className="fade-in">
          <CreateAccountHomepage />
        </div>
      )}
      {/* Divide area here into sections <section> and have 1-2 column layout per section */}
      <section></section>
    </main>
  );
}
