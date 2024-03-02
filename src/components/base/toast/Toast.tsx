import { animateToastIn } from "@/libs/animation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

type Props = {
  label: string;
  callbackClose: (param?: any) => void;
};
export default function Toast(props: Props) {
  useEffect(() => {
    animateToastIn();
  }, []);

  function handleClickClose() {
    if (props.callbackClose) {
      props.callbackClose();
    }
  }
  return (
    <div className="flex gap-2 items-center p-2 shadow-lg rounded-lg border top-5 bg-white z-40 w-fit h-fit toast">
      <button onClick={handleClickClose}>
        <XMarkIcon className="w-4 h-4" />
      </button>
      <p>{props.label}</p>
    </div>
  );
}
