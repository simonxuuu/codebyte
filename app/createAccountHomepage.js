"use client";

import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import { createUserWithEmailAndPassword } from "./firebaseconfig";
import { auth } from "./firebaseconfig";
import { useRouter } from "next/navigation";
export default function CreateAccountHomepage() {
  const [apiResponse, setApiResponse] = useState("");
  const router = useRouter();
  const submitRegister = async (event) => {
    //This function gets ran when a user creates an account.
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //created a firebase account

        // creating mongoDB info + account validation
        //console.log(JSON.stringify({ email,uid: result.user.uid }));
        fetch("https://codebyte-1b9af19e473e.herokuapp.com/create-account", {
          method: "POST",
          body: JSON.stringify({ email, uid: result.user.uid }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            if (text == "Success") {
              setApiResponse("Account created!");
              console.log("created successfully.");
              router.push("/dashboard");
            } else if (text == "Server Error" || text == "UID not found") {
              setApiResponse("Server error.");
            }
          });
      })
      .catch((error) => {
        setApiResponse("Error with account creation");
        if (
          error.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setApiResponse(
            "Weak password. Make your password longer than 5 characters."
          );
        } else if (
          error.message == "Firebase: Error (auth/email-already-in-use)."
        ) {
          setApiResponse("Account already exists.");
        }
        console.log(error.message);
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form className="createAccHomepageForm" onSubmit={submitRegister}>
        <input
          type="email"
          name="email"
          placeholder="your_unique_email@email.com"
          required
          className="button"
        />
        <input
          type="password"
          name="password"
          placeholder="youruniquepass$182"
          required
          className="button"
        />

        <button type="submit" className="button">
          Register
        </button>
      </form>
      <span className="api-response">{apiResponse}</span>
    </div>
  );
}
