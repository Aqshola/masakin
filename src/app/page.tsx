"use client";

import Button from "@/components/base/button/Button";
import PhoneFrame from "@/components/unique/phone frame/PhoneFrame";
import Link from "next/link";


export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <div className="flex items-center bg-white min-h-screen flex-col py-32">
        <h1 className="text-5xl font-extrabold text-primary-softblack mb-5">
          Masakin
        </h1>
        <p className="text-center text-primary-softblack w-64 mb-5">
          <b className="text-primary-orange">Foto</b> dan{" "}
          <b className="text-primary-orange">Cari</b> resep masakan yang kamu
          makan
        </p>
        <Link href={"/cari"}>
          <Button>Cari Resep</Button>
        </Link>
        <div className="mt-10 px-2">
          <PhoneFrame />
        </div>
      </div>
    </main>
  );
}
