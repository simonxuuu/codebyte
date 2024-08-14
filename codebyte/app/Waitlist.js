"use client";

import React, { useState, useEffect } from 'react';
import '../styles/globals.css';

export default function Waitlist() {
  const [apiResponse, setApiResponse] = useState('');

  const submitEmail = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      const response = await fetch("https://codebyte-1b9af19e473e.herokuapp.com/submit-email", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-type": "application/json"
        }
      });

      if (response.status === 204 || response.status === 201) {
        setApiResponse("Thank you for joining the waitlist! We'll notify you when we launch.");
      } else if (response.status === 400) {
        setApiResponse("Sorry, that doesn't look like a valid email address.");
      } else if (!response.ok) {
        throw new Error("We're having an issue on our end, try again later.");
      } else {
        const json = await response.json();
        setApiResponse(json.message || "Email submitted successfully!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setApiResponse("An error occurred. Please try again.");
    }
  };

  return (
    <div className="waitlist-container">
      <form className="email-form" onSubmit={submitEmail}>
        <input type="email" name="email" placeholder="your.email@email.com" required className="button" />
        <button type="submit" className="button ">Submit</button>
      </form>
      <span className="api-response">{apiResponse}</span>
    </div>
  );
}