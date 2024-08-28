"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCode,
  faDollarSign,
  faMicrophone,
  faPenToSquare,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import {
  faJava,
  faJs,
  faPython,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

import CreateAccountHomepage from "./createAccountHomepage";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { AppContext } from "./appContext";
import calendar from "../utils/getCalendar";
import { makeId } from "../utils/makeId";

const FAANG = [
  {
    name: "Meta",
    img: "meta-logo.png",
  },
  {
    name: "Apple",
    img: "apple-logo.png",
  },
  {
    name: "Amazon",
    img: "amazon-logo.webp",
  },
  {
    name: "Netflix",
    img: "netflix-logo.webp",
  },
  {
    name: "Google",
    img: "google-logo.webp",
  },
];

const useFAANGAnimationTimer = () => {
  const [timer, setTimer] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const accumulatedTimeRef = useRef<number>(0);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      accumulatedTimeRef.current += deltaTime;

      // Only update if at least xx ms have passed
      if (accumulatedTimeRef.current >= 1000) {
        setTimer((prevTimer) => {
          if (prevTimer >= FAANG.length - 1) {
            return 0;
          } else {
            return prevTimer + 1;
          }
        });
        accumulatedTimeRef.current = 0;
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return Math.floor(timer);
};

export default function Home() {
  const router = useRouter();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const appContext = useContext(AppContext);
  const [highlightedSkill, setHighlightedSkill] = useState(0);

  const activeHighlightedSkill = "text-green-300";
  const inactiveHighlightedSkill = "text-zinc-500";

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
    <main>
      <div className="h-screen xl:w-[70vw] lg:w-[80vw] md:w-[90vw] px-4 relative flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 bg-green-500/10 blur-3xl w-[40%] aspect-square rounded-full"></div>
        <div className="absolute top-0 left-[70%] -translate-x-1/2 z-0 bg-sage-500/15 blur-3xl w-[30%] aspect-square rounded-full"></div>
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 z-0 bg-sky-300/15 blur-3xl w-[20%] aspect-square rounded-full"></div>

        <div className="flex items-center justify-center flex-wrap gap-5">
          {[
            {
              icon: faCode,
            },
            {
              icon: faQuestion,
            },
            {
              icon: faMicrophone,
            },
            {
              icon: faPenToSquare,
            },
          ].map((x, i) => {
            return (
              <span
                className="outline outline-4 outline-white/30 bg-gradient-to-b from-green-300 to-sage-300 size-[40px] p-1 rounded-xl flex"
                style={{
                  boxShadow:
                    "-3px -3px 24px #4ade80B3, -12px -12px 28px #c3c293B3",
                }}
                key={i}
              >
                <span className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-xl text-black flex items-center justify-center">
                  <FontAwesomeIcon icon={x.icon} />
                </span>
              </span>
            );
          })}
        </div>

        <h1
          style={{ textShadow: "0px 0px 20px rgb(255, 255, 255, 0.4)" }}
          className="mt-8 lg:text-6xl md:text-5xl text-4xl flex items-center flex-wrap justify-center relative w-fit text-zinc-400"
        >
          Coding isn&apos;t just coding.
        </h1>

        <h1
          style={{ textShadow: "0px 0px 20px rgb(255, 255, 255, 0.4)" }}
          className="pb-3 md:mt-2 lg:text-7xl md:text-6xl text-4xl flex items-center justify-center flex-wrap relative w-fit bg-gradient-to-l bg-clip-text text-transparent from-white via-green-300 to-sage-300"
        >
          We teach you what it is.
        </h1>

        <h2 className="md:mt-8 mt-2 lg:text-3xl md:text-2xl text-xl text-zinc-400 font-extralight">
          What is tech, apart from programming?
          <br />
          <span
            className={`transition duration-500 ${
              highlightedSkill === 0
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            Networking.
          </span>{" "}
          <span
            className={`transition duration-500 ${
              highlightedSkill === 1
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            Collaborating.
          </span>{" "}
          <span
            className={`transition duration-500 ${
              highlightedSkill === 2
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            Designing.
          </span>{" "}
          <span
            className={`transition duration-500 ${
              highlightedSkill === 3
                ? activeHighlightedSkill
                : inactiveHighlightedSkill
            }`}
          >
            Problem solving.
          </span>
        </h2>
        <button className="shadow-xl shadow-green-400/10 mt-8 bg-gradient-to-b from-transparent via-green-400/20 via-60% to-green-400/30 to-[99%] border border-green-400/30 p-2 px-3 md:text-2xl text-xl text-green-400 rounded-xl">
          Learn it all today <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            {
              img: "cpp.png",
            },
            {
              img: "java.webp",
            },
            {
              img: "js.png",
            },
            {
              img: "kotlin.png",
            },
            {
              img: "python.png",
            },
          ].map((img, i) => {
            return (
              <div
                className="size-[35px] rounded-lg flex flex-col items-center justify-center bg-zinc-800"
                key={i}
              >
                <Image
                  src={`/languages/${img.img}`}
                  width={20}
                  height={20}
                  alt={img.img}
                  key={i}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center relative">
        <div className="relative z-[1] bg-gradient-to-b from-green-400/10 to-green-400/20 border border-green-400/30 size-20 rounded-2xl flex flex-col items-center justify-center">
          <p className="font-semibold italic text-green-400">C</p>
        </div>

        <div className="relative z-[1] flex flex-row flex-nowrap gap-3">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/leetcode-logo.png"}
              width={40}
              height={40}
              alt="leetcode"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/hackerrank-logo.tiff"}
              width={40}
              height={40}
              alt="hackerrank"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/coursera-logo.png"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="relative z-[1] flex flex-row flex-nowrap gap-3 blur-[1px]">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/meta-logo.png"}
              width={40}
              height={40}
              alt="leetcode"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/apple-logo.png"}
              width={40}
              height={40}
              alt="hackerrank"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/amazon-logo.webp"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/netflix-logo.webp"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/google-logo.webp"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="relative z-[1] flex flex-row flex-nowrap gap-3 blur-[2px]">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/microsoft.png"}
              width={40}
              height={40}
              alt="leetcode"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/visa.svg"}
              width={40}
              height={40}
              alt="hackerrank"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/samsung.png"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/lg.png"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 outline outline-[1px] outline-zinc-800 border-t border-t-zinc-700 size-20 rounded-2xl flex flex-col items-center justify-center shadow-md shadow-black/20">
            <Image
              src={"/logos/huawei.png"}
              width={40}
              height={40}
              alt="coursera"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="absolute z-[2] bg-gradient-to-b -bottom-2 -left-1 w-[110%] h-[140px] from-transparent to-body" />
      </div>

      <div className="px-4 xl:w-[40%] lg:w-[70%] md:w-[90%] flex flex-col items-center">
        <h1 className="lg:text-4xl text-3xl font-medium">
          We teach you what <span>other courses don&apos;t</span>,<br />
          and what tech companies want.
        </h1>
        <p className="lg:text-lg text-base text-zinc-400">
          In the real world, being a successful developer isn&apos;t just
          technical expertise; it&apos;s collaboration, articulation, and
          seamless work.
          <br />
          <br />
          Like Codebyte, Leetcode and Hackerrank train you for programming. But
          Codebyte teaches you what Leetcode and Hackerrank don&apos;t --{" "}
          <span className="text-indigo-400">
            collaboration & teamwork skills
          </span>
          . Making genuinely interesting{" "}
          <span className="text-indigo-400">passion projects</span>. Learning to
          stay <span className="text-indigo-400">agile & flexible</span>.
        </p>
      </div>

      <div className="relative w-screen lg:h-[80vh]">
        <div className="absolute z-0 bg-green-500/10 blur-3xl w-[30%] aspect-square rounded-full left-[10%] top-[10%]"></div>
        <div className="absolute z-0 bg-sage-500/15 blur-3xl w-[20%] aspect-square rounded-full left-[30%] bottom-[0%]"></div>

        <div
          className="text-red-400 md:flex hidden items-center justify-center text-5xl absolute z-10 top-[0%] right-[6%] size-18 rounded-xl bg-gradient-to-b from-transparent from-10% to-red-500/50 border border-red-400 size-20 backdrop-blur-[2px]"
          style={{ boxShadow: "0px 0px 25px #f87171BF" }}
        >
          <FontAwesomeIcon icon={faJava} />
        </div>

        <div className="mt-24 relative z-[1] flex lg:flex-row flex-col gap-6 items-center h-full">
          <div className="text-left text-white xl:w-[50%] lg:w-[45%] xl:px-16 lg:px-12 md:px-8 px-4">
            <div className="bg-gradient-to-b from-transparent from-10% to-green-500/30 border border-green-500/20 size-12 text-xl rounded-full flex items-center justify-center text-green-600">
              <FontAwesomeIcon icon={faCode} />
            </div>

            <h2 className="mt-4 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              Go from
              <br />
              <span
                style={{ textShadow: "0px 0px 10px #22d3ee80" }}
                className="font-mono bg-gradient-to-b bg-clip-text text-transparent from-green-300 to-lime-500"
              >
                print("Hello, world!")
              </span>
              <br />
              to building for the world
            </h2>
            <div
              className="w-full"
              style={{
                backdropFilter: "blur(20px)",
                WebkitMask: "linear-gradient(90deg, transparent, black 50%)",
              }}
            ></div>
            <h3 className="mt-4 xl:text-2xl lg:text-xl md:text-lg text-base font-light text-white/70">
              Guided programming lessons take you from zero to hero, with
              interactive walkthroughs.
            </h3>
            <button className="hover:scale-[.97] transition items-center shadow-xl shadow-green-400/10 mt-8 bg-gradient-to-b from-transparent via-green-400/20 via-60% to-green-400/40 to-[99%] border border-green-400/30 p-2 px-3 text-xl text-green-400 rounded-xl flex">
              Start learning{" "}
              <FontAwesomeIcon icon={faPython} className="ml-2 text-white" />
            </button>
          </div>

          <div className="relative lg:flex-1 w-full h-full flex items-center bg-[url('/bgs/grids/zinc800.svg')] bg-contain bg-center bg-repeat">
            <div
              className="text-sky-400 md:flex hidden items-center justify-center text-5xl absolute z-10 top-[15%] -left-6 size-18 rounded-xl bg-gradient-to-b from-transparent from-10% to-sky-500/50 border border-sky-500 size-20 backdrop-blur-[2px]"
              style={{ boxShadow: "0px 0px 25px #38bdf8BF" }}
            >
              <FontAwesomeIcon icon={faReact} />
            </div>
            <div
              className="text-yellow-400 md:flex hidden items-center justify-center text-5xl absolute z-0 bottom-[11%] right-[30%] size-18 rounded-xl bg-gradient-to-b from-transparent from-10% to-yellow-500/50 border border-yellow-500 size-20 backdrop-blur-[2px]"
              style={{ boxShadow: "0px 0px 25px #facc15BF" }}
            >
              <FontAwesomeIcon icon={faJs} />
            </div>
            <div className="relative z-0 backdrop-blur-[1.5px] w-full aspect-video bg-gradient-to-b from-white/5 from-40% to-white/20 border border-white/20 lg:rounded-l-xl shadow-2xl shadow-white/10"></div>
          </div>
        </div>

        <div className="absolute md:flex hidden z-0 h-[20px] bg-gradient-to-r from-sage-300/30 via-green-100/30 to-white blur-2xl w-screen rotate-[10deg] right-0 top-[30%] -translate-y-[50%]" />
        <div className="absolute md:flex hidden z-0 h-[20px] bg-gradient-to-r from-sage-300/30 via-green-100/30 to-white blur-2xl w-screen rotate-[0deg] right-0 top-[50%] -translate-y-[50%]" />
        <div className="absolute md:flex hidden z-0 h-[20px] bg-gradient-to-r from-sage-300/30 via-green-100/30 to-white blur-2xl w-screen rotate-[-10deg] right-0 top-[70%] -translate-y-[50%]" />
      </div>

      {/* INTERVIEW section  */}
      <div className="md:mt-48 mt-20 relative w-screen lg:h-[80vh]">
        <div className="absolute z-0 bg-green-500/10 blur-3xl w-[30%] aspect-square rounded-full left-[30%] top-[10%]"></div>
        <div className="absolute z-0 bg-sage-500/15 blur-3xl w-[20%] aspect-square rounded-full left-[60%] bottom-[0%]"></div>

        <div className="relative z-[1] flex lg:flex-row flex-col-reverse gap-6 items-center h-full">
          <div className="relative lg:flex-1 w-full h-full flex items-center bg-[url('/bgs/grids/zinc800.svg')] bg-contain bg-center bg-repeat">
            <div className="relative z-0 backdrop-blur-[1.5px] w-full aspect-video bg-gradient-to-b from-white/5 from-40% to-white/20 border border-white/20 lg:rounded-r-xl shadow-2xl shadow-white/10"></div>
          </div>

          <div className="text-left text-white xl:w-[50%] lg:w-[45%] xl:px-16 lg:px-12 md:px-8 px-4">
            <div className="bg-gradient-to-b from-transparent from-10% to-green-500/30 border border-green-500/20 size-12 text-xl rounded-full flex items-center justify-center text-green-600">
              <FontAwesomeIcon icon={faMicrophone} />
            </div>

            <h2 className="mt-4 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              Interviews are half coding,{" "}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent from-white via-green-300 to-sage-300"
                style={{ textShadow: "0px 0px 15px rgb(255, 255, 255, 0.4)" }}
              >
                half talking
              </span>
              .
              <br />
              <span
                className="bg-gradient-to-l bg-clip-text text-transparent from-white via-green-300 to-sage-300"
                style={{ textShadow: "0px 0px 15px rgb(255, 255, 255, 0.4)" }}
              >
                Practice talking with Codebyte AI.
              </span>
            </h2>
            <div
              className="w-full"
              style={{
                backdropFilter: "blur(20px)",
                WebkitMask: "linear-gradient(90deg, transparent, black 50%)",
              }}
            ></div>
            <h3 className="mt-4 xl:text-2xl lg:text-xl md:text-lg text-base font-light text-white/70">
              Communication is an ignored yet core value of interviews. Codebyte
              teaches you how to write code, then express it.
            </h3>
            <button className="hover:scale-[.97] transition items-center shadow-xl shadow-green-400/10 mt-8 bg-gradient-to-b from-transparent via-green-400/20 via-60% to-green-400/40 to-[99%] border border-green-400/30 p-2 px-3 text-xl text-green-400 rounded-xl flex">
              Start learning{" "}
              <FontAwesomeIcon
                icon={faMicrophone}
                className="ml-2 text-white"
              />
            </button>
          </div>
        </div>

        <div className="absolute md:flex hidden z-0 h-[20px] bg-gradient-to-r from-sage-300/30 via-green-100/30 to-white/20 blur-2xl w-screen rotate-[10deg] right-0 top-[30%] -translate-y-[50%]" />
        <div className="absolute md:flex hidden z-0 h-[20px] bg-gradient-to-r from-sage-300/30 via-green-100/30 to-white/20 blur-2xl w-screen rotate-[0deg] right-0 top-[50%] -translate-y-[50%]" />
        <div className="absolute md:flex hidden z-0 h-[20px] bg-gradient-to-r from-sage-300/30 via-green-100/30 to-white/20 blur-2xl w-screen rotate-[-10deg] right-0 top-[70%] -translate-y-[50%]" />
      </div>

      {/* SPACED REPETITION section */}
      <p
        className="mt-24  xl:text-6xl lg:text-5xl md:text-4xl text-3xl pb-2 bg-gradient-to-r bg-clip-text text-transparent from-white via-green-300 to-sage-400 from-40% via-60% to-85%"
        style={{ textShadow: "0px 0px 20px rgb(255, 255, 255, 0.4)" }}
      >
        Don&apos;t just memorize coding, learn it
      </p>

      <div className="mt-8 w-screen md:block hidden">
        <div className="h-[350px] relative">
          <div className="absolute w-screen h-full flex items-center space-x-6 xl:-translate-x-[5vw] lg:-translate-x-[350px] md:-translate-x-[600px]">
            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              15
            </div>
            <div
              className="border-t-4 border-t-white/30 border-b-2 border-b-sage-600 h-full aspect-square rounded-full bg-gradient-to-b from-green-600 to-sage-400 text-white flex items-center justify-center text-[20vh]"
              style={{
                boxShadow: "0px 0px 25px #4ade80BF, 0px 0px 70px #a8a868BF",
              }}
            >
              16
            </div>

            <div className="h-full aspect-square text-left text-white">
              <DescribeSpacedRepetitionDiv />
            </div>

            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              17
            </div>
            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              18
            </div>
            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              19
            </div>
          </div>
        </div>

        <div className="mt-8 h-[350px] relative">
          <div className="absolute w-screen h-full flex items-center space-x-6 xl:-translate-x-[225px] lg:-translate-x-[500px] md:-translate-x-[750px]">
            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              21
            </div>
            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              22
            </div>
            <div
              className="border-t-4 border-t-white/30 border-b-2 border-b-sage-600 h-full aspect-square rounded-full bg-gradient-to-b from-green-600 to-sage-400 text-white flex items-center justify-center text-[20vh]"
              style={{
                boxShadow: "0px 0px 25px #4ade80BF, 0px 0px 70px #a8a868BF",
              }}
            >
              23
            </div>

            <div className="h-full aspect-square text-left text-white">
              <SpacedRepetitionCalendarDiv />
            </div>

            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              24
            </div>
            <div className="h-full aspect-square rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center text-[20vh] text-zinc-950">
              25
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 md:hidden flex flex-col space-y-4">
        <DescribeSpacedRepetitionDiv />
        <SpacedRepetitionCalendarDiv />
      </div>

      <div className="md:mt-24 mt-12 w-screen flex lg:flex-row flex-col">
        <div className="flex-1">
          <SecureThatDiv key={`fasodifjas`} />
          <div className="pr-px bg-gradient-to-b from-zinc-800 from-15% via-sky-300 to-zinc-800 to-85%">
            <div className="pt-px bg-gradient-to-r from-zinc-800 from-30% via-green-400 to-zinc-800 to-70% border-b border-zinc-800">
              <div className="bg-body w-full text-white xl:px-12 lg:px-8 px-4 py-8 text-left">
                <div className="flex flex-col space-y-2 relative">
                  <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden p-2 py-1.5 shadow-lg shadow-black/20 rounded-xl bg-gradient-to-b from-green-950 from-40% to-green-900 border border-green-600">
                    <p className="text-zinc-500 text-lg">A</p>
                    <p className="text-zinc-300 text-lg font-extralight font-mono">
                      print("Hello, world!")
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden p-2 py-1.5 shadow-lg shadow-black/20 rounded-xl bg-gradient-to-b from-zinc-800 from-40% to-zinc-900 border-t border-t-zinc-700">
                    <p className="text-zinc-500 text-lg">B</p>
                    <p className="text-zinc-300 text-lg font-extralight font-mono">
                      print(Hello, world!)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden p-2 py-1.5 shadow-lg shadow-black/20 rounded-xl bg-gradient-to-b from-red-950 from-40% to-red-900 border border-red-600">
                    <p className="text-zinc-500 text-lg">C</p>
                    <p className="text-zinc-300 text-lg font-extralight font-mono">
                      print: "Hello, world!"
                    </p>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-body/75 backdrop-blur-[2px] border border-zinc-800 p-3 rounded-xl">
                    <p className="text-base">
                      No worries, Ekya!
                      <br />
                      Let&apos;s review this question.
                    </p>
                  </div>
                </div>
                <h3 className="mt-4 text-xl mb-0">
                  Guided feedback on every question
                </h3>
                <p className="text-base font-extralight text-zinc-400 mt-0">
                  Codebyte provides professionally reviewed explanations for
                  every answer, with AI at your side to answer any follow-up
                  questions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col">
            <div className="flex-1 lg:pr-px pb-px lg:bg-gradient-to-b bg-gradient-to-r from-zinc-800 from-20% via-green-400 to-zinc-800 to-80%">
              <div className="h-full border-zinc-800 bg-body text-white text-left">
                <div className="xl:px-5 lg:px-2 px-1">
                  <div className="relative z-[3] bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 rounded-b-lg border border-zinc-800">
                    <div className="flex space-x-2 items-center">
                      <Image
                        src={"/people/ekya.png"}
                        width={32}
                        height={32}
                        className="rounded-full"
                        alt="ivan"
                      />
                      <div className="flex-1">
                        <p className="text-white font-normal text-base">
                          Passion project idea
                        </p>
                        <p className="text-sm font-extralight text-zinc-500">
                          I&apos;m Ekya, and I have an idea!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="backdrop-blur-sm relative z-[2] -translate-y-2 pt-3 bg-gradient-to-b from-green-950/50 from-40% to-green-900/50 px-2 py-1 rounded-b-lg border border-green-800">
                    <p className="text-xs text-green-600">
                      I&apos;ve completed my project!
                    </p>
                  </div>
                  <div className="backdrop-blur-sm relative z-[1] -translate-y-4 pt-3 bg-gradient-to-b from-cyan-950/50 from-40% to-cyan-900/50 px-2 py-1 rounded-b-lg border border-cyan-800">
                    <p className="text-xs text-cyan-600">
                      3 others gave feedback
                    </p>
                  </div>
                </div>

                <div className="xl:px-12 lg:px-8 px-4 pb-8 pt-0">
                  <h3 className="text-xl mb-0">
                    Get ideas & feedback for passion projects
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:pr-px pb-px bg-zinc-800">
              <div className="h-full bg-body text-white xl:px-12 lg:px-8 px-4 py-8 text-left">
                <div className="w-full flex items-center justify-center space-x-6">
                  <Image
                    src={"/people/ekya.png"}
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="ekya"
                  />

                  <div className="h-24 flex items-center justify-center bg-gradient-to-b from-white/5 to-white/10 border border-white/10 rounded-full aspect-square">
                    <div className="h-16 flex items-center justify-center bg-gradient-to-b from-white/5 to-white/10 border border-white/10 rounded-full aspect-square">
                      <div className="h-8 flex items-center justify-center bg-gradient-to-b from-white/5 to-white/10 border border-white/10 rounded-full aspect-square">
                        <div className="absolute h-[32px] flex items-center">
                          <MicrophoneInputDiv />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="size-[32px] border border-green-600 bg-gradient-to-b from-green-950/50 to-green-900/50 from-40% rounded-full flex items-center justify-center font-extralight text-green-600">
                    AI
                  </div>
                </div>

                <h3 className="text-xl mb-0">
                  Communicate effectively with interview training
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 lg:border-t-0 border-t border-zinc-800">
          <div className="pb-px bg-gradient-to-r from-zinc-800 from-30% via-sky-300 to-zinc-800 to-70%">
            <div className="xl:px-16 lg:px-12 md:px-8 px-4 py-4 bg-body">
              <h4 className="text-lg text-zinc-500">
                For <span className="text-sky-300">employers</span>
              </h4>
              <h2
                className="mt-4 lg:text-4xl md:text-3xl text-2xl pb-2 text-zinc-500 mb-0"
                style={{ textShadow: "0px 0px 20px rgb(0, 0, 0, 0.4)" }}
              >
                Foster{" "}
                <span
                  className="bg-gradient-to-r bg-clip-text text-transparent from-white via-sky-300 to-violet-300"
                  style={{ textShadow: "0px 0px 15px rgb(255, 255, 255, 0.4)" }}
                >
                  positive work environments
                </span>{" "}
                by
                <br />
                <span
                  className="bg-gradient-to-l bg-clip-text text-transparent from-white via-sky-300 to-violet-300"
                  style={{ textShadow: "0px 0px 15px rgb(255, 255, 255, 0.4)" }}
                >
                  assessing real-world scenarios
                </span>
              </h2>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col text-white">
            <div className="overflow-hidden relative text-left flex-1 lg:border-r border-zinc-800 xl:px-12 lg:px-8 px-4 py-8 pb-12">
              <div className="absolute z-0 w-1/3 aspect-square rounded-full blur-3xl bg-violet-300/40" />

              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 726 628"
                className="relative z-[1]"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="fillGradient"
                    x1="0%"
                    y1="0%"
                    x2="80%"
                    y2="80%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#38bdf840", stopOpacity: "1" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#00000000", stopOpacity: "1" }}
                    />
                  </linearGradient>

                  <linearGradient
                    id="strokeGradient"
                    x1="0%"
                    y1="0%"
                    x2="80%"
                    y2="80%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#38bdf899", stopOpacity: "1" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#00000000", stopOpacity: "1" }}
                    />
                  </linearGradient>
                </defs>

                <polygon
                  points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314"
                  fill="url(#fillGradient)"
                  stroke="url(#strokeGradient)"
                  stroke-width="3"
                  className="absolute"
                  style={{ boxShadow: "-10px -10px 24px rgb(255, 255, 255)" }}
                />

                <polygon
                  points="80,314 210,100 260,100 130,314 260,528 210,528"
                  fill="url(#fillGradient)"
                  stroke="url(#strokeGradient)"
                  stroke-width="3"
                  className="absolute"
                  style={{ boxShadow: "-10px -10px 24px rgb(255, 255, 255)" }}
                />

                <polygon
                  points="300,528 350,528 430,100 380,100"
                  fill="url(#fillGradient)"
                  stroke="url(#strokeGradient)"
                  stroke-width="3"
                  className="absolute"
                  style={{ boxShadow: "-10px -10px 24px rgb(255, 255, 255)" }}
                />
              </svg>

              <h2 className="text-xl">Assess technical skills</h2>
            </div>

            <div className="relative overflow-hidden text-left flex-1 lg:border-r border-t border-zinc-800 xl:px-16 lg:px-12 md:px-8 px-4 py-8 pb-12">
              <div className="absolute right-0 z-0 w-1/3 aspect-square rounded-full blur-3xl bg-amber-300/40" />

              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 726 628"
                className="relative z-[1]"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="fillGradient"
                    x1="0%"
                    y1="0%"
                    x2="80%"
                    y2="80%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#fb923c40", stopOpacity: "1" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#00000000", stopOpacity: "1" }}
                    />
                  </linearGradient>

                  <linearGradient
                    id="strokeGradient"
                    x1="0%"
                    y1="0%"
                    x2="80%"
                    y2="80%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#fb923c99", stopOpacity: "1" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#00000000", stopOpacity: "1" }}
                    />
                  </linearGradient>
                </defs>

                <polygon
                  points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314"
                  fill="url(#fillGradient)"
                  stroke="url(#strokeGradient)"
                  stroke-width="3"
                  className="absolute"
                  style={{ boxShadow: "-10px -10px 24px rgb(255, 255, 255)" }}
                />

                <polygon
                  points="80,314 210,100 260,100 130,314 260,528 210,528"
                  fill="url(#fillGradient)"
                  stroke="url(#strokeGradient)"
                  stroke-width="3"
                  className="absolute"
                  style={{ boxShadow: "-10px -10px 24px rgb(255, 255, 255)" }}
                />

                <polygon
                  points="300,528 350,528 430,100 380,100"
                  fill="url(#fillGradient)"
                  stroke="url(#strokeGradient)"
                  stroke-width="3"
                  className="absolute"
                  style={{ boxShadow: "-10px -10px 24px rgb(255, 255, 255)" }}
                />
              </svg>

              <h2 className="text-xl">Assess personality</h2>
            </div>
          </div>

          <div className="border-t border-zinc-800 text-white xl:px-12 lg:px-8 px-4 flex xl:flex-row flex-col gap-4 py-8">
            <div className="w-[300px] text-left bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-800 rounded-xl p-2">
              <p className="text-base text-zinc-400 mb-0 font-extralight">
                Situation #1
              </p>
              <h3 className="mt-0 font-normal text-white text-lg mb-0">
                Arrogant teammate
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Ekya will be in a mock meeting with{" "}
                <span className="text-red-500">Jacob</span>, our AI chatbot
                trained for arrogancy.{" "}
              </p>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl mb-0">Get to know your applicants</h3>
              <p className="text-base font-extralight text-zinc-400 mt-0">
                Successful programmers aren&apos;t just programmers --
                they&apos;re thinkers, creators, able to work well with others &
                work with the team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Button, user action */}
      <h1 className="md:mt-24 mt-12 xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-medium bg-gradient-to-b from-white to-zinc-200 text-transparent bg-clip-text">
        Ready for your first lesson?
      </h1>
      <h2 className="font-extralight xl:text-2xl lg:text-xl md:text-lg text-base text-zinc-500">
        Let&apos;s try out a command below to get you signed up!
      </h2>

      <div className="md:px-4 px-2 w-full flex flex-col items-center">
        <div className="relative rounded-xl xl:w-[70vw] lg:w-[80vw] md:w-[90vw] w-full md:aspect-video bg-[url('/bgs/sunset_mountains.jpg')] bg-cover">
          <div className="absolute left-[50%] -translate-x-1/2 top-[20%] md:w-[65%] text-left rounded-xl bg-gradient-to-b from-slate-900/70 to-slate-900/90 backdrop-blur-[2px] border border-slate-600 shadow-lg shadow-slate-700/70 p-3 font-mono">
            <div className="flex items-center space-x-1.5">
              <div className="size-3 rounded-full bg-slate-500" />
              <div className="size-3 rounded-full bg-slate-500" />
              <div className="size-3 rounded-full bg-slate-500" />
            </div>

            <p className="mt-2 m-0 my-0 mx-0 text-slate-200 md:text-base text-sm">
              <FontAwesomeIcon icon={faArrowRight} className="text-slate-500" />{" "}
              <span className="text-blue-500">codebyte</span>@
              <span className="text-emerald-500">new-account</span> $ sudo
              signup codebyte
            </p>

            <p className="m-0 my-0 mx-0 text-slate-200 md:text-base text-sm">
              Welcome to the Codebyte CLI! Let&apos;s sign you up below.
            </p>

            <div className="mt-4 flex flex-wrap gap-1">
              <p className="m-0 my-0 mx-0 text-slate-200 md:text-base text-sm">
                Email:
              </p>
              <input
                className="text-white rounded focus:outline-none md:text-base text-sm p-0 m-0 leading-none outline-white placeholder:text-opacity-50 bg-transparent"
                placeholder="Enter email here"
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              <p className="md:text-base text-sm m-0 my-0 mx-0 text-slate-200">
                Password:
              </p>
              <input
                className="text-white rounded focus:outline-none md:text-base text-sm p-0 m-0 leading-none outline-white placeholder:text-opacity-50 bg-transparent"
                placeholder="Enter email here"
                type="password"
              />
            </div>

            <button className="md:text-base text-sm mt-2 bg-slate-100 px-1.5 py-1 rounded text-slate-800">
              Create
            </button>
          </div>

          <div
            className="md:flex hidden bottom-2 absolute left-1/2 -translate-x-[50%] p-1 rounded-xl bg-white/20 border border-white/30 backdrop-blur-sm"
            style={{ boxShadow: "inset 0px 0px 3px rgb(255, 255, 255, 0.4)" }}
          >
            <div className="flex flex-col items-center justify-center font-semibold italic size-10 rounded-xl text-base border border-green-600 bg-gradient-to-b from-body to-green-950 text-green-400">
              C
            </div>
          </div>
        </div>
      </div>

      {/* Divide area here into sections <section> and have 1-2 column layout per section */}
      <section></section>
    </main>
  );
}

const SecureThatDiv = () => {
  const faangTimer = useFAANGAnimationTimer();

  return (
    <div className="pr-px bg-gradient-to-b from-body to-zinc-800">
      <div className="xl:px-16 lg:px-12 md:px-8 px-4 bg-body py-4">
        <h4 className="text-lg text-zinc-500">
          For <span className="text-green-300">employees</span>
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <h2
            className="mt-4 lg:text-4xl md:text-3xl text-2xl pb-2 text-zinc-500 mb-0 leading-none"
            style={{ textShadow: "0px 0px 20px rgb(0, 0, 0, 0.4)" }}
          >
            Secure that
          </h2>

          <div className="md:flex hidden flex-wrap items-center justify-center gap-2">
            <span
              className="leading-none lg:text-4xl md:text-3xl text-2xl md:py-0 py-1 px-2 bg-zinc-800 rounded-lg text-zinc-200 flex items-center w-fit"
              style={{
                boxShadow: "inset 0px 0px 5px rgb(255, 255, 255, 0.3)",
              }}
            >
              <Image
                src={`/logos/${FAANG[faangTimer].img}`}
                width={20}
                height={20}
                alt={FAANG[faangTimer].name}
                className="mr-2"
              />
              {FAANG[faangTimer].name}
            </span>

            <span
              className="lg:text-4xl md:text-3xl text-2xl text-zinc-500 mb-0 leading-none"
              style={{ textShadow: "0px 0px 20px rgb(0, 0, 0, 0.4)" }}
            >
              job
            </span>
          </div>
        </div>

        <div className="-translate-y-[2px] md:hidden flex items-center justify-center flex-wrap gap-1.5">
          <span
            className="leading-none lg:text-4xl md:text-3xl text-2xl md:py-0 py-1 px-2 bg-zinc-800 rounded-lg text-zinc-200 flex items-center w-fit"
            style={{
              boxShadow: "inset 0px 0px 5px rgb(255, 255, 255, 0.3)",
            }}
          >
            <Image
              src={`/logos/${FAANG[faangTimer].img}`}
              width={20}
              height={20}
              alt={FAANG[faangTimer].name}
              className="mr-2"
            />
            {FAANG[faangTimer].name}
          </span>

          <span
            className="lg:text-4xl md:text-3xl text-2xl text-zinc-500 mb-0 leading-none"
            style={{ textShadow: "0px 0px 20px rgb(0, 0, 0, 0.4)" }}
          >
            job
          </span>
        </div>

        <h2
          className="lg:text-4xl md:text-3xl text-2xl pb-2 text-zinc-500 leading-none mb-0"
          style={{ textShadow: "0px 0px 20px rgb(0, 0, 0, 0.4)" }}
        >
          <span
            className="bg-gradient-to-l bg-clip-text text-transparent from-white via-green-300 to-sage-300"
            style={{ textShadow: "0px 0px 15px rgb(255, 255, 255, 0.4)" }}
          >
            you&apos;ve always dreamed of
          </span>
        </h2>
      </div>
    </div>
  );
};

const MicrophoneInputDiv = () => {
  return (
    <div className="flex items-center space-x-0.5">
      {new Array(30).fill(0).map((x, index) => (
        <motion.div
          key={index}
          className="rounded-full bg-green-400 w-0.5"
          initial={{ height: 3 }}
          animate={{ height: [3, Math.random() * 32, 3] }}
          transition={{ repeat: Infinity, delay: index / 10 }}
        />
      ))}
    </div>
  );
};

const DescribeSpacedRepetitionDiv = () => {
  return (
    <>
      <h2 className="text-2xl font-light text-zinc-500">
        Your new{" "}
        <span
          className="bg-gradient-to-r bg-clip-text text-transparent from-white via-green-300 to-sage-300"
          style={{ textShadow: "0px 0px 5px rgb(255, 255, 255, 0.5)" }}
        >
          spaced repetition
        </span>{" "}
        learning schedule
      </h2>
      <h3 className="font-extralight text-zinc-500">
        Spaced repetition is how your brain actually retains the information
        you&apos;ve learned. You review what you learned{" "}
        <span className="text-zinc-200">1 day later</span>,{" "}
        <span className="text-zinc-200">3 days later</span>,{" "}
        <span className="text-zinc-200">7 days later</span>, and then{" "}
        <span className="text-zinc-200">16 days later</span>.
      </h3>
      <h3 className="mt-2 font-extralight text-zinc-500">
        This process of "spaced out" review ensures you strengthen the neurons
        in your brain, to recall information better.
      </h3>
    </>
  );
};

const SpacedRepetitionCalendarDiv = () => {
  return (
    <>
      <h2 className="text-2xl font-light text-zinc-500">
        <span
          className="bg-gradient-to-r bg-clip-text text-transparent from-white via-green-300 to-sage-300"
          style={{ textShadow: "0px 0px 5px rgb(255, 255, 255, 0.5)" }}
        >
          Codebyte does all the planning for you
        </span>
      </h2>
      <h3 className="mt-2 font-extralight text-zinc-500">
        We manage the scheduling details, so you can focus on learning.
      </h3>
      <div className="text-sm text-zinc-500 flex flex-col space-y-3">
        {calendar[7].map((week: any, i: number) => {
          return (
            <div className="flex" key={i}>
              {week.map((day: any) => {
                const daystr = day.toString();

                const final = day
                  .toString()
                  .replace("beforeMonth_", "")
                  .replace("afterMonth_", "");

                const disabled =
                  daystr.includes("beforeMonth_") ||
                  daystr.includes("afterMonth_");

                const selected =
                  daystr === "12" ||
                  daystr === "13" ||
                  daystr === "16" ||
                  daystr === "23";

                const dateIsBetweenTwoLearningDates =
                  (day > 13 && day < 16) || (day > 16 && day < 23);

                return (
                  <button
                    key={i}
                    className={`text-sm flex-1 disabled:opacity-40 ${
                      selected && "text-green-400"
                    } ${dateIsBetweenTwoLearningDates && "text-zinc-300"}`}
                    disabled={disabled}
                  >
                    {final}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
