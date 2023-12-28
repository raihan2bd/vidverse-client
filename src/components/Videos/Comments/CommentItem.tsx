"use client";
import { convertTime } from "@/utils/convertTime";
import ResizeText from "../ResizeText";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

type Props = {
  comment: CommentType;
  user: {
    id: number;
    user_name: string;
    user_role: string;
    avatar: string;
  } | null;
  onDeleteComment: (id: number) => void;
  onEditComment: (id: number, text: string) => void;
  formLoading: boolean;
};

const CommentItem = ({
  comment,
  user,
  onDeleteComment,
  onEditComment,
  formLoading,
}: Props) => {
  const { id, user_id, user_name, user_avatar, text, created_at } = comment;

  const handleDeleteComment = () => {
    onDeleteComment(id);
  };

  const handleEditComment = (text: string) => {
    onEditComment(id, text);
  };

  console.log(user_name);

  return (
    <li
      key={id}
      className="flex gap-2 bg-white rounded-lg p-4 items-start static"
    >
      <img
        className="rounded-full bg-gray-300 border-1 border-violet-950 p-1"
        src={user_avatar}
        alt=""
        width={40}
        height={40}
      />
      <div className="flex flex-col gap-1 flex-auto overflow-hidden relative">
        <h4 className="text-sm font-bold text-violet-800">
          {user_name}{" "}
          <span className="text-xs text-gray-500 ps-1 font-normal">
            {convertTime(created_at)}
          </span>
        </h4>
        <p
          className="max-w-[100%] text-sm text-gray-700"
          style={{
            overflowWrap: "break-word",
            wordWrap: "break-word",
            width: "100%",
          }}
        >
          <ResizeText text={text} maxLen={100} />
        </p>

        {user && (user.id === user_id || user?.user_role === "admin") && (
          <div className="absolute top-0 right-0 flex gap-2 text-sm text-gray-500">
            <button
              type="button"
              onClick={handleDeleteComment}
              className="hover:text-red-500"
              disabled={formLoading}
            >
              <FaRegTrashAlt />
            </button>
            <button
              type="button"
              onClick={() => handleEditComment(text)}
              className="hover:text-red-500"
              disabled={formLoading}
            >
              <BiEdit />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default CommentItem;
