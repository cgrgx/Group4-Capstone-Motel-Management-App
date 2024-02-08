import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";

import { useUser } from "../features/authentication/useUser";
import useOnClickOutside from "../hooks/useOnClickOutside";

import Navbar from "./NavbarLink";
import Logout from "../features/authentication/Logout";

function Header() {
  const { user } = useUser();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  // const { fullName, avatar } = user.user_metadata;
  useOnClickOutside(dropdownRef, () => setShowDropdown(false));
  return (
    <header className="bg-gray-0 flex items-center justify-between gap-6 border-b border-gray-100  px-16 py-3">
      <Navbar />
      {/* user avatar */}
      <div className="flex items-center gap-2 text-lg font-medium text-gray-600">
        <img
          className="block h-10 w-10 rounded-full object-cover object-center outline outline-2 outline-gray-100"
          // src={avatar || "default-user.jpg"}
          // alt={`Avatar of ${fullName}`}
          src="default-user.jpg"
          alt="Avatar"
        />
        {/* {fullName} */}
        <span>chiran gurung</span>
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <IoIosArrowDown />
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
        <Logout className="ml-4 text-xl text-gray-600">
          <IoIosLogOut />
        </Logout>
      </div>
    </header>
  );
}

export default Header;
