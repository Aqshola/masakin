import Link from "next/link";
import RecipeCookpadCard from "./RecipeCookpadCard";
import { CookpadListRecipe } from "@/utils/cookpad";

type Props = {
  listData: Array<CookpadListRecipe>;
};
export default function RecipeCookpadCardList(props: Props) {
  return (
    <div className="flex overflow-x-scroll gap-3 py-3">
      {props.listData.map((data) => (
        <Link href={data.url} key={data.url}>
          <RecipeCookpadCard image={data.image} title={data.title} />
        </Link>
      ))}
    </div>
  );
}
