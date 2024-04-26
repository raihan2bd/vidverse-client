"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/v1';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  // send email
  const onSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timer > 0) return;
    try {
      const response = await axios.post(`${API_URL}/request-password-reset`, { email });
      if (response.status === 201) {
        setIsEmailSent(true);
        setTimer(25);
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
        }, 25000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        {!isEmailSent && !isVerified && (
          <p className="text-gray-500 text-center mb-8">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        )}
        {isEmailSent && !isVerified ? (
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-2">Email Sent</h2>
            <p className="text-gray-500">
              We have sent an email to <strong>{email}</strong> with a one-time
              secret code. Please check your inbox and enter the code below.
            </p>
            <div className="mt-4">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Verify Code
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSendEmail}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Email
            </button>
          </form>
        )}
        {isEmailSent && (
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Don't get any email?{" "}
              {timer > 0 ? (
                "Retry in " + timer + "soconds"
              ) : (
                <button className="text-indigo-600">Resend</button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
