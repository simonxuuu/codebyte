"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../appContext';

export default function Page() {
    const appContext = useContext(AppContext);
    const [email, setEmail] = useState(appContext.email);
    const [userStats, setUserStats] = useState({
        lessonsCompleted: 0,
        xp: 0,
        league: "Bronze",
        friends: 0,
        languagesCompleted: 0
    });

    const getUserStats = async () => {
        fetch("${appContext.apiRoute}/getStats", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: {email}
            })
            
        })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            const updatedStats = {
                    lessonsCompleted: data.lessonsCompleted || 0,
                    xp: data.xp || 0,
                    league: data.league || 0,
                    friends: data.friends || 0,
                    languagesCompleted: data.languagesCompleted || 0
                };
            setUserStats(updatedStats);
        })
        .catch(error => {
            // Handle any errors that occurred
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getUserStats();
    }, []);

    return (
        <main>
            <h3 className="userProfileName">{appContext.email.split('@')[0]}</h3>
            <div className="stats">
                <p className="statBubble"> Lessons Completed: {userStats.lessonsCompleted}</p>
                <p className="statBubble"> XP: {userStats.xp}</p>
                <p className="statBubble"> League: {userStats.league}</p>
                <p className="statBubble"> Friends: {userStats.friends}</p>
                <p className="statBubble"> Languages Completed: {userStats.languagesCompleted}</p>
            </div>
        </main>
    );
}