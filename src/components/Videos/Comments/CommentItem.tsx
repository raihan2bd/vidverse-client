"use client";
import { convertTime } from "@/utils/convertTime";

type Props = {
  comment: CommentType;
  userID: number;
  onDeleteComment: (id: number) => void;
  onEditComment: (id: number, text: string) => void;
};

const CommentItem = ({ comment, userID, onDeleteComment, onEditComment }: Props) => {
  const { id, user_id, user_name, user_avatar, text, created_at } = comment;

  const handleDeleteComment = () => {
    onDeleteComment(id);
  };

  const handleEditComment = (text: string) => {
    onEditComment(id, text);
  };

  return (
    <li key={id} className="flex gap-2 bg-white rounded-lg p-4">
        <img
          className="rounded-full bg-gray-300 border-1 border-violet-950 p-1"
          src={user_avatar}
          alt=""
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1 flex-auto">
          <h4 className="text-sm font-bold text-violet-800">{user_name} <span className="text-xs text-gray-500 ps-1 font-normal">{convertTime(created_at)}</span></h4>
          <p className="text-sm text-gray-700">{text}</p>
        </div>
      </li>
  );
}

export default CommentItem;