"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, Dispatch, SetStateAction, use } from "react";
import Button from "@/components/UI/Button";
import { useGlobalState } from "@/context/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Spinner from "@/components/UI/Spinner";
import CommentForm from "./CommentForm";
import { convertTime } from "@/utils/convertTime";
import CommentItem from "./CommentItem";
import CommentsController from "./CommentsController";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Comments = ({ id, views }: { id: number; views: number }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [has_next, setHasNext] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const { setError, setSuccess } = useGlobalState();
  const { data: session } = useSession();

  const fetchComments = async (fetchMore=false, setLoading: Dispatch<SetStateAction<boolean>>, pageNo=1) => {
    try {
      setLoading(true);
      let nextPage = pageNo;
      if (fetchMore) {
        nextPage += 1;
      }
      
      const response = await axios.get(`${API_URL}/api/v1/comments/${id}?page=${nextPage}&limit=${limit}`);
      const { data } = response;
      if (!fetchMore) {
        setComments(data.comments);
        setTotalComments(data.total_comments);
      } else {
        setComments((prev: CommentType[]) => [...prev, ...data.comments]);
      }

      setHasNext(data.has_next_page);
      setPage(nextPage);

    } catch (err: any) {
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

  const handleShowLess = () => {
    if (comments.length <= limit || page === 1) return;
    
    if (comments.length >= 2 * limit) {
      if (comments.length % limit === 0) {
      setComments((prev: CommentType[]) => prev.slice(0, prev.length - limit));
      } else {
        setComments((prev: CommentType[]) => prev.slice(0, prev.length - (prev.length % limit)));
      }
    } else {
      setComments((prev: CommentType[]) => prev.slice(0, limit));
    }

    if (totalComments > (page - 1 ) * limit  ) {
      setHasNext(true);
    }
    setPage((prev: number) => prev - 1);
  }

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
        { text: value, video_id: id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      fetchComments(false, setLoading);
      setSuccess("Comment added successfully");
    } catch (err: any) {
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


  const handleDeleteComment = async (commentId: number) => {
    if (!session || !session.token || !session.user) {
      router.push(`/signin?callback=${pathName}`);
      return;
    }

    const commentIndex = comments.findIndex((comment: CommentType) => comment.id === commentId);
    if (commentIndex === -1) return;

    if (comments[commentIndex].user_id !== session.user.id ) {
      if (session.user.user_role !== "admin") {
        setError("You are not authorized to delete this comment!!");
        return;
      }
    }

    try {
      const token = session.token;
      await axios.delete(`${API_URL}/api/v1/comments/delete-comment/${commentId}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      fetchComments(false, setLoading)
      setSuccess("Comment deleted successfully");
    } catch (err: any) {
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

  const handleEditComment = () => {};

  useEffect(() => {
    fetchComments(false, setLoading);
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
      <CommentItem formLoading={isFormLoading} key={comment.id} comment={comment}  onDeleteComment={handleDeleteComment} onEditComment={handleEditComment} user={session?.user? session.user : null}/>
    ));
  } else {
    commentsContent = (
      <p className="text-center p-4">Add your first comment here!</p>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-300 p-2">
      <h3 className="bg-white flex gap-4 justify-between items-center text-md font-bold p-2 rounded">
        {totalComments} Comments <span>{views} Views</span>
      </h3>

      <CommentForm addComment={handleAddComment} isLoading={loading} />

      <ul className="flex flex-col gap-4 list-none">{commentsContent}</ul>
      <CommentsController page={page} fetchMoreComments={fetchComments} hasNext={has_next} showLess={comments.length > limit} onHandleShowLess={handleShowLess}  />
    </div>
  );
};

export default Comments;
