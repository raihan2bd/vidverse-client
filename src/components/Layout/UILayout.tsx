"use client"

import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface PropTypes {
  children: ReactNode;
}

const UILayout = ({children}: PropTypes) => {
  const [showSideBar, setShowSideBar] = useState(false)

  const showSideBarHandler = () => {
    setShowSideBar(true)
  }

  const hideSideBarHandler = () => {
    setShowSideBar(false)
  }

  const mainContentCls = !showSideBar ? "md:w-[77%] md:ms-auto" : 'w-[100%]'
  
  return (
    <>
    <Header onSetShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    <main className="pt-20 flex gap-4">
      <Sidebar showSideBar={showSideBar} />
      <div className={mainContentCls}>
        {children}
        <Footer />
      </div>
    </main>
    </>
  );
}

export default UILayout;