"use client"
import Link from "next/link";
import LoginButton from "../UI/LoginButton";

const Header = () => {
  return (
    <header className="flex flex-row justify-between gap-1 p-4 md:px-6 bg-violet-900 text-white items-center">
      <div className=""><Link href="/">Vidverse</Link></div>
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