"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/UI/Button";
import { useGlobalState } from "@/context/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Spinner from "@/components/UI/Spinner";
import CommentForm from "./CommentForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Comments = ({ id, views }: { id: number; views: number }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const { setError } = useGlobalState();
  const { data: session } = useSession();

  const handleAddComment = async (value: string) => {
    if (!value || value.length < 1) return;
    if (!session || !session.token || !session.user) {
      router.push(`/signin?callback=${pathName}`);
      return;
    }
    const token = session.token;
    try {
      setIsFormLoading(true);
      const response = await axios.post(
        `${API_URL}/api/v1/comments`,
        { comment: value, video_id: id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const { id:comment_id } = response.data;
      const newComment: CommentType = {
        id: comment_id,
        comment: value,
        user_id: session.user.id,
        user_name: session.user.user_name,
        avatar: "https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
      };
      
      setComments((prev: CommentType[]) => [newComment, ...prev]);
    } catch (err: any) {
      console.log(err);
      const errMsg =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message
          ? err.message
          : "Something went wrong";
      setError(errMsg);
    } finally {
      setIsFormLoading(false);
    }
  };


  const handleDeleteComment = () => {};

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/v1/comments/${id}`);
        const { data } = response;
        console.log(data);
        setComments(data);
      } catch (err: any) {
        console.log(err);
        const errMsg =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
            ? err.message
            : "Something went wrong";
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);

  let commentsContent: any;

  if (loading) {
    commentsContent = (
      <div className="h-[100px] w-[100%] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (comments.length > 0) {
    commentsContent = comments.map((comment: CommentType) => (
      <li key={comment.id} className="flex gap-2 bg-white rounded-lg p-4">
        <img
          className="rounded-full"
          src={comment.avatar}
          alt=""
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1 flex-auto">
          <h4 className="text-md font-bold text-violet-800">{comment.user_name}</h4>
          <p className="text-sm text-gray-700">{comment.comment}</p>
        </div>
      </li>
    ));
  } else {
    commentsContent = (
      <p className="text-center p-4">Add your first comment here!</p>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-300 p-2">
      <h3 className="bg-white flex gap-4 justify-between items-center text-md font-bold p-2 rounded">
        {comments.length} Comments <span>{views} Views</span>
      </h3>

      <CommentForm addComment={handleAddComment} isLoading={loading} />

      <ul className="flex flex-col gap-4 list-none">{commentsContent}</ul>
    </div>
  );
};

export default Comments;
