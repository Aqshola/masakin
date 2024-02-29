import BottomNav from "@/components/base/nav/BottomNav";

type Props = {
  children: React.ReactNode;
  title?: string;
  showNav?: boolean;
};
export default function Layout({ title, showNav = true, ...props }: Props) {
  return (
    <div className="relative w-full min-h-screen bg-primary-softwhite">
      <div className="h-full p-10 pb-20 relative">
        

        {props.children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}
