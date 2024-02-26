import { BookmarkSquareIcon, CameraIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BottomNav(){
    return (
        <nav className="w-full flex fixed bottom-0 justify-between bottomnav-shadow">
        <div className="bg-white py-2 w-full flex items-center justify-start rounded-tl-xl px-10">
          <Link href={"/cari"}>
            <button>
              <HomeIcon className="w-8 h-8"/>
            </button>
          </Link>
        </div>
        <div className="flex w-full transparent-bg justify-center relative">
          <button className=" flex bg-primary-orange absolute -bottom-7 w-14 h-14 p-2 rounded-full justify-center items-center rotate-180">
            <CameraIcon className="w-8 h-8 stroke-white"/>
          </button>
        </div>
        <div className=" bg-white w-full flex justify-end items-center py-2 px-10">
          <Link href={'/bookmark'}>
          <button>
            <BookmarkSquareIcon className="w-8 h-8"/>
          </button>
          </Link>
        </div>
      </nav>
    )
}