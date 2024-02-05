import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full">
      <div className="flex justify-center items-center bg-white min-h-screen flex-col gap-5">
        <h1>Masakin</h1>
        <p>Cari resep yang mau kamu masak</p>
        <button>Cari</button>
      </div>
    </main>
  );
}
