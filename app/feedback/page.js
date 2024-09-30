"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../appContext";
import styles from "./page.module.css"; // Import the CSS module

export default function Feedback() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState("");

  const sendFeedback = async (event) => {
    const formData = new FormData(event.target);
    
    const response = await appContext.notifyWebhook(formData.get('name'),formData.get('email'),formData.get('feedback'));
  
    const responseText = await response.message; // Get the raw response text
    console.log('Raw response:', responseText);
  
    try {
      
      console.log(responseText);
      setApiResponse(responseText);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setApiResponse('Error parsing server response.');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendFeedback(event);
    // setApiResponse("Thank you for your feedback!");
    event.target.reset();
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackContent}>
        <div className={styles.feedbackHeader}>
          <h2>{"Feedback for edCode"}</h2>
        </div>
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
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
            name="feedback"
            placeholder="Your Feedback"
            required
            rows={4}
            className={styles.formTextarea}
          />
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/dashboard");
            }}
            className={styles.backButton}
          >
            Back to Dashboard
          </button>
        </form>
        {apiResponse && (
          <span className={styles.apiResponse}>{apiResponse}</span>
        )}
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
}