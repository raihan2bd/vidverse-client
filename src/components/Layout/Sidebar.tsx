"use client";

import Button from "../UI/Button";

interface PropTypes {
  sidebarClasses: string
}

const Sidebar = ({ sidebarClasses }: PropTypes) => {

  return (
    <aside className={sidebarClasses}>
      <h1 className="text-black text-4xl font-bold">Sidebar</h1>
    </aside>
  );
}

export default Sidebar;