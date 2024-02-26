import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: "primary" | "blank";
}
export default function Button({ variant = "primary", className,children,  ...props }: Props) {
  const VARIANT_OBJECT = {
    primary: "bg-primary-orange text-primary-white font-medium",
    blank: "",
  };
  return (
    <button
      className={clsx("px-4 py-1 text-sm rounded", VARIANT_OBJECT[variant], className)}
      {...props}
    >
        {children}
    </button>
  );
}
