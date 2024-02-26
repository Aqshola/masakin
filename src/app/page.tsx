"use client";

import Button from "@/components/base/button/Button";
import PhoneFrame from "@/components/unique/phone frame/PhoneFrame";
import { initDb } from "@/utils/indexDb";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    void initDb();
  }, []);

  return (
    <main className="w-full font-poppins h-screen overflow-hidden">
      <div className="flex  items-center bg-white min-h-screen flex-col gap-5 py-32">
        <h1 className="text-5xl font-extrabold text-primary-softblack ">
          Masakin
        </h1>
        <p className="text-center text-primary-softblack w-64">
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
