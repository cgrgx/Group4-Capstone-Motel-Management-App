import { Fragment, forwardRef, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiOutlineChevronUpDown, HiCheck } from "react-icons/hi2";

const ComboBox = forwardRef(({ items = [], onChange, selected }, ref) => {
  const selectedItem = selected && items.find((item) => item.id === selected);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items?.filter((item) =>
          item.full_name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query?.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="w-full">
      <Combobox value={selectedItem} onChange={(item) => onChange(item)}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-sm border  bg-white text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(item) => item?.full_name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md  bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems?.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-orange-100 text-orange-900"
                          : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.full_name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-orange-600" : "text-gray-800"
                            }`}
                          >
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
});

ComboBox.displayName = "ComboBox";
export default ComboBox;
