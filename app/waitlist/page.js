"use client"
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./waitlist.module.css";
import { AppContext } from "../appContext";

const WaitlistPage = () => {
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState("");
  const appContext = useContext(AppContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!appContext.loggedIn) {
        setApiResponse("You must be logged in to join the waitlist.");
        return;
    }
    
    try {
      const response = await fetch(`${window.location.origin}/api/waitlist`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setApiResponse(data.message || "Thank you for joining our waitlist!");
      event.target.reset();
    } catch (error) {
      console.error('Error:', error);
      setApiResponse('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.waitlistContainer}>
      <div className={styles.waitlistContent}>
        <div className={styles.waitlistHeader}>
          <h2 className={styles.waitlistHeader}>Join the AI Interview Waitlist</h2>
        </div>
        <form className={styles.waitlistForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className={styles.formInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className={styles.formInput}
          />
          <textarea
            name="experience"
            placeholder="Tell us about your interview preparation experience"
            className={styles.formTextarea}
          />
          <button type="submit" className={styles.submitButton}>
            Join Waitlist
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className={styles.backButton}
          >
            Back to Home
          </button>
        </form>
        {apiResponse && (
          <span className={styles.apiResponse}>{apiResponse}</span>
        )}
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
};

export default WaitlistPage;