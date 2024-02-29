import BottomNav from "@/components/base/nav/BottomNav";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  title?: string;
};
export default function Layout({ title, ...props }: Props) {
  const pathname = usePathname();
  const showNav = pathname == "/";

  return (
    <div className="relative w-full min-h-screen bg-primary-softwhite">
      <div id="transition-element" className="overflow-x-hidden">

      {props.children}
      </div>

      {!showNav && <BottomNav />}
    </div>
  );
}
