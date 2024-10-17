"use client"
import { useState, useEffect } from 'react';

export default function Codee() {
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech Recognition API is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript(prevTranscript => prevTranscript + transcriptPart);
                } else {
                    interimTranscript += transcriptPart;
                }
            }
            setTranscript(prevTranscript => prevTranscript + interimTranscript);
        };

        recognition.start();

        return () => recognition.stop();
    }, []);

    return (
        <div>
            <h1>Real-time Speech to Text</h1>
            {error ? <p>{error}</p> : <p>{transcript}</p>}
        </div>
    );
}