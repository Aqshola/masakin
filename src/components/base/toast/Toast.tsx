import { animateToastIn, animateToastOut } from "@/libs/animation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  label: string;
  callbackClose: (param?: any) => void;
  callbackAutoClose?:(param?: any) => void;
  show?: boolean;
  autoClose?: boolean;
  index?: number;
};
function Toast(props: Props) {
  const refToast = useRef<HTMLDivElement>(null);
  const DURATION_SHOW = 3;
  const [show, setshow] = useState(props.show);

  useLayoutEffect(() => {
    animateToastIn(refToast);
  }, []);

  useEffect(()=>{
    let timeout=setTimeout(()=>{
      handleAutoClose()
    },DURATION_SHOW*1000)

    return ()=>{
      clearTimeout(timeout)
    }
  },[])
  
  function handleAutoClose(){
    animateToastOut(refToast, () => {
    });
  }

  function handleClickClose() {
    if (!refToast) return;
    animateToastOut(refToast, () => {
      if (props.callbackClose) {
        props.callbackClose();
      }
    });
    
  }

  return (
    <div
      ref={refToast}
      className="flex gap-2 items-center py-4 px-3 border border-b-2 top-5 bg-white z-40 w-full  h-fit translate-x-full justify-between"
    >
      <p>{props.label}</p>
      <button onClick={handleClickClose}>
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Toast;
