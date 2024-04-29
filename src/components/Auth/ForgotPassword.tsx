"use client";

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Button from "../UI/Button";
import { useGlobalState } from "@/context/store";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth';

const ForgotPassword = () => {
  const {
    setError,
    setSuccess,
  } = useGlobalState();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [userId, setUserId] = useState(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const isPasswordMatch = password === confirmPassword;

  useEffect(() => {
    if(isVerified && timer === 0) {
      if(!isPasswordMatch) {
        if (password.length > 0 && confirmPassword.length > 0) {

          setError("Password does not match");
        }
      }
    }
  }
  , [isVerified, timer, isPasswordMatch]);


  // send email
  const onSendEmail = async () => {

    if (timer > 0) return;
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/request-password-reset`, { email });
      if (response.status === 201) {
        setSuccess("An Email sent to your inbox. Please check your inbox");
        setIsEmailSent(true);
        setTimer(61);
        const interval = setInterval(() => {
          setTimer((prev: number) => {
            if (prev === 0) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
        }, 61000);

      }
    
    } catch (error :any) {
      const msg = error.response.data.error || error.message || "Something went wrong. Please try again later"
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/verify-password-reset`, { email, otp: code });
      if (response.status === 200) {
        setIsVerified(true);
        setUserId(response.data.user_id);
      }
    } catch (error :any) {
      const msg = error.response.data.error || error.message || "Something went wrong. Please try again later"
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  const onResetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/reset-password`, { user_id: userId, password, otp: code});
      if (response.status === 200) {
        setSuccess("Password reset successfully. You can now login with your new password");
        setEmail("");
        setCode("");
        setPassword("");
        setConfirmPassword("");
        setIsEmailSent(false);
        setIsVerified(false);
        router.replace("/login");
      }
    } catch (error :any) {
      const msg = error.response.data.error || error.message || "Something went wrong. Please try again later"
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-[580px] w-[96%]">
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
            <p className="text-gray-500 overflow-hidden">
              We have sent an email to <strong>{email}</strong> with a one-time
              secret code. Please check your inbox and enter the code below.
            </p>
            <div className="mt-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-fit mx-auto mt-4"><Button disabled={isLoading} onClick={onVerifyCode} btnClass="w-full mx-auto">
              {isLoading ? "Sending":  "Verify Code"}
            </Button></div>
            
          </div>
        ) : isEmailSent && isVerified ?(
          <form
            onSubmit={(e) => {
              e.preventDefault();
             onResetPassword();
              }
            }
          >
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input type="password" id="password" value={confirmPassword
              } onChange={(e)=>setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="w-fit mx-auto">
            <Button
              type="submit"
              disabled={isLoading || !isPasswordMatch}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>
            </div>
          </form>
        ): (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendEmail();
              }
            }
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

            <div className="w-fit mx-auto">
            <Button
              type="submit"
              disabled={isLoading || timer > 0}
            >
              {isLoading ? "Sending..." : "Request Reset Password"}
            </Button>
            </div>
          </form>
        )}
        {isEmailSent && !isVerified && (
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Don't get any email?{" "}
              {timer > 0 ? (
                `Retry in ${timer} ${timer> 1? "seconds": "second"}`
              ) : (
                <button className="text-indigo-600" onClick={onSendEmail}>Resend</button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
