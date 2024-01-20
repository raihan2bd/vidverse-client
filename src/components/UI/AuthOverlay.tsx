"use client";

import { ReactNode } from "react";
import classes from "./AuthOverlay.module.css";

const AuthOverlay = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.container}>
      <div className="flex flex-col min-h-screen w-[767px] max-w-[100%] relative z-[1] my-4">
        {children}
      </div>
    </div>
  );
};

export default AuthOverlay;
