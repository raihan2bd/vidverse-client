"use client";
import React from "react";
import Link from "next/link";
import Spinner from "../UI/Spinner";

const SearchResult = ({
  searchResult,
  searchLoading,
}: {
  searchResult: VideoType[];
  searchLoading: boolean;
}) => {
  if (searchLoading) {
    return (
      <div className="absolute w-[16px] h-[16px] right-[20%] top-[13px] z-10 rounded-md shadow-md overflow-hidden">
        <Spinner />
      </div>
    );
  }
  return (
    <ul className="absolute top-12 z-10 list-none rounded-md shadow-md overflow-hidden">
      {searchResult.map((video) => (
        <li
          key={video.id}
          className="mb-1 bg-gray-200  text-black/70 hover:bg-gray-300"
        >
          <Link
            className="px-2 py-1 text-sm whitespace-pre-wrap"
            href={`/videos/${video.id}`}
          >
            {video.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
