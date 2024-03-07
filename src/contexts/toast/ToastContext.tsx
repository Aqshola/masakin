"use client";

import Toast from "@/components/base/toast/Toast";
import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ToastData = {
  key: string;
  label: string;
};
type Context = {
  create: (label: string, autoClose?: boolean) => void;
  remove: (key: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ToastContext = createContext<Context | null>(null);
export default function ToastProvider(props: Props) {
  const [listToast, setListToast] = useState<Array<ToastData>>([]);

  const DURATION = 3.6;

  function createToast(label: string, autoClose = true) {
    const key = uuidv4();
    const newToast: ToastData = {
      key,
      label,
    };
    setListToast((prevToast) => [...prevToast, newToast]);
    setTimeout(() => {
      removeToast(key);
    }, DURATION * 1000);
  }

  function removeToast(key: string) {
    setListToast((prevToast) => prevToast.filter((toast) => toast.key != key));
  }

  return (
    <ToastContext.Provider value={{ create: createToast, remove: removeToast }}>
      <div className="fixed z-40 mr-auto ml-auto left-0  mx-auto right-0 w-full md:w-fit h-fit flex flex-col top-0">
        {listToast.map((toast, idx) => (
          <Toast
            key={toast.key}
            label={toast.label}
            callbackClose={() => removeToast(toast.key)}
          />
        ))}
      </div>
      {props.children}
    </ToastContext.Provider>
  );
}
