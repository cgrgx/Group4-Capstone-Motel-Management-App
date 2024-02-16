import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="z-99 fixed inset-0 left-0 top-0 h-screen w-full bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed inset-0 left-[50%] top-[50%] h-screen w-full translate-x-[-50%] translate-y-[-50%] rounded-lg bg-gray-50 px-16 py-12 shadow-lg"
        ref={ref}
      >
        <button
          className="absolute right-7 top-4 translate-x-3 transform rounded-sm border-0 bg-none p-2 transition-all duration-200 hover:bg-gray-200"
          onClick={close}
        >
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
