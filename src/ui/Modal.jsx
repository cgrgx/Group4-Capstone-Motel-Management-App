import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Modal({ children, open, setOpen, title, type }) {
  let isTypeDelete = type === "delete";

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className=" flex min-h-full items-end justify-center p-4 text-center backdrop-blur-sm sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${isTypeDelete ? "sm:max-w-2xl" : "sm:max-w-5xl"} `}
              >
                {/* Close Icon Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-4 right-4 mx-auto mr-8 mt-8 flex flex-shrink-0 items-center justify-center rounded-full bg-red-100    sm:mx-0 sm:h-10 sm:w-10"
                >
                  <RxCross2
                    className="h-6 w-6 text-red-500 hover:scale-125"
                    aria-hidden="true"
                  />
                </button>
                <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {isTypeDelete && (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaExclamationTriangle
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="mb-6 p-2 text-2xl font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
