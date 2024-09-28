// courtiq/app/layout.js
import Link from "next/link";
import "../styles/globals.css";
import "../styles/hamburgers.css";
import "./dashboard/dashboard.css";
import TopBar from "./topBar";
import Footer from "./footer";
import Head from "next/head";
import { AppProvider } from "./appContext";

export const metadata = {
  title: "edCode",
  description:
    "edCode is the easiest way to learn how to code. Learn everything you will need, from any device, anytime, anywhere.",
  keywords: "edCode, learn to code reddit, w3schools python, python deep learning w3schools, factorial python, best way to learn python programming, learn java programming for beginners, coding learning for beginners, tynker learn to code, software engineer learning, learn to code for free, how to learn computer programming for free, object oriented software engineering, python beginner practice problems, coding learning websites, gamified coding, gamified coding learning, python coding learning online, python beginner course, code learn org, duolingo coding, how to start learning coding, how to learn to code, how to learn to code ai, how do i learn to code, how to learn to code fast, how to learn to write code in python, how to learn a coding language, how to learn coding at home for free, how to learn to code html",
  og: {
    image: "/socialmedia2.png"
  }
 
};

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export default function Layout({ children }) {
  return (
    <AppProvider>
      <html>
        
        <body>
        <div className="fadeTransition"></div>
          <TopBar />
          {children}
          <Footer />
        </body>
      </html>
    </AppProvider>
  );
}
