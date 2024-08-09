"use client"

import React from 'react';
import {useState, useEffect} from 'react';

const Dashboard = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName('John Doe');
    }, []);
    
    return (
        <main>
        <h1>Hello, {userName}!</h1>
        </main>
    );
    };

export default Dashboard;