import RecipeCookpadCard from "./RecipeCookpadCard";
import TransitionLink from "@/components/base/Link/TransitionLink";
import { Base64 } from "js-base64";
import { RecipeCookpadMini } from "@/type/recipe";
import { generateUrlDetailRecipeLocal } from "@/utils/client/flow";

type Props = {
  listData: Array<RecipeCookpadMini>;
};
export default function RecipeCookpadCardList(props: Props) {
  return (
    <div className="flex overflow-x-scroll py-3 ">
      {props.listData.map((data) => (
        <div className="mr-3" key={data.url}>
          <TransitionLink href={generateUrlDetailRecipeLocal(data.url, false)}>
            <RecipeCookpadCard image={data.image} title={data.title} />
          </TransitionLink>
        </div>
      ))}
    </div>
  );
}
