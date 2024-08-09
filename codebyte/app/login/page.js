"use client"
import React, { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/api/register' : '/api/login';
    const data = {
      email,
      password,
      ...(isRegister && { confirmPassword })
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setApiResponse(result.message);
    } catch (error) {
      setApiResponse('An error occurred. Please try again.');
    }
  };

  return (
    <main>
      <h2 className="form-title">{isRegister ? 'Register for CourtIQ' : 'Login to CourtIQ'}</h2>
      <form className="login-form login-container" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your.email@email.com"
          required
          className="special-button"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="special-button"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="special-button"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="button" onClick={isRegister ? handleLoginClick : handleRegisterClick} className="special-button">
          {isRegister ? 'Back to Login' : 'Register'}
        </button>
        {!isRegister && (
          <button type="submit" className="special-button">Login</button>
        )}
      </form>
      <span className="api-response">{apiResponse}</span>
    </main>
  );
}