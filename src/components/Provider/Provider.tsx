"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface PropTypes {
  children: ReactNode;
}

const Provider  = ({ children }: PropTypes) => {
  
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default Provider;