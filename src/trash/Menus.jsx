import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  };
  return (
    <button
      className="translate-x-3 transform rounded-sm border-0 bg-none p-2 transition-all duration-200 hover:bg-gray-200"
      onClick={handleClick}
    >
      <HiEllipsisVertical />
    </button>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;
  return createPortal(
    <ul
      className="fixed rounded-md bg-white shadow-md"
      style={{ right: position.x, top: position.y }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <button
        className="flex w-full items-center gap-4 p-3 text-left text-lg transition-all duration-200 hover:bg-gray-50"
        onClick={handleClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = function Menu({ children }) {
  <div className="flex items-center justify-end">{children}</div>;
};
Menus.Toggle = Toggle;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
