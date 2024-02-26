import Image from "next/image";
import { BookmarkIcon} from "@heroicons/react/24/outline";
import { GenerativeResponse } from "@/type/recipe";
import { insertInDB } from "@/utils/indexDb";
type Props={
  dataRecipe:GenerativeResponse
  image:File
}
export default function RecipeReader(props:Props){
  async function handleSaveRecipe() {
    await insertInDB(
      { ...props.dataRecipe, source: "generative", img: props.image },
      `generative-${props.dataRecipe?.nama_makanan.replace(" ", "-")}`
    );
  }

    return (
        <div className="mt-5 flex flex-col gap-5">
          <div className="bg-primary-orange p-2 bg-opacity-65 rounded flex justify-between text-primary-softblack items-start">
            <h2 className="text-3xl font-semibold  flex-wrap">Soto Ayam</h2>
            <button onClick={handleSaveRecipe}>
              <BookmarkIcon className="w-7 h-7 mt-1"/>
            </button>
          </div>

          {/* DESC */}
          <div className="bg-white p-2 rounded">
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
              quo magnam commodi. Necessitatibus aperiam explicabo optio
              excepturi distinctio accusamus beatae?
            </p>
          </div>

          <div className="bg-white p-2 rounded">
            <h3 className="text-lg font-bold mb-2">Resep</h3>
            <ul>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
            </ul>
          </div>

          <div className="bg-white p-2 rounded">
            <h3 className="text-lg font-bold mb-2">Cara Pembuatan</h3>
            <ul>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
              <li className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2">
                Bawang putih 100gr
              </li>
            </ul>
          </div>

          <div className="w-full bg-white p-2 rounded">
            <h3 className="text-lg font-bold mb-2">Resep Cookpad</h3>
            <div className="flex overflow-x-scroll gap-3 py-3">
              <div>
                <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
                  <div className="p-2 w-full h-[150px] relative">
                    <Image
                      src={"/img/placeholder_nasigoreng.jpg"}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h4 className="font-semibold">Nasi goreng ibu rohmah</h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
                  <div className="p-2 w-full h-[150px] relative">
                    <Image
                      src={"/img/placeholder_nasigoreng.jpg"}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h4 className="font-semibold">Nasi goreng ibu rohmah</h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
                  <div className="p-2 w-full h-[150px] relative">
                    <Image
                      src={"/img/placeholder_nasigoreng.jpg"}
                      alt=""
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h4 className="font-semibold">Nasi goreng ibu rohmah</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}