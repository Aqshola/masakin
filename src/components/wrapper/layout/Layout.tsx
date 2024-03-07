import BottomNav from "@/components/base/nav/BottomNav";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  title?: string;
};
export default function Layout({ title, ...props }: Props) {
  const pathname = usePathname();
  const blacklistNav=['/','/forbidden']
  const hideNav = blacklistNav.includes(pathname );

  return (
    <div className="relative w-full min-h-screen bg-primary-softwhite overflow-x-hidden">
      <div id="transition-element" className="overflow-x-hidden opacity-0">
        {props.children}
      </div>

      {!hideNav && <BottomNav />}
    </div>
  );
}
