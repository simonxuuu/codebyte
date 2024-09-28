"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../appContext";

export default function Feedback() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState("");

  const sendFeedback = async (event) => {
    const formData = new FormData(event.target);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
  
    const responseText = await response.text(); // Get the raw response text
    console.log('Raw response:', responseText);
  
    try {
      const data = JSON.parse(responseText); // Parse the response text as JSON
      console.log(data);
      setApiResponse(data.res);
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
    <div className="flex flex-col items-center p-2 m-0 h-[100vh] pt-24">
      <div className="basis-full flex-none xl:w-[20%] lg:w-[50%] md:w-[90%] w-full text-center flex flex-col items-center justify-center">
        <div className="">
          <h2 className="text-2xl mb-0 font-medium">{"Feedback for edCode"}</h2>
        </div>
        <form
          className="mt-8 flex flex-col gap-2 w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-900 border border-zinc-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-900 border border-zinc-700"
          />
          <textarea
            name="feedback"
            placeholder="Your Feedback"
            required
            rows={4}
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-900 border border-zinc-700 resize-none"
          />
          <button
            type="submit"
            className="focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full bg-zinc-100 border border-transparent text-zinc-800"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/dashboard");
            }}
            className="text-sm mt-2 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-zinc-800 text-zinc-500"
          >
            Back to Dashboard
          </button>
        </form>
        {apiResponse && (
          <span className="text-sm mt-8 focus:outline-white placeholder:text-zinc-500 rounded-lg p-3 py-2 w-full border border-green-900 bg-green-900/10 text-green-600">
            {apiResponse}
          </span>
        )}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
