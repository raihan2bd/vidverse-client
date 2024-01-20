"use client";

import { ReactNode } from "react";
import classes from "./AuthOverlay.module.css";

const AuthOverlay = ({ children, isSignup = false }: { children: ReactNode, isSignup?: boolean }) => {
  const containerCls = isSignup? `${classes.container} before:bg-custom-violet-400 bg-custom-purple-300`: `${classes.container} before:bg-custom-purple-300 bg-custom-violet-400`
  return (
    <div className={containerCls}>
      <div className="flex flex-col min-h-screen w-[767px] max-w-[100%] relative z-[1] my-4">
        {children}
      </div>
    </div>
  );
};

export default AuthOverlay;
