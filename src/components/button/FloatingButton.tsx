import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    
}


function FloatingButton(props:Props,ref:ForwardedRef<HTMLButtonElement>){
    return <button {...props}  className="w-fit px-3 py-2 fixed right-5 bottom-5 bg-white rounded shadow border">Save</button>
}

export default forwardRef(FloatingButton)