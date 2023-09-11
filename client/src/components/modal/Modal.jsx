import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  title,
  children,
  open,
  setOpen,
  className,
  classNameChildren,
  displayButtonOk,
  displayButtonCancel = true,
  okText = "Đồng Ý",
  onOK,
  classNameButtonOk,
  borderTitle = true,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${className ? className : ""}relative z-40`}
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                className={`${
                  classNameChildren ? classNameChildren : " w-[500px]"
                } max-h-[700px] overflow-y-auto m-auto relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all `}
              >
                <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                      {title && (
                        <Dialog.Title
                          as="h3"
                          className={`text-base font-semibold leading-6 text-gray-900 ${
                            borderTitle ? " border-2" : "text-[24px]"
                          } mb-2 text-[18px]`}
                        >
                          {title}
                        </Dialog.Title>
                      )}
                      <div className="text-[12px]">{children}</div>
                    </div>
                  </div>
                </div>
                {/* {(displayButtonOk || displayButtonCancel) && (
                  
                )} */}
                <div
                  className={`${
                    displayButtonOk || displayButtonCancel
                      ? "flex justify-around"
                      : "hidden"
                  } bg-gray-50 px-4 py-3 `}
                >
                  {displayButtonOk && (
                    <button
                      type="button"
                      className={`${classNameButtonOk} w-[30%] mt-3 inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto`}
                      onClick={onOK}
                    >
                      {okText}
                    </button>
                  )}

                  <button
                    type="button"
                    className={`${displayButtonOk ? "w-[30%]" : "w-[100%]"} ${
                      displayButtonCancel ? "inline-flex" : "hidden"
                    }  mt-3  justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Thoát
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
