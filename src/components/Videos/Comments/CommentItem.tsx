"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { convertTime } from "@/utils/convertTime";
import ResizeText from "../ResizeText";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import ConfirmModal from "@/components/UI/ConfirmModal";

type Props = {
  comment: CommentType;
  user: {
    id: number;
    user_name: string;
    user_role: string;
    avatar: string;
  } | null;
  onDeleteComment: (id: number) => void;
  onEditComment: (
    id: number,
    text: string,
    setIsEditing: Dispatch<SetStateAction<boolean>>
  ) => void;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteComment = () => {
    onDeleteComment(id);
  };

  const handleEditComment = () => {
    onEditComment(id, editedText, setIsEditing);
  };

  let commentItemContent;

  if (isEditing) {
    commentItemContent = (
      <div className="flex flex-col gap-2">
        <textarea
          className="w-full p-2 border-1 border-gray-300 rounded-lg ring-1 ring-gray-300 focus:ring-violet-950 focus:border-violet-950 focus:outline-none"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        ></textarea>
        <div className="flex gap-4 w-fit ms-auto mt-2">
          <button
            type="button"
            className="bg-red-500 text-white px-2 py-1 rounded-lg"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-violet-950 text-white px-2 py-1 rounded-lg"
            onClick={handleEditComment}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    commentItemContent = (
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
            <div className="absolute top-0 right-0 flex gap-2 text-base text-gray-500">
              <button
                type="button"
                onClick={() => setIsDeleting(true)}
                className="hover:text-red-500"
                disabled={formLoading}
              >
                <FaRegTrashAlt />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="hover:text-red-500"
                disabled={formLoading}
              >
                <BiEdit />
              </button>
            </div>
          )}
          {isDeleting && (
            <ConfirmModal
              onCancel={() => setIsDeleting(false)}
              onConfirm={handleDeleteComment}
              title="Delete Comment"
            >
              Are you sure you want to delete this comment?
            </ConfirmModal>
          )}
        </div>
      </li>
    );
  }

  return commentItemContent;
};

export default CommentItem;
