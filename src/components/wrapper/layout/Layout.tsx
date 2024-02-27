import BottomNav from "@/components/base/nav/BottomNav";

type Props = {
  children: React.ReactNode;
  title: string;
};
export default function Layout(props: Props) {
  return (
    <div className="relative w-full min-h-screen bg-primary-softwhite">
      <div className="h-full p-10 pb-20 relative">
        <h1 className="text-xl font-semibold text-primary-softblack ">
          {props.title}
        </h1>
        {props.children}
      </div>
      <BottomNav />
    </div>
  );
}
