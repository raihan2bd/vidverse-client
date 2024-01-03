"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const AuthActionButtons = () => {
  const { data: session } = useSession();
  const [authModal, setAuthModal] = React.useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  const authNavigationContent = useMemo(() => {
    if (!session) return;
    if (!session.user) return;

    return (
      <ul className="flex flex-col gap-2 items-center list-none w-[200px] absolute z-1 top-[52px] bg-white right-[0.5rem] rounded-lg border border-orange-300 pb-1">
        <p className="text-xs p-2 bg-black/10 text-violet-950 w-full text-center">
          Welcome back {session.user.user_name}
        </p>
        {session.user.user_role === "author" ||
        session.user.user_role === "admin" ? (
          <>
            <li className="w-full">
              <Link
                href="/dashboard/upload-video"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                Upload Video
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/dashboard/new-channel"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                Create Channel
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/channel"
                className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2 block w-full"
              >
                My Channel
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="w-full">
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
            }}
            className="bg-violet-600 text-white p-2 rounded-sm hover:bg-red-700 flex text-base w-full items-center gap-3"
          >
            <IoMdExit /> Logout
          </Button>
        </li>
      </ul>
    );
  }, [session]);

  if (session && session.user)
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
            src={session.user.avatar}
            alt={session.user.user_name}
            width={32}
            height={32}
            className={`rounded-full p-1 border border-white first-letter:${
              authModal ? " bg-orange-400" : " bg-violet-400"
            }`}
          />
        </Button>
        {authModal && authNavigationContent}
      </div>
    );

  return (
    <div className="flex gap-3 items-center">
      <Link
          className="rounded-full block text-3xl bg-white text-violet-600 border border-white hover:text-orange-300"
          href="/login"
        >
          <FaUserCircle />
        </Link>
    <Link
      href={"/signup"}
      className="text-white bg-orange-400 hover:bg-orange-700 px-3 py-2 rounded-3xl text-base"
    >
      Signup
    </Link>
    </div>
  );
};

export default AuthActionButtons;
