"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "../UI/Button";

const Comments = ({ id, views }: {id: number, views: number}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState<null | string>(null)
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/comments/${id}`);
        const data = await response.json();
        setComments(data);
      } catch(err) {
        setHasError("something went wrong. please try again.")
      } finally {
        setLoading(false)
      }
    };
    fetchComments();
  }, [id]);
  
  let commentsContent: any 
  if (hasError) {
    commentsContent =  <p className="bg-red-200 text-red-600 p-4">{hasError} <Button btnClass="ms-4" onClick={() => router.refresh}>Try Again!</Button></p>
  }

  if (loading) {
    commentsContent =  <div className="h-[100px] w-[100%]">Loading...</div>;
  }

  if(comments.length > 0) {
    commentsContent = comments.map((comment: CommentType) => (
      <li key={comment.id} className="flex gap-2 bg-white rounded-lg p-4">
        <img className="rounded-full" src={comment.avatar} alt="" width={40} height={40} />
        <div className="flex flex-col gap-1 flex-auto">
          <h4 className="text-md font-bold text-violet-800">{comment.name}</h4>
          <p className="text-sm text-gray-700">{comment.comment}</p>
        </div>
      </li>
    ))
  } else {
    commentsContent = <p className="text-center p-4">Add your first comment here!</p>
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-300 p-2">
      <h3 className="bg-white flex gap-4 justify-between items-center text-md font-bold p-2 rounded">{comments.length} Comments <span>{views} Views</span></h3>
      <ul className="flex flex-col gap-4 list-none">
        {commentsContent}
      </ul>
    </div>
  );
}

export default Comments;