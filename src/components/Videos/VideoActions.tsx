"use client";

import { useGlobalState } from "@/context/store";
import { errMsgWithStatus } from "@/utils/responseMsg";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import ConfirmModal from "../UI/ConfirmModal";

type PropTypes = {
  id: number;
  user_id: number;
};

const VideoAction = ({ id, user_id }: PropTypes) => {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    setError,
    setSuccess,
    setLoading,
    uiState: { loading },
  } = useGlobalState();
  const router = useRouter();

  const deleteVideo = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!session || !session.user) {
      setError("You must be logged in to delete a video");
      router.push(`/login?callbackUrl=/videos/${id}`);
      return;
    }

    if (session.user.id !== user_id && session.user.user_role !== "author") {
      if (session.user.user_role !== "admin") {
        setError(
          "You must be logged in as the author or an admin to delete a video"
        );
        return;
      }
    }

    const token = session.token;

    try {
      await axios.delete(`${API_URL}/api/v1/videos/${id}`, {
        headers: { Authorization: token },
      });
      setIsDeleting(false);
      setSuccess("Video deleted successfully");
      router.push("/videos");
    } catch (error: any) {
      setIsDeleting(false);
      const { errMsg, status } = errMsgWithStatus(error);

      switch (status) {
        case 401:
          setError(errMsg);
          router.push(`/login?callback=/videos/${id}`);
          break;
        case 403:
          router.push(`access-denied`);
          setError(errMsg);
          break;
        default:
          setError(
            errMsg ? errMsg : "Something went wrong! Please try again later"
          );
          break;
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2 text-lg text-red-500 font-bold px-4 py-2">
        <button
          className="bg-transparent hover:bg-red-600 active:bg-red-500 px-2 py-1 border border-red-500 hover:text-white"
          onClick={() => setIsDeleting(true)}
          disabled={loading}
        >
          <FaRegTrashAlt />
        </button>
        <Link
          className="bg-transparent hover:bg-red-600 active:bg-red-500 px-2 py-1 border border-red-500 hover:text-white"
          href={`/dashboard/upload-video?edit=${id}`}
        >
          <BiEdit />
        </Link>
      </div>
      {isDeleting && (
        <ConfirmModal
          title="Delete Video"
          onConfirm={deleteVideo}
          onCancel={() => setIsDeleting(false)}
        >
          <span className="text-red-500 p-4">
            {" "}
            Are you sure you want to delete this video?
          </span>
        </ConfirmModal>
      )}
    </>
  );
};

export default VideoAction;
