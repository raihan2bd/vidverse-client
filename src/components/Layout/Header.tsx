"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import LoginButton from "../UI/LoginButton";
import { BiMenu } from "react-icons/bi";

import SearchForm from "../SearchForm/SearchForm";

interface PropsTypes {
  showSideBar: boolean;
  onSetShowSideBar: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ onSetShowSideBar, showSideBar }: PropsTypes) => {
  const showSidebarHandler = () => onSetShowSideBar(true);
  const hideSidebarHandler = () => onSetShowSideBar(false);
  const toggleSidebarHandler = () => onSetShowSideBar((prevState) => !prevState);

  const hamburgerMenuClass = showSideBar? "text-2xl text-red-400 font-black": "text-2xl text-white font-black";

  return (
    <header className="flex flex-row justify-between gap-2 p-4 md:px-6 bg-violet-900 text-white items-center fixed w-[100%] h-[5rem] z-50">
      <div className="flex gap-2 items-center">
        <span className={hamburgerMenuClass} onClick={toggleSidebarHandler}>
          <BiMenu />
        </span>
        <Link href="/" className="text-2xl text-yellow-400 font-black">
          Vidverse
        </Link>
      </div>
        <SearchForm />
      <nav>
        <ul>
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
