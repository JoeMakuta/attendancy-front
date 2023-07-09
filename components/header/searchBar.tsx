import { BiSearchAlt } from "react-icons/bi";
import { inputStyles } from "../login";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex justify-center  items-center relative gap-2  outline-none ">
      <BiSearchAlt size={20} className=" left-1 absolute text-black/30 " />
      <input
        type="text"
        className={
          "  w-full p-3 pl-7 h-8 rounded-md outline-none text-xs focus:shadow-none " +
          inputStyles
        }
        placeholder="Search ... "
      />
    </div>
  );
};

export default SearchBar;