import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";

import { useUser } from "./useUser";
import Logout from "./Logout";
import useOnClickOutside from "../../hooks/useOnClickOutside";

function UserAvatar() {
  const { user } = useUser();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const { fullName, avatar } = user ? user.user_metadata : {};

  // handle clicks outside of the dropdown
  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  // toggle dropdown handler to stop event propagation
  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent click from reaching the global listener
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex items-center gap-2 text-lg font-medium text-gray-600">
      <img
        className="block h-10 w-10 rounded-full object-cover object-center outline outline-2 outline-gray-100"
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      {fullName}
      <button
        onClick={toggleDropdown}
        className=" text-gray-600  hover:text-gray-800 "
      >
        {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
        {/* <IoIosArrowDown /> */}
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-4 top-16 z-20 mt-2 w-44 rounded-md bg-white py-1 text-sm shadow-xl"
        >
          <Link
            to="account"
            className="flex w-full items-center justify-start gap-4 px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <RiUserSettingsLine />
            <span> Profile Settings</span>
          </Link>
          <Logout className="flex w-full items-center justify-start gap-4 px-4 py-2 text-gray-800 hover:bg-gray-100">
            <IoIosLogOut />
            <span>Logout</span>
          </Logout>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
