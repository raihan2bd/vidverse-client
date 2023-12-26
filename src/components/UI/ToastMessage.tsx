"use client";

import React, {useMemo} from 'react';

type PropType = {
  error: boolean;
  message: string | null;
  resetUiState: () => void;
};

const ToastMessage = ({ error, message, resetUiState }: PropType) => {
  const toastMessage = useMemo(() => {
  if (!message) return null;

  const borderColor = error ? "border-red-600" : "border-green-600";
  const textColor = error ? "text-red-500" : "text-green-500";
  const headerText = error ? "An Error Occurred" : "Success";

  return (
    <div
      className={`w-[70%] md:w-[350px] max-w-[100%] fixed right-2 top-[5.5rem] flex flex-col justify-center items-center bg-white shadow-lg rounded-lg`}
    >
      <button
        onClick={resetUiState}
        className={`absolute top-[1rem] right-[1rem] font-bold text-sm ${textColor}`}
      >
        X
      </button>
      <h3
        className={`border-0 border-b-2 w-full p-2 ${borderColor} ${textColor} text-lg font-bold`}
      >
        {headerText}
      </h3>
      <p className={`${textColor} p-4`}>{message}</p>
    </div>
  );
}, [error, message]);

  return toastMessage;
};

export default ToastMessage;