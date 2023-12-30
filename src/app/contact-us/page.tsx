"use client";

import { useGlobalState } from "@/context/store";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    setError,
    setSuccess,
    setLoading,
    uiState: { loading },
  } = useGlobalState();
  const reqFor = searchParams.get("req_for");
  const [isForAuthor, setIsForAuthor] = useState<boolean>(
    reqFor && reqFor === "author" ? true : false
  );

  const { data: session } = useSession();
  const [name, setname] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [mailError, setMailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const [isNameTouch, setIsNameTouch] = useState(false);
  const [isMailTouch, setIsMailTouch] = useState(false);
  const [isMessageTouch, setIsMessageTouch] = useState(false);
  const {user, token} = session || {};

  const isFormValid = isForAuthor
    ? !mailError && !messageError
    : !nameError && !mailError && !messageError;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name,
      email: mail,
      message,
      is_for_author: false,
    };

    if (isForAuthor) {
      if (!session || !user || !token) {
        setError("You need to login to request for author");
        router.push("/login?callback=/contact-us?req_for=author");
        return;
      }
      if (user?.user_role === "author") {
        setError("You are already an author");
        router.push("/");
        return;
      }
      formData.is_for_author = true;
    }

    if (session && session.user && session.user.user_name) {
      formData.name = session.user.user_name;
    }

    
    if (!isFormValid) {
      setIsNameTouch(true);
      setIsMailTouch(true);
      setIsMessageTouch(true);
      setError("Please fill all the fields correctly");
      return;
    }
    
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const res = await axios.post(`${API_URL}/api/v1/contact_us`, formData, {
        headers,
      });
      setLoading(false);
      const msg =
        res?.data?.message ||
        "Request sent successfully! We will get back to you soon!";
      setSuccess(msg);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      const msg =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong! Please try again later";
      const status = error?.response?.status || 500;
      switch (status) {
        case 401:
          setError(msg);
          router.push("/login?callback=/contact-us");
          break;
        case 403:
          setError(msg);
          router.push("/access-denied");
          break;
        default:
          setError(msg);
          break;
      }
    }
  };

  useEffect(() => {
    if (isForAuthor) {
      if (!session) {
        setError("You need to login to request for author");
        router.push("/login?callback=/contact-us?req_for=author");
        return;
      }
      if (session.user.user_role === "author") {
        setError("You are already an author");
        router.push("/");
        return;
      }
    }
  }, [isForAuthor, session]);

  useEffect(() => {
    if (name.trim() === "" || name.length < 5 || name.length > 255) {
      setNameError("name should be atleast 5 and up to 255 characters long");
    } else {
      nameError && setNameError(null);
    }
    if (mail.trim() === "" || !mail.includes("@")) {
      setMailError("Please enter a valid email");
    } else {
      mailError && setMailError(null);
    }
    if (message.trim() === "" || message.length < 10 || message.length > 500) {
      setMessageError(
        "Message should be atleast 10 and up to 500 characters long"
      );
    } else {
      messageError && setMessageError(null);
    }
  }, [name, mail, message]);

  return (
    <section className="w-full flex justify-center p-4 items-center min-h-[calc(100vh-5rem)]">
      <form
        className="w-[580px] max-w-[100%] bg-white p-4 md:p-6 rounded-xl flex flex-col gap-3"
        onSubmit={submitHandler}
      >
        <h2 className="text-xl font-extrabold w-fit mx-auto text-violet-800 mb-4">
          {isForAuthor ? "Request for Author" : "Contact Us"}
        </h2>

        <div className="flex gap-4 text-sm text-violet-950 font-bold w-fit mx-auto">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="req_for"
              id="req_for_author"
              checked={isForAuthor}
              onChange={() => setIsForAuthor(true)}
            />
            <label htmlFor="req_for_author">Request for Author</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="req_for"
              id="contact_us"
              checked={!isForAuthor}
              onChange={() => setIsForAuthor(false)}
            />
            <label htmlFor="contact_us">Contact Us</label>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {isForAuthor ? (
            <></>
          ) : (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm text-violet-950 font-bold"
              >
                name:{" "}
                <span className="text-red-500">
                  * {isNameTouch && nameError && nameError}
                </span>
              </label>
              <input
                type="text"
                className={`border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-950 ${
                  isNameTouch && nameError ? "border-red-500" : ""
                }`}
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                onBlur={() => setIsNameTouch(true)}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm text-violet-950 font-bold"
            >
              Email:{" "}
              <span className="text-red-500">
                * {isMailTouch && mailError && mailError}
              </span>
            </label>
            <input
              type="email"
              className={`border border-gray-400 p-2 rounded-md ${
                isMailTouch && mailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              value={mail}
              name="email"
              onChange={(e) => setMail(e.target.value)}
              onBlur={() => setIsMailTouch(true)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm text-violet-950 font-bold"
            >
              Message:{" "}
              <span className="text-red-500">
                * {isMessageTouch && messageError && messageError}
              </span>
            </label>
            <textarea
              className={`border border-gray-400 p-2 rounded-md ${
                isMessageTouch && messageError ? "border-red-500" : ""
              }`}
              placeholder="Enter your message here"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setIsMessageTouch(true)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-violet-800 text-white p-2 rounded-md"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
