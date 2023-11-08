import { FormEvent, useState, } from "react";
import { BiSearch } from 'react-icons/bi'

interface PropsTypes {
  onHideSearchBar: () => void;

}

const SearchForm = ({onHideSearchBar}: PropsTypes) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchTerm((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
    onHideSearchBar();
  };

  
  return (
    <form className="flex-shrink flex gap-2 bg-violet-400 rounded-[5px] min-w-[10px]" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent p-2 text-black rounded-[inherit] focus:outline-none w-full"
      />
      <button className="p-2 bg-violet-600 rounded-[inherit] h-full transform hover:translate-y-0 hover:translate-x-1"><span className="text-2xl"><BiSearch /></span></button>
    </form>
  );
}

export default SearchForm;