import Navbar from "./NavbarLink";
import UserAvatar from "../features/authentication/UserAvatar";

function Header() {
  return (
    <header className="bg-gray-0 flex items-center justify-between gap-6 border-b border-gray-100  px-16 py-3">
      <Navbar />
      <UserAvatar />
    </header>
  );
}

export default Header;
