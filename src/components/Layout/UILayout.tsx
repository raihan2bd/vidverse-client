"use client"

import { ReactNode, useState } from "react";
import Header from "./Header";
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
  
  return (
    <>
    <Header onSetShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    <main className="pt-20">
      {children}
    </main>
    <Footer />
    </>
  );
}

export default UILayout;