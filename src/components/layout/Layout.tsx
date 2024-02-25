type Props = {
  children: React.ReactNode;
};
export default function Layout(props: Props) {
  return (
    <div className="relative w-full h-full">
      {props.children}
      <div className="w-full flex bg-white py-4 px-10 fixed bottom-0 shadow- rounded-t-2xl border justify-between">
        <button>Home</button>
        <button>Camera</button>
        <button>Bookmark</button>
      </div>
    </div>
  );
}
