"use client";

import React, { ReactNode, useEffect } from "react";
import Button from "./Button";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
  title?: string;
};

const ConfirmModal = ({
  onCancel,
  onConfirm,
  title = "Confirm Action",
  children,
}: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed w-[100vw] h-screen top-0 bottom-0 right-0 left-0 z-40 text-black/15 backdrop-blur-sm flex p-4 items-center justify-center bg-black/50"
      style={{ overflow: "hidden" }}
    >
      <div className="bg-white rounded-md">
        <h3 className="bg-red-500 text-white p-2 text-lg">{title}</h3>
        <p className="p-4">{children}</p>
        <div className="flex gap-4 text-sm justify-between mt-2 p-3 w-fit ms-auto">
          <Button
            className="px-2 py-1 text-sm bg-red-500 text-white hover:bg-red-700 rounded-sm"
            onClick={onConfirm}
          >
            Confirm
          </Button>
          <Button btnClass="px-2 py-1 text-sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
