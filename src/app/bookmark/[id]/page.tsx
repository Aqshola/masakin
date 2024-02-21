"use client";
import { getDataByKeyIDB } from "@/utils/indexDb";
import { useEffect, useState } from "react";

type Param = {
  params: {
    id: string;
  };
};
export default function Index({ params }: Param) {
  const [dataRecipe, setDataRecipe] = useState();

  useEffect(() => {}, []);

  async function getDataRecipe() {
    const dataIDB = await getDataByKeyIDB(params.id);
    setDataRecipe(dataIDB);
  }
  return <div>{params.id}</div>;
}
