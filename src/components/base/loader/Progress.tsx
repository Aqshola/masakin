import React from "react";
import clsx from "clsx";




interface Props extends React.ComponentProps<"progress">  {
    indicatorText?:string
};

export default function ProgressBar({  className,indicatorText,   ...props }: Props) {
    return (
        <div className="text-center w-full relative">
          <progress {...props} className={clsx("custom-progress", className)} />
          {indicatorText && <p className="absolute top-1 text-center w-full mt-1 font-bold text-xl ">{indicatorText}</p>}
        
        </div>
    )
  
}