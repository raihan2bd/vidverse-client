// "use client";

// import { FormEvent, useEffect, useState } from "react";
// import { BiSearch } from "react-icons/bi";
// import { useSearchParams } from "next/navigation";
// import getAllVideos from "@/lib/getAllVideos";
// import SearchResult from "./SearchResult";

// interface PropsTypes {
//   onHideSearchBar: () => void;
// }

// const SearchForm = ({ onHideSearchBar }: PropsTypes) => {
//   const searchParams = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState(
//     searchParams.get("search") || ""
//   );
//   const [searchResults, setSearchResults] = useState([]) as any[];
//   const [searchLoading, setSearchLoading] = useState(false);

//   const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
//     const value = (e.target as HTMLInputElement).value;
//     setSearchTerm(value);
//     setSearchResults([]);
//     setSearchLoading(false);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSearchTerm("");
//     window.location.href = "/videos?search=" + searchTerm;
//     onHideSearchBar();
//   };

//   useEffect(() => {
//     if (searchTerm.trim() !== "") {
//       const timeoutId = setTimeout(() => {
//         setSearchResults([]);
//         const fetchSearchQuery = async () => {
//           try {
//             setSearchLoading(true);
//             const { videos } = await getAllVideos(1, searchTerm);
//             setSearchResults(videos);
//             setSearchLoading(false);
//           } catch (error) {
//             setSearchResults(false)
//           }
//         };
        
//         fetchSearchQuery();
//       }, 1000);
//       return () => {
//         clearTimeout(timeoutId);
//       };
//     }
//   }, [searchTerm]);

//   return (
//     <div className="relative">
//       <form
//         className="flex-shrink flex gap-2 bg-violet-400 rounded-[5px] min-w-[10px]"
//         onSubmit={handleSubmit}
//       >
//         <input
//           type="search"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={handleInputChange}
//           className="bg-transparent p-2 text-black rounded-[inherit] focus:outline-none w-full placeholder:text-white/50"
//         />
//         <button className="p-2 bg-violet-600 rounded-[inherit] h-full transform hover:translate-y-0 hover:translate-x-1">
//           <span className="text-2xl">
//             <BiSearch />
//           </span>
//         </button>
//       </form>
//       <SearchResult searchResult={searchResults} searchLoading={searchLoading} />
//     </div>
//   );
// };

// export default SearchForm;



import { FormEvent, useEffect, useState, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import getAllVideos from "@/lib/getAllVideos";
import SearchResult from "./SearchResult";

interface PropsTypes {
  onHideSearchBar: () => void;
}

const SearchForm = ({ onHideSearchBar }: PropsTypes) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [searchResults, setSearchResults] = useState<VideoType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value);
  }, []);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
    window.location.href = `/videos?search=${searchTerm}`;
    onHideSearchBar();
  }, [searchTerm, onHideSearchBar]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setSearchResults([]);
      setSearchLoading(true);
      const timeoutId = setTimeout(() => {
        const fetchSearchQuery = async () => {
          try {
            const { videos } = await getAllVideos(1, searchTerm);
            setSearchResults(videos);
            setSearchLoading(false);
          } catch (error) {
            setSearchLoading(false);
          }
        };

        fetchSearchQuery();
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      <form
        className="flex-shrink flex gap-2 bg-violet-400 rounded-[5px] min-w-[10px]"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="bg-transparent p-2 text-black rounded-[inherit] focus:outline-none w-full placeholder:text-white/50"
        />
        <button className="p-2 bg-violet-600 rounded-[inherit] h-full transform hover:translate-y-0 hover:translate-x-1">
          <span className="text-2xl">
            <BiSearch />
          </span>
        </button>
      </form>
      <SearchResult searchResult={searchResults} searchLoading={searchLoading} />
    </div>
  );
};

export default SearchForm;
