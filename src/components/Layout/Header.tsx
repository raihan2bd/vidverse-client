"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import AuthActionButtons from "../UI/AuthActionButtons";
import { BiMenu } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

import SearchForm from "../SearchForm/SearchForm";
import Notifications from "../Notifications/Notifications";
import { useSession } from "next-auth/react";
import ToastMessage from "../UI/ToastMessage";
import ToastNotification from "../Notifications/ToastNotification";

interface PropsTypes {
  showSideBar: boolean;
  onSetShowSideBar: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ onSetShowSideBar, showSideBar }: PropsTypes) => {
  const { data: session } = useSession();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const showSearchBarHandler = () => setShowSearchBar(true);
  const hideSearchBarHandler = () => setShowSearchBar(false);

  const showSidebarHandler = () => onSetShowSideBar(true);
  const hideSidebarHandler = () => onSetShowSideBar(false);
  const toggleSidebarHandler = () =>
    onSetShowSideBar((prevState) => !prevState);

  const hamburgerMenuClass = showSideBar
    ? "text-2xl text-red-400 font-black"
    : "text-2xl text-white font-black";

  // Search bar
let mobileSearchBarContent;

if (!showSearchBar) {
  mobileSearchBarContent = (
    <div className="flex sm:hidden gap-2 items-center ms-auto">
      <button
        onClick={showSearchBarHandler}
        className="p-2 bg-violet-600 rounded-lg h-full transform hover:translate-y-0 hover:translate-x-1"
      >
        <span className="text-2xl">
          <BiSearch />
        </span>
      </button>
    </div>
  );
} else {
  mobileSearchBarContent = (
    <div className="left-0 px-6 fixed z-50 w-[100%] h-[5rem] bg-violet-900 flex sm:hidden gap-2 items-center ms-auto justify-between">
      <button
        onClick={hideSearchBarHandler}
        className="h-fit p-2 bg-red-300 rounded-lg transform hover:translate-y-0 hover:translate-x-1"
      >
        <span className="text-2xl">
          <BsArrowLeftShort />
        </span>
      </button>
      <SearchForm onHideSearchBar={hideSearchBarHandler} />
    </div>
  );
}


  const customSession = useMemo(() => {
    if (!session) return null;
    if (!session.user) return null;

    const { id, user_name, user_role, avatar } = session.user;
    return { id, user_name, user_role, avatar };
  }, [session]);

  const authNavigationContent = useMemo(() => {
    if (customSession && customSession.id) {
      return (
        <>
          <li className="relative p-2 flex justify-center items-center">
            <Notifications token={session?.token} />
          </li>
          <li>
            <AuthActionButtons session={customSession} />
          </li>
        </>
      );
    }

    return (
      <li>
        <AuthActionButtons session={null} />
      </li>
    );
  }, [customSession]);

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
      {mobileSearchBarContent}
      <div className="hidden sm:flex gap-2 items-center">
        <SearchForm onHideSearchBar={hideSearchBarHandler} />
      </div>
      <nav>
        <ul className="flex flex-row gap-2 justify-center items-center">
       { authNavigationContent }
        </ul>
      </nav>
      <ToastNotification token={session?.token} />
    </header>
  );
};

export default Header;
