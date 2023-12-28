"use client";
import React, { useEffect, useState } from "react";

type Props = {
  text: string;
  maxLen: number;
  cls?: string;
};

const ResizeText: React.FC<Props> = ({
  text,
  maxLen,
  cls = "text-sm text-violet-700 cursor-pointer ps-2 hover:text-grey-500",
}) => {
  const [showMore, setShowMore] = useState(text.length > maxLen);
  const [textToShow, setTextToShow] = useState(text.slice(0, maxLen));

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setTextToShow(showMore ? text : text.slice(0, maxLen));
  };

  useEffect(() => {
    if (text.length > maxLen) {
      setTextToShow(text.slice(0, maxLen));
    } else {
      setTextToShow(text);
    }
  }, [text]);

  return (
    <>
      {textToShow}
      {showMore && text.length > maxLen ? (
        <span className={cls} onClick={toggleShowMore}>
          {" ..."} Show More
        </span>
      ) : (
        text.length > maxLen && (
          <span className={cls} onClick={toggleShowMore}>
            Show Less
          </span>
        )
      )}
    </>
  );
};

export default ResizeText;
