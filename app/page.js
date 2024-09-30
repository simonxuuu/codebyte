"use client";
import { Gradient } from "whatamesh";
import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoltLightning,
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
  useEffect(()=>{const gradient = new Gradient();gradient.initGradient("#gradient-canvas");},[])
  
  
  return (
    <section>
      <div
      style={{marginBottom:'315px'}}
        className="pb-px  h-[90vh]"
        
      >
        <canvas id='gradient-canvas' className="h-full absolute lg:px-[10vw] md:px-[5vw] px-4 py-12 pb-24 pt-[200px] flex flex-col items-center justify-center text-center"></canvas>
        
        <div style={{ overflowY: 'visible' }} className="h-full relative lg:px-[10vw] md:px-[5vw]  px-4 py-12 pb-24 pt-[200px] flex flex-col items-center justify-center text-center">
        <h1
            className="mt-4 drop-shadow-md xl:text-7xl leading-12 lg:text-7xl md:text-6xl text-5xl font-medium "
          >
            The fun way to learn to code,
            <br />
            or prepare for that interview.
          </h1>

  <p style={{ fontWeight: 300, color: 'var(--white)' }} className="my-4 mb-0 xl:text-xl lg:text-lg md:text-base">
    edCode is for 
    <strong style={{ fontWeight: '400' }} className="mx-1">
       everyone,
    </strong>
    from beginners to experts. 
  </p>

  <p style={{ fontWeight: 300, color: 'var(--white)' }} className="my-4 mt-0 xl:text-xl lg:text-lg md:text-base">
    Learn to code, or prepare to land your dream job with our  <strong style={{ fontWeight: '400' }} className="underline mx-1 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">AI interview prep.</strong>
  </p>
  <Link href="/register">
    <button
      style={{ fontWeight: 600, backgroundColor: 'var(--light)', color: 'var(--darkCharcoal)' }}
      className="text-xl md:w-fit w-full mt-8 px-7 py-2 rounded-xl"
    >
      Get started
    </button>
  </Link>

  <Link href="/waitlist">
            <button
            style={{fontWeight:600,backgroundColor:'var(--light)',color:'var(--darkCharcoal)'}}
              className="text-xl md:w-fit w-full mt-8 px-7 py-2 rounded-xl "
              
            >
              AI Interview Prep
            </button>
          </Link>

          

          
        </div>
      </div>
      <div className="verticalSection">
        <h1>Free, fun, and <span className='customUnderlineGreen' style={{color:'var(--tealGreen)'}}>easy.</span></h1>
        <h2 style={{color:'var(--grey)'}}>This is the way learning to code should be. Learn on any device, anytime, anywhere.</h2>
      </div>
      <div id='landing0'className="horizontalSection">
        <div >
            <h2 style={{maxWidth: '100%',fontWeight:500}} className="mt-4 mb-0 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              Go from
              <br />
              <span
                style={{color:'var(--green)' }}
                className="font-mono "
              >
                print("Hello, world!")
              </span>
              <br />
              to building for the world
            </h2>
            <h3 className="mt-4 xl:text-2xl lg:text-xl md:text-lg text-base font-light text-white/70">
              Handcrafted programming lessons take you from zero to hero, each step of the way.
            </h3>
            </div>
            <div style={{backgroundImage:'url(/coursePicture.png)'}}className="showcaseImage"></div>
            
      </div>

     

      <div className="verticalSection">
        <h1>Self-paced courses</h1>
        <h2 style={{color:'var(--grey)'}}>Learn at your own pace. Courses are designed to have <span style={{color:'var(--teal)'}}>natural progression</span>, so you won't feel overwhelmed.</h2>
      </div>

      <div id='landing1' className="horizontalSection">
        <div style={{maxWidth:'600px'}}>
        <h2 style={{maxWidth: '100%'}} className="mt-4 mb-0 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              Stay motivated with a dynamic leaderboard, friends, and more.
            </h2>
           
            <h3 className="mt-4 xl:text-2xl lg:text-xl md:text-lg text-base font-light text-white/70">
              We think learning should not be a chore, it should be fun. Compete with friends, climb the leaderboard rankings, and gain certificates for every course you complete. <span  style={{fontSize:'0.9rem',opacity:0.7}}>*friends coming soon</span>
            </h3>
        </div>
        <div style={{backgroundImage:'url(/ss4.png)'}}className="showcaseImage"></div>
      </div>

      <div id='landing2' className="horizontalSection">
      <div className="w-full h-20 flex items-center justify-center space-x-6">
                 
                        <MicrophoneInputDiv/>
                        
                </div>
        <div style={{maxWidth:'600px'}}>
        <h2 style={{maxWidth: '100%'}} className="mt-4 mb-0 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              Interview Preparation
            </h2>
           
            <h3 className="mt-4 xl:text-2xl lg:text-xl md:text-lg text-base font-light text-white/70">
              Chat with our AI, Codee, for practice interviews, or feedback on your code. <Link href="/waitlist">
        Get your spot on our exclusive waitlist, there are limited spots remaining.
      </Link>
            </h3>
        </div>
       
      </div>
    
      <div className="verticalSection">
        <h1>For Educators</h1>
        
      </div>
      <div id='landing3' className="horizontalSection">
      <div style={{backgroundImage:'url(/courses0.png)'}}className="showcaseImage"></div>
        <div style={{maxWidth:'600px'}}>
        <h2 style={{maxWidth: '100%'}} className="mt-4 mb-0 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              Create custom, interactive courses
            </h2>
           
            <h3 className="mt-4 xl:text-2xl lg:text-xl md:text-lg text-base font-light text-white/70">
              Our course creator allows you to create custom courses for your students, owned by you. 
             <span  style={{fontSize:'0.9rem',opacity:0.7}}> *coming soon</span>
            </h3>
        </div>
        
      </div>

      

     
      {/* Waitlist Button, user action */}
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <h1 className="md:mt-24 mt-12 xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-medium bg-gradient-to-b from-white to-zinc-200 text-transparent bg-clip-text">
          Ready for your first course?
        </h1>
        <h2 className="font-base xl:text-2xl lg:text-xl md:text-lg text-base text-zinc-300">
          Join our growing community of learners.
        </h2>

        <div className="md:px-4 px-2 w-full flex flex-col items-center">
          <div className="relative rounded-xl xl:w-[60vw] lg:w-[80vw] md:w-[90vw] w-full h-[500px]  bg-[url('/bgs/sunset_mountains.jpg')] bg-cover">
            <div className="absolute left-[50%] -translate-x-1/2 top-[20%] md:w-[65%] w-[90%] text-left rounded-xl bg-gradient-to-b from-slate-900/70 to-slate-900/90 backdrop-blur-[2px] border border-slate-600 shadow-lg shadow-slate-700/70 p-3 font-mono">
              <div className="flex items-center space-x-1.5">
                <div className="size-3 rounded-full bg-slate-500" />
                <div className="size-3 rounded-full bg-slate-500" />
                <div className="size-3 rounded-full bg-slate-500" />
              </div>

              <p className="mt-2 m-0 my-0 mx-0 text-slate-200 md:text-base text-sm">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-slate-500"
                />{" "}
                <span className="text-blue-500">edCode</span>@
                <span className="text-emerald-500">new-account</span> $ sudo
                signup edCode
              </p>

              <p className="m-0 my-0 mx-0 text-slate-200 md:text-base text-sm">
                Welcome to the edCode CLI! Let&apos;s sign you up below.
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

              <button onClick={()=>{router.push('/register')}} className="md:text-base text-sm mt-2 bg-slate-100 border-t border-white px-1.5 py-1 rounded-lg text-slate-800">
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
      </div>

      {/* Divide area here into sections <section> and have 1-2 column layout per section */}
      <section></section>
    </section>
  );
}



const MicrophoneInputDiv = () => {
  return (
    <div className="flex items-center space-x-0.5 micDemo">
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
          className="bg-gradient-to-r bg-clip-text text-transparent from-white via-green-300 to-teal-300"
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


