"use client";

import { ReactNode, useMemo, useState } from "react";
import { usePathname, useParams } from "next/navigation";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useGlobalState } from "@/context/store";
import Spinner from "../UI/Spinner";
import ToastMessage from "../UI/ToastMessage";
import { useSession } from "next-auth/react";

interface PropTypes {
  children: ReactNode;
}

const UILayout = ({ children }: PropTypes) => {
  const { status, data:session } = useSession();

  const [showSideBar, setShowSideBar] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  const {
    uiState: { error, loading, message },
    resetUiState,
  } = useGlobalState();

  const showSideBarHandler = () => {
    setShowSideBar(true);
  };

  const hideSideBarHandler = () => {
    setShowSideBar(false);
  };

  const loadingSpinner = useMemo(() => {
    if (loading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex items-center justify-center">
          <div className="w-[100%] md:w-[500px] h-[200px] rounded-xl bg-white/50 m-4">
            <Spinner />
            <p className="text-center pt-2 text-white/50">
              Loading please wait...
            </p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }, [loading]);

  let mainContentCls = !showSideBar
    ? "w-full md:w-[77%] md:ms-auto clear-both"
    : "w-[100%]";

  let sidebarClasses = showSideBar
    ? "block md:hidden fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] md:w-1/5 md:min-w-[280px] thin-scrollbar text-black"
    : "hidden md:block fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] md:w-[23%] thin-scrollbar text-black";

  if (pathname === `/videos/${params.id}`) {
    sidebarClasses = showSideBar
      ? "block fixed pt-[5rem] left-0 bottom-0 z-10 h-screen w-[100%] md:w-1/5 thin-scrollbar text-black md:min-w-[280px]"
      : "hidden";

    mainContentCls = "w-full";
  }

  if (status === "loading") {
    return <div className="flex justify-center items-center w-full h-screen">
      <Spinner />
    </div>
  }

  return (
    <>
      <Header onSetShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      <main className="pt-20 flex gap-4 items-center">
        <Sidebar sidebarClasses={sidebarClasses} onHideSidebar={hideSideBarHandler} user_id={session?.user.id} user_role={session?.user.user_role} />
        <div className={mainContentCls}>
          <ToastMessage
            error={error}
            message={message}
            resetUiState={resetUiState}
          />
          {loadingSpinner}
          {children}
        </div>
      </main>
    </>
  );
};

export default UILayout;
