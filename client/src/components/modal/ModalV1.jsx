import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "@mui/material";
export default function ModalV1({
  title,
  children,
  open,
  setOpen,
  className,
  classNameChildren,
  isCheckedItems,
  isRelative = true,
  changeHeight = false,
  scrollChildren = true,
  displayButtonOk = true,
  displayButtonCancel = true,
  okText = "Đồng Ý",
  onOK,
}) {
  const cancelButtonRef = useRef(null);
  const theme = useTheme();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${className ? className : ""}relative z-40`}
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(true)}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 phone:translate-y-0 phone:scale-95"
              enterTo="opacity-100 translate-y-0 phone:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 phone:scale-100"
              leaveTo="opacity-0 translate-y-4 phone:translate-y-0 phone:scale-95"
            >
              <Dialog.Panel
                className={`${
                  changeHeight ? "min-h-[700px]" : "min-h-auto"
                }  h-full pb-3 w-[96%] m-auto ${
                  isRelative ? "relative" : ""
                }  overflow-x-auto overflow-hidden transform rounded-lg bg-white text-left shadow-xl transition-all`}
              >
                <div className="bg-[#191f4589] py-2 px-2 flex items-center text-white">
                  <div className="p-1 text-right sm:ml-2 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-[16px] uppercase font-semibold leading-6 text-white"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  <button
                    className=" text-base px-[0px] py-[0px] bg-inherit"
                    onClick={() => {
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    <img
                      src="/assets/img/Cancel.png"
                      className="w-[35px] h-[35px]"
                      alt=""
                    />
                  </button>
                </div>
                <div
                  className={`sm:flex sm:items-start ${
                    scrollChildren ? "overflow-x-auto" : ""
                  } `}
                >
                  <div
                    style={{
                      background: `${theme.palette.background.alt}`,
                      color: `${theme.palette.secondary[100]}`,
                    }}
                    className={`items-center text-[16px] min-h-[588px] max-h-[588px] w-full overflow-x-auto`}
                  >
                    {children}
                  </div>
                </div>

                <div
                  className={`${
                    displayButtonOk ? "flex justify-end" : "hidden"
                  } bg-[#191f4589] px-4 py-3  w-full absolute bottom-0 `}
                >
                  {displayButtonOk && (
                    <button
                      type="button"
                      className={`w-[30%] mt-3 inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto`}
                      onClick={onOK}
                    >
                      {okText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
