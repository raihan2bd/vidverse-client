import { FormEvent, useEffect, useState, useCallback, use } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import getAllVideos from "@/lib/getAllVideos";
import SearchResult from "./SearchResult";

interface PropsTypes {
  onHideSearchBar: () => void;
}

const SearchForm = ({ onHideSearchBar }: PropsTypes) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<VideoType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isShowResult, setIsShowResult] = useState(true);

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value);
  }, []);

  const handleHideShowResult = useCallback(() => {
    setIsShowResult(false);
  }, []);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
    window.location.href = `/videos?search=${searchTerm}`;
    onHideSearchBar();
  }, [searchTerm, onHideSearchBar]);

  useEffect(() => {
    setSearchResults([]);
    if (searchTerm.trim() !== "") {
      setSearchLoading(true);
      const timeoutId = setTimeout(() => {
        const fetchSearchQuery = async () => {
          try {
            const { videos } = await getAllVideos(1, searchTerm, 3);
            setSearchResults(videos);
            setSearchLoading(false);
            setIsShowResult(true);
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
        className="flex-shrink flex gap-2 bg-custom-violet-100 rounded-[5px] min-w-[10px] shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="bg-transparent p-2 text-black rounded-[inherit] focus:outline-none w-full placeholder:text-white/50"
        />
        <button className="p-2 bg-custom-violet-600 rounded-[inherit] h-full transform hover:translate-y-0 hover:translate-x-1">
          <span className="text-2xl">
            <BiSearch />
          </span>
        </button>
      </form>
      {isShowResult && <SearchResult searchResult={searchResults} searchLoading={searchLoading} searchTerm={searchTerm} onHideResult={handleHideShowResult} />}
    </div>
  );
};

export default SearchForm;
