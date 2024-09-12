"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faFire,
  faLaughSquint,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AppContext } from "../../appContext";
import { useRouter } from "next/navigation";
import { auth, signOut } from "../../firebaseconfig";

export default function ProfileModal({
  closeModalAction,
}: {
  closeModalAction: Function;
}) {
  const [modalOpen, setModalOpen] = useState(true); // for modal animation
  const appContext = useContext(AppContext);
  const modalRef = useRef(null);
  const router = useRouter();

  // handling animation for modal closing
  const fullCloseModalAction = () => {
    setModalOpen(false);
    setTimeout(() => {
      closeModalAction();
    }, 500);
  };

  useLayoutEffect(() => {
    function handleClickOutside(event) {
      console.log(modalRef.current);
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        fullCloseModalAction();
      }
    }

    function handleKeyPress(event) {
      if (event.key === "Escape") {
        fullCloseModalAction();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function signout() {
    signOut(auth)
      .then((result) => {
        console.log("Signed out success.");
        fullCloseModalAction();
        router.push("/");
        appContext.setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-50 fixed bg-black/50 backdrop-blur-[2px] top-0 left-0 w-screen h-screen flex items-center justify-center px-2"
        >
          <motion.div
            initial={{
              scale: 0.85,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0.85,
            }}
            transition={{
              type: "tween",
            }}
            ref={modalRef}
            className="h-full w-full flex flex-col items-center justify-center px-2"
          >
            <div className="rounded-xl bg-zinc-800  flex xl:w-1/2 lg:w-3/4 w-full">
              <div className="scale-[1.1] bg-zinc-700 rounded-xl w-[40%] flex flex-col items-center justify-center p-2">
                <FontAwesomeIcon
                  icon={faLaughSquint}
                  className="text-4xl text-amber-400"
                />
                <p className="mt-2 text-sm my-0 py-0 text-zinc-400 italic">
                  Profile customization is coming soon!
                </p>
              </div>
              <div className="flex-1 p-4 pl-8">
                <div className="flex items-start gap-2">
                  <h3 className="flex-1 text-xl font-medium my-0 py-0 leading-none">
                    {appContext.email}
                  </h3>
                  <button>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-xl text-zinc-400"
                      onClick={() => fullCloseModalAction()}
                    />
                  </button>
                </div>
                <p className="mt-2 text-base font-normal text-zinc-300 my-0 py-0 leading-none">
                  {appContext.pricingPlan} plan
                </p>
                <p className="mt-4 text-base font-normal text-zinc-400 my-0 py-0 leading-none">
                  Your statistics
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    {
                      stat: "Your bytes",
                      icon: faStar,
                      background:
                        "bg-gradient-to-b from-green-400 to-teal-400 border-t-2 border-t-green-300 text-green-950 font-medium",
                      value: `${appContext.bytes} bytes`,
                    },
                    {
                      stat: "Your streak",
                      icon: faFire,
                      background:
                        "bg-gradient-to-b from-orange-400 to-red-400 border-t-2 border-t-orange-300 text-orange-950 font-medium",
                      value: `${appContext.streak} days`,
                    },
                    {
                      stat: "Completed courses",
                      icon: faFire,
                      background:
                        "bg-gradient-to-b from-zinc-600 to-zinc-700 border-t-2 border-t-zinc-500 text-zinc-300 font-medium",
                      value: `${appContext.streak} days`,
                    },
                  ].map((x, i) => {
                    return (
                      <div
                        key={`foiasjdfiasgr=${i}`}
                        className={`${x.background} p-2 rounded-xl w-[175px]`}
                      >
                        <p className="text-lg my-0 py-0 leading-none">
                          <FontAwesomeIcon icon={x.icon} className="mr-2" />
                          {x.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <hr className="border-zinc-700 my-4" />
                <button
                  onClick={() => {
                    signout();
                  }}
                  className="w-full my-0 bg-red-500 border-t border-red-400 px-2 py-1.5 rounded-lg text-red-950 text-base font-normal"
                >
                  Log out
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
