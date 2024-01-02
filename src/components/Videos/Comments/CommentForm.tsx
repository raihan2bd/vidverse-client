"use client";
import { useState, useRef } from "react";
import Button from "@/components/UI/Button";

type PropsType = {
  addComment: (comment: string) => void;
  isLoading: boolean;
}

const CommentForm = ({addComment, isLoading}: PropsType) => {
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const [isFormError, setIsFormError] = useState<Boolean>(false);

  const handleCommentError = () => {
    if (isFormError) setIsFormError(false);
  }

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = commentText?.current?.value;
    if (!value) {
      commentText.current?.focus();
      setIsFormError(true);
      return;
    }
    if (!(value.length > 1)) {
      commentText.current?.focus();
      setIsFormError(true);
      return;
    }

    addComment(value);
    commentText.current!.value = "";
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="w-full flex flex-col gap-2 bg-white p-4 justify-center"
    >
      <h4 className="text-center text-md font-bold text-violet-950">
        Add a New Comment
      </h4>
      <div>
        {isFormError && (
          <p className="mb-3 p-4 text-red-500">
            Comment text is required! Make sure the comment text is greater than
            2 character.
          </p>
        )}
        <textarea
          placeholder="Place your comment text here!"
          rows={4}
          name="message"
          id="message"
          className="w-full px-4 py-2 text-black bg-black/10 focus:outline-none focus:ring-1 focus:ring-violet-600 rounded-md"
          ref={commentText}
          onKeyDown={handleCommentError}
        ></textarea>
      </div>
      <Button disabled={isLoading} btnClass="text-base py-3" type="submit">
        {isLoading ? "Adding Comment..." : "Add Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
