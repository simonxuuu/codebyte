"use client";

import { useContext } from "react";
import { AppContext } from "../../../appContext";
import {
  faAngleRight,
  faArrowTrendUp,
  faChalkboard,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const pages = [
  {
    icon: faHome,
    name: "Home",
    link: "/dashboard",
  },
  {
    icon: faChalkboard,
    name: "Courses",
    link: "/dashboard/courses",
  },
  {
    icon: faArrowTrendUp,
    name: "Leaderboard",
    link: "/dashboard/courses",
  },
];

const bottomPages = [
  {
    icon: faQuestionCircle,
    name: "Feedback",
    link: "/feedback",
  },
];

export default function Sidebar() {
  const appContext = useContext(AppContext);

  return (
    <section className="sticky top-0 xl:w-[20%] lg:w-[25%] md:w-[30%] w-fit bg-black border-r border-r-zinc-800">
      <div className="p-2 flex flex-col space-y-2 h-full">
        <Link href="/dashboard/profile">
          <div className="bg-zinc-900 border-t border-t-zinc-800 rounded-xl p-2 text-sm text-zinc-200">
            <div className="flex items-center space-x-2">
              <div className="size-6 rounded-full bg-zinc-800" />
              <div className="flex-col md:flex hidden">
                <span>{appContext.email}</span>
                <span className="text-xs font-light text-zinc-400">
                  Free tier
                </span>
              </div>
            </div>
          </div>
        </Link>

        {pages.map((x, i) => {
          return (
            <Link href={x.link} key={`fasoidjfoasifre=${i}`} legacyBehavior>
              <button
                key={`fasdffansdfuaosnfa=${i}`}
                className={`text-left flex items-center justify-center space-x-2 text-zinc-400 font-normal p-2 py-1 rounded-xl hover:bg-zinc-900 transition-colors`}
              >
                <span className="md:w-5">
                  <FontAwesomeIcon icon={x.icon} className="text-zinc-600" />
                </span>
                <span className="flex-1 md:block hidden">{x.name}</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-zinc-700 md:block hidden"
                />
              </button>
            </Link>
          );
        })}

        <div className="flex-1" />

        {bottomPages.map((x, i) => {
          return (
            <button
              key={`fasdffansdfuaosnfa=${i}`}
              className={`text-left flex items-center justify-center gap-2 text-zinc-400 font-normal p-2 py-1 rounded-xl hover:bg-zinc-900 transition-colors`}
            >
              <span className="md:w-5">
                <FontAwesomeIcon icon={x.icon} className="text-zinc-600" />
              </span>
              <span className="flex-1 md:block hidden">{x.name}</span>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-zinc-700 md:block hidden"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
