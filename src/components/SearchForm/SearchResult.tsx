"use client";
import React from "react";
import Link from "next/link";
import Spinner from "../UI/Spinner";

const SearchResult = ({
  searchResult,
  searchLoading,
  searchTerm,
}: {
  searchResult: VideoType[];
  searchLoading: boolean;
  searchTerm: string;
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
    <ul className="absolute top-12 z-10 list-none rounded-md shadow-md h-[100px] overflow-y-scroll">
      {searchResult.map((video) => (
        <li
          key={video.id}
          className="mb-1 bg-gray-200  text-black/70 hover:bg-gray-300"
        >
          <a
            className="px-2 py-1 text-sm whitespace-pre-wrap"
            href={`/videos/${video.id}`}
          >
            {video.title}
          </a>
        </li>
      ))}
      <li
          className="mb-1"
        >
          <a
            className="px-2 py-1 whitespace-pre-wrap text-sky-900 bg-gray-200  text-black/70 hover:bg-gray-300 w-fit block ms-auto text-xs"
            href={`/videos?search=${searchTerm}`}
          >
            See all results
          </a>
        </li>
    </ul>
  );
};

export default SearchResult;
