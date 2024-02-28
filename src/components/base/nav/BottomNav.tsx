import {
  BookmarkSquareIcon as BookmarkSquareIconOutline,
  CameraIcon as CameraIconOutline,
  HomeIcon as HomeIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkSquareIcon as BookmarkSquareIconSolid,
  CameraIcon as CameraIconSolid,
  HomeIcon as HomeIconSolid,
} from "@heroicons/react/24/solid";
import {} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex fixed bottom-0 justify-between bottomnav-shadow">
      <div className="bg-white py-2 w-full flex items-center justify-start rounded-tl-xl px-10">
        <Link href={"/cari"}>
          <button>
            {pathname == "/cari" ? (
              <HomeIconSolid className="w-8 h-8 fill-primary-orange" />
            ) : (
              <HomeIconOutline className="w-8 h-8" />
            )}
          </button>
        </Link>
      </div>
      <div className="flex w-full transparent-bg justify-center relative">
        <button className=" flex bg-primary-orange absolute -bottom-7 w-14 h-14 p-2 rounded-full justify-center items-center rotate-180">
          <CameraIconOutline className="w-8 h-8 stroke-white" />
        </button>
      </div>
      <div className=" bg-white w-full flex justify-end items-center py-2 px-10">
        <Link href={"/bookmark"}>
          <button>
            {pathname == "/bookmark" ? (
              <BookmarkSquareIconSolid className="w-8 h-8 fill-primary-orange" />
            ) : (
              <BookmarkSquareIconOutline className="w-8 h-8" />
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}
