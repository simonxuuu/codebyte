"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../appContext';

export default function Page() {
    const appContext = useContext(AppContext);
    const [email, setEmail] = useState(appContext.email) || '';
    const [userStats, setUserStats] = useState({
        lessonsCompleted: 0,
        xp: 0,
        league: "Bronze",
        friends: 0,
        languagesCompleted: 0
    });

    useEffect(() => {
        if (appContext.email) {
            setEmail(appContext.email);
            getUserStats(appContext.email);
        }
    }, [appContext.email]);

    const getUserStats = async (email) => {
        try {
            const response = await fetch(`${appContext.apiRoute}/getStats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setUserStats({
                lessonsCompleted: data.lessonsCompleted || 0,
                xp: data.xp || 0,
                league: data.league || "Bronze",
                friends: data.friends || 0,
                languagesCompleted: data.languagesCompleted || 0
            });
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };


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