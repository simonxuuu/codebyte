import React from "react";
import './Alert.css';

export default function Alert({ message="You will lose your progress if you exit" }) {
    return (
        <div className="alert">
            {message}
        </div>
    )
};