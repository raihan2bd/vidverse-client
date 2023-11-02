"use client"

import { useState } from "react";
import Link from "next/link";
import LoginButton from "../UI/LoginButton";
import { BiMenu } from "react-icons/bi";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const handleToggle = () => setShowNav(!showNav);
  const handleClose = () => setShowNav(false);

  return (
    <header className="flex flex-row justify-between gap-1 p-4 md:px-6 bg-violet-900 text-white items-center fixed w-[100%] h-[5rem] z-50">
      <div><BiMenu /><Link href="/" className="text-2xl text-yellow-400 font-black">Vidverse</Link></div>
      <nav>
        <ul>
          <li>
          <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;