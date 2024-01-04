"use client";
import React from "react";
import Link from "next/link";
import Spinner from "../UI/Spinner";

const SearchResult = ({
  searchResult,
  searchLoading,
  searchTerm,
  onHideResult,
}: {
  searchResult: VideoType[];
  searchLoading: boolean;
  searchTerm: string;
  onHideResult: () => void;
}) => {
  if (searchLoading) {
    return (
      <div className="absolute w-[16px] h-[16px] right-[20%] top-[13px] z-10 rounded-md shadow-md overflow-hidden">
        <Spinner />
      </div>
    );
  }
  if(searchResult.length === 0) return (<></>);
  return (
    <ul className="absolute top-12 z-10 list-none rounded-md shadow-md h-[132px] overflow-y-scroll w-[450px] max-w-[100%] bg-black/50 no-scrollbar p-2">
      {searchResult.map((video) => (
        <li
          key={video.id}
          className="mb-[2px] bg-gray-200  text-black/70 hover:bg-gray-300 p-1 text-sm"
          onClick={onHideResult}
        >
          <Link
            className="px-2 py-1 text-sm whitespace-pre-wrap"
            href={`/videos/${video.id}`}
          >
            {video.title}
          </Link>
        </li>
      ))}
      <li
          className="mb-1"
          onClick={onHideResult}
        >
          <Link
            className="px-2 py-1 whitespace-pre-wrap text-sky-900 bg-gray-200  text-black/70 hover:bg-gray-300 w-fit block ms-auto text-xs mt-2"
            href={`/videos?search=${searchTerm}`}
          >
            See all results
          </Link>
        </li>
    </ul>
  );
};

export default SearchResult;
