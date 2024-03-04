"use client";
import TransitionLink from "@/components/base/Link/TransitionLink";
import { RecipeLocal } from "@/type/recipe";
import { generateUrlDetailRecipeLocal, getAllRecipeLocal } from "@/utils/client/flow";

import { useEffect, useState } from "react";

export default function Index() {
  const [dataBookmark, setDataBookmark] = useState<Array<RecipeLocal>>([]);
  

  useEffect(() => {
    void getDataBookmark();
  }, []);

  async function getDataBookmark() {
    const dataIDB = await getAllRecipeLocal();
    setDataBookmark(dataIDB);
  }

  return (
    <div className="h-full p-10 pb-20 relative">
      <h1 className="text-xl font-semibold text-primary-softblack ">
        Buku Resep
      </h1>
      <div className="mt-10 flex flex-col gap-3 bg-white p-2 rounded">
        {dataBookmark.length == 0 && <div>Gaada resep yang kesimpen 😔</div>}
        {dataBookmark.length > 0 &&
          dataBookmark.map((el) => (
            <TransitionLink
              href={generateUrlDetailRecipeLocal(el.key)}
              key={el.key}
            >
              <div className="border p-2 rounded text-left">
                {el.nama_makanan}
              </div>
            </TransitionLink>
          ))}
      </div>
    </div>
  );
}
