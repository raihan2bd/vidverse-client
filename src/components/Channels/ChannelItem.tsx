"use client";
import { useGlobalState } from "@/context/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import ConfirmModal from "@/components/UI/ConfirmModal";
import { useState } from "react";

type PropTypes = {
  id: number;
  title: string;
  cover: string;
  logo: string;
  totalSubscriber: number;
  totalVideos: number;
  user_id: number;
  token: string;
  user_role: string;
};

const channelItem = ({
  id,
  title,
  cover,
  logo,
  totalSubscriber,
  totalVideos,
  user_id,
  token,
  user_role,
}: PropTypes) => {
  const {
    setError,
    setSuccess,
    setLoading,
    uiState: { loading: isLoading },
  } = useGlobalState();

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteItem = async () => {
    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!user_id) {
      router.push("/login?callback=/channels");
      setError("Please login to continue!");
      return;
    }
    if (user_role !== "admin") {
      if (user_role !== "author") {
        router.push("/contact-us?req_for=author&callback=/channels");
        setError("Please contact us to continue!");
        return;
      }
    }
    try {
      await axios.delete(`${API_URL}/api/v1/channels/${id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      setSuccess("Channel deleted successfully!");
      router.refresh();
    } catch (error: any) {
      const errMsg =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message
          ? error.message
          : "Something went wrong!";
      const status =
        error.response && error.response.status ? error.response.status : 500;

      switch (status) {
        case 401:
          setError(errMsg);
          router.push("/login?callback=/channels");
          break;
        case 403:
          setError(errMsg);
          router.push("/contact-us?req_for=author&callback=/channels");
          break;
        default:
          setError(errMsg);
          break;
      }
    }
  };

  return (
    <li className="flex justify-between items-center bg-violet-900 text-white min-h-[200px] max-w-full relative shadow-sm p-2">
      <Image
        src={cover}
        alt={title}
        sizes="400px"
        fill={true}
        className="w-full h-full z-10"
        priority={true}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-violet-950 bg-opacity-80 z-20 backdrop-blur-[3px]"></div>

      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-30 flex flex-col justify-between items-center p-[2%] gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Link className="static block" href={`/channels/${id}`}>
            <div className="relative w-[48px] h-[48px] mx-auto">
              <Image
                src={logo}
                alt={title}
                fill={true}
                className="rounded-full border border-white p-[2px]"
                sizes="48px"
                priority={true}
              />
            </div>
            <h3 className="text-lg font-bold text-center text-white mt-1 overflow-hidden">
              {title}
            </h3>
          </Link>

          <div className="flex justify-center items-center gap-2 text-base text-white font-bold px-4 py-2">
            <button
              className="bg-transparent hover:bg-red-600 active:bg-red-500 px-2 py-1 border"
              onClick={() => setIsDeleting(true)}
              disabled={isLoading}
            >
              <FaRegTrashAlt />
            </button>
            <Link
              className="bg-transparent hover:bg-red-600 active:bg-red-500 px-2 py-1 border"
              href={`/dashboard/new-channel?edit=${id}`}
            >
              <BiEdit />
            </Link>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-between w-[100%] opacity-60">
          <h4 className="text-white bg-black/50 p-2 text-sm">
            <Link href={`/channels/${id}`}>
              <span className="m-[-5px] bg-violet-500/50 text-xs font-normal p-2 mr-1">
                {totalSubscriber ? totalSubscriber : 0}
              </span>{" "}
              Subscribers
            </Link>
          </h4>
          <h4 className="text-white bg-black/50 p-2 text-sm">
            <Link href={`/channels/${id}?videos=true`}>
              <span className="m-[-5px] bg-violet-500/50 text-xs font-normal p-2 mr-1">
                {totalVideos ? totalVideos : 0}
              </span>{" "}
              Videos
            </Link>
          </h4>
        </div>
      </div>
      {isDeleting && (
        <ConfirmModal
          onCancel={() => setIsDeleting(false)}
          onConfirm={deleteItem}
          title="Delete Channel"
        >
          <span className="text-red-500">
            Are you sure you want to delete this channel?
          </span>
        </ConfirmModal>
      )}
    </li>
  );
};

export default channelItem;
