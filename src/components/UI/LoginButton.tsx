"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { IoMdExit } from "react-icons/io";

const LoginButton = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut()
    };
  }, [session]);

  if (session && session.user)
    return (
      <div className="flex ml-auto items-center">
        <p className="text-sky-400 ">{session.user.user_name}</p>
        <Button type="button" onClick={() => {
          signOut()
        }}
        className="bg-violet-600 text-white p-2 rounded-sm hover:bg-red-700 text-2xl"
        >
          <IoMdExit />
        </Button>
      </div>
    );

  return (
      <Link
        href={"/api/auth/signin"}
        className="text-white bg-orange-400 rounded-sm hover:bg-orange-700 px-3 py-2"
      >
        Login
      </Link>
  );
};

export default LoginButton;
