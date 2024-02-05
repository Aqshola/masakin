export default function Index() {
  return (
    <div className="min-h-screen p-10 max-w-screen-2xl">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-center">Cari Resep</h1>
        <div className="w-72 h-72 flex border justify-center items-center">
          Upload foto makanan
        </div>
        <button>Cari</button>
      </div>

      <div className="mt-10 border-t-2 pt-2 flex flex-col items-center gap-5">
        <h1 className="text-center">Hasil</h1>
        <div className="w-72 h-72 flex border justify-center items-center">
          foto makanan
        </div>
        <button>Respe makanan aba</button>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          earum voluptatum ad totam ea commodi sint quibusdam quae laborum
          tenetur qui accusamus, dolor ducimus aspernatur assumenda, deleniti
          eveniet eum quis. Accusantium voluptate numquam voluptatum. Commodi
          tempora pariatur eum incidunt? Aperiam nemo alias nesciunt debitis
          iusto nulla a accusantium. Voluptates, adipisci.
        </p>
      </div>
      <div className="mt-5">
        <h1>Rekomendasi Makanan Pendamping</h1>
      </div>
      <div className="mt-5">
        <h1>Rekomendasi Makanan Sejenis</h1>
      </div>

      <div className="mt-5 flex gap-5">
        <button>Share</button>
        <button>Simpan</button>
      </div>
    </div>
  );
}
