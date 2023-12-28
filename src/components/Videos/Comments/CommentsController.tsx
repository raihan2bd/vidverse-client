"use client";

import Button from "@/components/UI/Button";
import { useState, Dispatch, SetStateAction } from "react";

type Props = {
  fetchMoreComments: (fetchMore: boolean, setLoading: Dispatch<SetStateAction<boolean>>, page:number) => void;
  hasNext: boolean;
  showLess: boolean;
  onHandleShowLess: () => void;
  page: number;
};

const CommentsController = ({
  fetchMoreComments,
  hasNext,
  onHandleShowLess,
  showLess,
  page,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleShowMore = () => {
    fetchMoreComments(true, setLoading, page);
  };

  console.log(hasNext)

  return (
    <div className="flex justify-center gap-4 text-violet-950">
      {hasNext && (
        <Button
          onClick={handleShowMore}
          disabled={loading}
          className="w-full"
        >
          {loading ? "loading..." : "Show More"}
        </Button>
      )}
      {showLess && (
        <Button
          onClick={onHandleShowLess}
          disabled={loading}
          className="w-full"
        >
          {loading ? "loading..." : "Show Less"}
        </Button>
      )}
    </div>
  );
};

export default CommentsController;
