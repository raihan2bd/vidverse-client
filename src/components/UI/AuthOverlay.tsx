"use client";

import { ReactNode } from 'react';
import classes from './AuthOverlay.module.css'

const AuthOverlay = ({children}: {children: ReactNode}) => {
  return (
  <div className={classes.container}>
    {children}
  </div>)
}

export default AuthOverlay;