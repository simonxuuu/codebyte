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
    "edCode teaches you more than coding. Learn everything that you need for the software industry.",
};

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export default function Layout({ children }) {
  return (
    <AppProvider>
      <html>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
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
