"use client";

import Link from "next/link";
import Button from "./Button";

interface Props {
  errMsg: string;
  tryAgainHandler?: () => void;
}

const ErrorModal = ({
  errMsg,
  tryAgainHandler=() => {window.location.reload()}
}: Props) => {
  return (
    <div className="sticky flex h-screen left-0 right-0 top-0 bottom-0 justify-center items-center p-4 max-w-[100%] bg-black/70">
      <div className="bg-white flex flex-col justify-center items-center w-[480px] max-w-[100%] p-4 rounded-xl gap-2">
        <h1 className="p-2 w-full text-center border-0 border-b-2 border-red-500 text-red-500 text-xl font-bold">
          An Error Occurred
        </h1>
        <p className="text-red-400">{errMsg}</p>
        <div className="flex justify-between items-center w-full gap-2 mt-4">
          <Button
            type="button"
            onClick={tryAgainHandler}
            btnClass="text-white text-center bg-violet-900 p-1"
          >
            Try Again
          </Button>
          <Link className="text-white text-center bg-violet-900 p-2 hover:bg-violet-500 rounded-sm text-sm" href="/">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
