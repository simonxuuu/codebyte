"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function PricingHome() {
  const [timeframe, setTimeframe] = useState("Monthly");

  return (
    <div>
      <div
        className="pb-px bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(90deg, #18181b 20%, #0ea5e9 35%, #4ade80 50%, #818cf8 65%, #18181b 80%)`,
        }}
      >
        <div className='relative bg-gradient-to-t from-body to-sky-950/70 backdrop-blur-xl className="lg:px-[10vw] md:px-[5vw] px-4 py-12 pb-24 pt-[200px] flex flex-col items-center text-center'>
          <div
            className="absolute left-[15%] top-32 bg-gradient-to-b from-rose-400 to-rose-600 w-[70px] h-[60px] p-1 rounded-xl flex -skew-y-6 -skew-x-2"
            style={{
              boxShadow: "5px 5px 12px #f43f5e, 17px 17px 36px #e879f9",
            }}
          >
            <span className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-3xl text-white flex items-center justify-center">
              <FontAwesomeIcon icon={faCode} />
            </span>
          </div>

          <h1
            style={{ textShadow: "0px 0px 10px rgb(255, 255, 255, 0.5)" }}
            className="xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-medium"
          >
            Hack your learning with
            <br />
            Silicon Valley&apos;s best teachings
          </h1>

          <div
            className="-z-10 absolute bottom-12 right-[10%] mx-4 bg-gradient-to-b from-cyan-500 to-sky-600 w-[85px] h-[75px] p-1 rounded-xl flex skew-y-6 skew-x-2"
            style={{
              boxShadow: "-5px -5px 12px #22d3ee, -24px -24px 48px #34d3995F",
            }}
          >
            <span className="outline outline-2 outline-white/50 bg-white/20 w-full h-full rounded-lg text-4xl text-white flex items-center justify-center">
              <FontAwesomeIcon icon={faQuestion} />
            </span>
          </div>
        </div>
      </div>

      <div className='className="lg:px-[10vw] md:px-[5vw] px-4 py-12 flex flex-col items-center text-center'>
        <div className="flex items-center space-x-1 mt-8 p-1 bg-zinc-900 border border-zinc-800 rounded-full shadow shadow-zinc-700/10">
          <button
            className={`px-4 h-8 rounded-full font-normal flex items-center ${
              timeframe === "Monthly"
                ? "bg-green-400 text-black"
                : "text-zinc-400"
            } hover:opacity-50 transition`}
            onClick={() => setTimeframe("Monthly")}
          >
            Monthly
          </button>

          <button
            className={`px-4 h-8 rounded-full font-normal flex items-center ${
              timeframe === "Yearly"
                ? "bg-green-400 text-black"
                : "text-zinc-400"
            } hover:opacity-50 transition`}
            onClick={() => setTimeframe("Yearly")}
          >
            <span
              className={`${
                timeframe === "Yearly" ? "text-black" : "text-green-400"
              } text-xs mr-1`}
            >
              Save 20%
            </span>{" "}
            Yearly
          </button>
        </div>

        <div className="mt-12 w-full flex justify-center gap-3 h-[400px]">
          <div className="relative lg:w-[300px] w-full shadow-lg shadow-zinc-800/10 flex flex-col rounded-xl">
            <div className="border border-b-0 border-zinc-800 bg-zinc-900 p-3 rounded-t-xl text-left">
              <div className="flex items-center gap-2">
                <p className="text-lg">Basic</p>
              </div>
              <h2 className="mt-3 text-4xl font-normal">Free</h2>
              <p className="text-base">Insert description here soon.</p>
              <button className="mt-2 text-lg px-2 py-1.5 rounded-lg bg-zinc-800 text-zinc-100 border-t border-t-zinc-700 shadow shadow-black/30 w-full">
                Get started
              </button>
            </div>

            <div className="flex-1 border border-zinc-700 bg-zinc-800 p-3 rounded-b-xl text-left">
              <ul>
                <li>todo</li>
              </ul>
            </div>
          </div>

          {/* premium */}
          <div className="scale-[1.1] mx-4 relative lg:w-[300px] w-full shadow-lg shadow-zinc-800/10 flex flex-col rounded-xl">
            <div className="border border-b-0 border-amber-900 bg-gradient-to-b from-body to-amber-950/50 p-3 rounded-t-xl text-left">
              <div className="flex items-center gap-2">
                <p className="text-lg">Premium</p>
              </div>
              <h2 className="mt-3 text-4xl font-normal">$10</h2>
              <p className="text-base">Insert description here soon.</p>
              <button
                className="mt-2 text-lg px-2 py-1.5 rounded-lg bg-gradient-to-b from-amber-600 to-amber-700 border-t border-t-amber-500 shadow-md shadow-amber-400/20 w-full"
                style={{ textShadow: "0px 0px 2px #fef3c7BF" }}
              >
                Get started
              </button>
            </div>

            <div className="relative flex-1 border border-amber-800 bg-amber-800/40 p-3 rounded-b-xl text-left">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent from-30% via-50% to-70%" />
              <ul>
                <li>todo</li>
              </ul>
            </div>
          </div>

          {/* school */}
          <div className="relative lg:w-[300px] w-full shadow-lg shadow-zinc-800/10 flex flex-col rounded-xl">
            <div className="border border-b-0 border-green-900 bg-gradient-to-b from-body to-green-950/50 p-3 rounded-t-xl text-left">
              <div className="flex items-center gap-2">
                <p className="text-lg">Schools</p>
              </div>
              <h2 className="mt-3 text-4xl font-normal flex items-start">
                $8
                <span className="text-2xl ml-1.5 -translate-y-1">per user</span>
              </h2>
              <p className="text-base">Insert description here soon.</p>
              <button
                className="mt-2 text-lg px-2 py-1.5 rounded-lg bg-gradient-to-b from-green-600 to-green-700 border-t border-t-green-500 shadow-md shadow-green-400/20 w-full"
                style={{ textShadow: "0px 0px 2px #fef3c7BF" }}
              >
                Get started
              </button>
            </div>

            <div className="relative flex-1 border border-green-800 bg-green-800/40 p-3 rounded-b-xl text-left">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent from-30% via-50% to-70%" />
              <ul>
                <li>todo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
