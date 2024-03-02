import Toast from "@/components/base/toast/Toast";
import { animateToastOut } from "@/libs/animation";
import React, { createContext, useState } from "react";

type ToastData = {
  key: string;
  label: string;
};
type Context = {
  create: (label: string, autoClose?: boolean) => string; //RETURN STRING KEY
  remove: (key: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ToastContext = createContext<Context | null>(null);
export default function ToastProvider(props: Props) {
  const SHOW_DURATION = 5;
  const [listToast, setListToast] = useState<Array<ToastData>>([]);

  function createToast(label: string, autoClose = true) {
    const key = new Date().toString();
    const newToast: ToastData = {
      key,
      label,
    };
    setListToast([...listToast, newToast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(key);
      }, SHOW_DURATION * 1000);
    }
    return key;
  }

  function removeToast(key: string) {
    animateToastOut(() => {
      setListToast(listToast.filter((toast) => toast.key != key));
    });
  }

  return (
    <ToastContext.Provider value={{ create: createToast, remove: removeToast }}>
      <div className="fixed z-40 mr-auto ml-auto left-0 right-0 w-fit h-fit flex flex-col gap-5 top-5">
        {listToast.map((toast) => (
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
