"use client"

import { ReactNode, useState } from "react";
import { usePathname, useParams } from 'next/navigation'

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface PropTypes {
  children: ReactNode;
}

const UILayout = ({children}: PropTypes) => {
  const [showSideBar, setShowSideBar] = useState(false)
  const pathname = usePathname()
  const params = useParams()

  const showSideBarHandler = () => {
    setShowSideBar(true)
  }

  const hideSideBarHandler = () => {
    setShowSideBar(false)
  }

  let mainContentCls = !showSideBar ? "w-full md:w-[77%] md:ms-auto clear-both" : 'w-[100%]'

  let sidebarClasses = showSideBar ? "block md:hidden fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] bg-white md:w-1/5 md:min-w-[280px] overflow-y-scroll thin-scrollbar text-black": "hidden md:block fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] bg-white md:w-[23%] overflow-y-scroll thin-scrollbar text-black"

  if(pathname === `/videos/${params.id}`) {
    sidebarClasses = showSideBar? 'block fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] md:w-1/5 bg-white overflow-y-scroll thin-scrollbar text-black md:min-w-[280px]': 'hidden';

    mainContentCls = 'w-full'

  }
  
  return (
    <>
    <Header onSetShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    <main className="pt-20 flex gap-4 items-center">
      <Sidebar sidebarClasses={sidebarClasses} />
      <div className={mainContentCls}>
        {children}
        <Footer />
      </div>
    </main>
    </>
  );
}

export default UILayout;