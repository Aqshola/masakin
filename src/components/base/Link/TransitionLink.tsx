

"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/libs/animation";

export default function TransitionLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname=usePathname()
  const router = useRouter();
  const handleClick = () => {
    if(pathname===href) return
    animatePageOut(href, router);
  };
  return (
    <button
      className="cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}