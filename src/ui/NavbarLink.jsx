import { NavLink } from "react-router-dom";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuSofa } from "react-icons/lu";
import logo from "../data/images/SGM.png";

function Navbar() {
  const navItems = [
    { path: "/dashboard", name: "Home", icon: IoHomeOutline },
    { path: "/guests", name: "Guests", icon: IoPeopleOutline },
    { path: "/bookings", name: "Bookings", icon: IoCalendarOutline },
    { path: "/rooms", name: "Rooms", icon: LuSofa },
    { path: "/users", name: "Users", icon: IoPersonOutline },
    { path: "/settings", name: "Settings", icon: IoSettingsOutline },
  ];
  const activeLinkStyles = "bg-gray-200 font-bold";

  const NavLinkItem = ({ path, name, icon: Icon }) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center justify-center gap-3 rounded-md px-4 py-2 font-medium hover:bg-gray-200 ${isActive ? activeLinkStyles : ""}`
      }
    >
      <Icon className="text-xl" />
      <span>{name}</span>
    </NavLink>
  );

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 text-lg">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <NavLink to="/" className="mr-6 flex items-center">
          <img src={logo} alt="Logo" className="mr-10 h-10" />
        </NavLink>

        {/* Navigation Links */}
        {navItems.map((item) => (
          <NavLinkItem key={item.name} {...item} />
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
