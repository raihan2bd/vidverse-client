"use client";

import Button from "../UI/Button";

interface PropTypes {
  showSideBar: boolean
}

const Sidebar = ({ showSideBar }: PropTypes) => {
  const sidebarClasses = showSideBar ? "block md:hidden fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] bg-white md:w-1/5 md:min-w-[280px] overflow-y-scroll thin-scrollbar text-black": "hidden md:block fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] bg-white md:w-[23%] overflow-y-scroll thin-scrollbar text-black"
  return (
    <aside className={sidebarClasses}>
      <h1 className="text-black text-4xl font-bold">Sidebar</h1>
    </aside>
  );
}

export default Sidebar;