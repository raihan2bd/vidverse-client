"use client";
import React, { useEffect, useMemo, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

type PropsTypes = {
  session: {
    id: number;
    user_name: string;
    user_role: string;
    avatar: string;
} | null
}

const AuthActionButtons = ({session}: PropsTypes) => {
  const [authModal, setAuthModal] = useState(false);

  const authNavigationContent = useMemo(() => {
    if (!session) return;
    if (!session.id) return;

    return (
      <ul className="flex flex-col gap-2 items-center list-none w-[200px] absolute z-1 top-[52px] bg-white right-[0.5rem] rounded-lg border border-orange-300 pb-1">
        <p className="text-xs p-2 bg-black/10 text-violet-950 w-full text-center">
          Welcome back {session.user_name}
        </p>
        {session.user_role === "author" ||
        session.user_role === "admin" ? (
          <>
            <li className="w-full" onClick={() => setAuthModal(false)}>
              <Link
                href="/dashboard/upload-video"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                Upload Video
              </Link>
            </li>
            <li className="w-full" onClick={() => setAuthModal(false)}>
              <Link
                href="/dashboard/new-channel"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                Create Channel
              </Link>
            </li>
            <li className="w-full" onClick={() => setAuthModal(false)}>
              <Link
                href="/channels"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                My Channels
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="w-full" onClick={() => setAuthModal(false)}>
              <Link
                href="/contact-us?req_for=author"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                Request For Author
              </Link>
            </li>
          </>
        )}
        <li className="w-full">
          <Button
            type="button"
            onClick={() => {
              signOut();
              setAuthModal(false);
            }}
            className="bg-violet-600 text-white p-2 rounded-sm hover:bg-red-700 flex text-base w-full items-center gap-3"
          >
            <IoMdExit /> Logout
          </Button>
        </li>
      </ul>
    );
  }, [session]);

  if (session && session.id)
    return (
      <div className="flex ml-auto items-center relative">
        <Button
          type="button"
          onClick={() => {
            setAuthModal((prevState) => !prevState);
          }}
          style={{ padding: 0 }}
          className="rounded-full"
        >
          <Image
            src={session.avatar}
            alt={session.user_name}
            width={32}
            height={32}
            className={`rounded-full p-1 first-letter:${
              authModal ? " bg-orange-400" : " bg-custom-violet-100 shadow-md"
            }`}
          />
        </Button>
        {authModal && authNavigationContent}
      </div>
    );

  return (
    <div className="flex gap-3 items-center">
      <Link
          className="ms-1 rounded-full block text-3xl bg-custom-violet-700 text-white hover:text-orange-300"
          href="/auth"
        >
          <FaUserCircle />
        </Link>
    </div>
  );
};

export default AuthActionButtons;
