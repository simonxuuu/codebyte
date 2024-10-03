"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import styles from "./positions.module.css";
import { AppContext } from "../appContext";

const PositionsPage = () => {
  const router = useRouter();
  const [positions, setPositions] = useState([]);
  const [apiResponse, setApiResponse] = useState("");
  const appContext = useContext(AppContext);

  useEffect(() => {
    // Temporary placeholder data
    const placeholderPositions = [
      {
        title: "Frontend Developer",
        description: "We're looking for a skilled frontend developer with experience in React and Next.js to join our team."
      },
      {
        title: "Full Stack Developer",
        description: "Join our team as a full stack developer. Experience with React, Node.js, and database management required."
      },
      {
        title: "UI/UX Designer",
        description: "We need a creative UI/UX designer to help create intuitive and visually appealing user interfaces for our products."
      },
      {
        title: "Social Media Marketer",
        description: "Looking for a skilled Social Media Marketer to improve SEO, increase web traffic, and grow our social media accounts."
      },
      {
        title: "Data Scientist",
        description: "Join our data science team to help analyze and interpret complex data sets and develop machine learning models."
      }
    ];

    // Simulating API call delay
    setTimeout(() => {
      setPositions(placeholderPositions);
    }, 1000);
  }, []);

  return (
    <div className={styles.positionsContainer}>
      <div className={styles.positionsContent}>
        <div className={styles.positionsHeader}>
          <h2>Available Job Positions</h2>
        </div>
        <div className={styles.positionsList}>
          {positions.length > 0 ? (
            positions.map((position, index) => (
              <div key={index} className={styles.positionItem}>
                <h3>{position.title}</h3>
                <p>{position.description}</p>
              </div>
            ))
          ) : (
            <p className={styles.loadingText}>Loading positions...</p>
          )}
        </div>
        <span className={styles.contactText}>
            Contact us at <Link href="https://www.linkedin.com/company/edcodeapp/" target="_blank">EdCode</Link> for more information.
        </span>
        <button
          type="button"
          onClick={() => router.push("/")}
          className={styles.backButton}
        >
          Back to Home
        </button>
        {apiResponse && (
          <span className={styles.apiResponse}>{apiResponse}</span>
        )}
      </div>
    </div>
  );
};

export default PositionsPage;