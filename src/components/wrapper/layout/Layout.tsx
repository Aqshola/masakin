import BottomNav from "@/components/base/nav/BottomNav";


type Props = {
  children: React.ReactNode;
};
export default function Layout(props: Props) {
  return (
    <div className="relative w-full min-h-screen bg-primary-softwhite">
      {props.children}
      <BottomNav/>
    </div>
  );
}
