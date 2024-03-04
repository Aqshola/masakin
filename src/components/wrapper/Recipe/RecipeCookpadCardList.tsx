import RecipeCookpadCard from "./RecipeCookpadCard";
import TransitionLink from "@/components/base/Link/TransitionLink";
import { Base64 } from "js-base64";
import {RecipeCookpadMini } from "@/type/recipe";
import { generateUrlDetailRecipeLocal } from "@/utils/client/flow";

type Props = {
  listData: Array<RecipeCookpadMini>;
};
export default function RecipeCookpadCardList(props: Props) {
  return (
    <div className="flex overflow-x-scroll gap-3 py-3">
      {props.listData.map((data) => (
        <TransitionLink
          href={generateUrlDetailRecipeLocal(data.url,false)}
          key={data.url}
        >
          <RecipeCookpadCard image={data.image} title={data.title} />
        </TransitionLink>
      ))}
    </div>
  );
}
