export interface GenerativeResponse {
  deskripsi: string;
  makanan_pendamping: Array<string>;
  minuman_pendamping: Array<string>;
  nama_makanan: string;
  bahan_baku: Array<string>;
  langkah_pembuatan: Array<string>;
  makanan_mirip: Array<string>;
  found?: string;
}

export type RecipeType = "generative" | "cookpad";

export interface Recipe {
  deskripsi: string;
  nama_makanan: string;
  bahan_baku: Array<string>;
  langkah_pembuatan: Array<string>;
  found?: string;
}

export interface RecipeLocal extends Recipe {
  img: string;
  key: string;
  source: RecipeType;
}

export interface RecipeCookpad extends Recipe {
  img: string;
}

export interface RecipeCookpadMini {
  title: string;
  url: string;
  image: string;
}

export interface CookpadRecipeResponse extends GenerativeResponse {
  img: string;
}
