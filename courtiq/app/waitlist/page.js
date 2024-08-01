"use client"

import React, { useState,} from 'react';

export default function Waitlist() {
  const [apiResponse, setApiResponse] = useState('');

  const submitEmail = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      const response = await fetch("https://courtiq-801992a10bd9.herokuapp.com/submit-email", {
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
    <main>
      <h2>CourtIQ is launching soon,</h2>
      <h3>join the wait list to become world class — with AI.</h3>
      <form className="emailForm" onSubmit={submitEmail}>
        <input type="email" name="email" placeholder="your.email@email.com" required className="special-button" />
        <button type="submit" className="special-button">Submit</button>
      </form>
      <span className="apiResponse">{apiResponse}</span>
    </main>
  );
}