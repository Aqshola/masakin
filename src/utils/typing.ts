import { RecipeLocal } from "@/type/recipe";

export function instanceOfRecipeLocal(object: any): object is RecipeLocal {
  return "type" in object && "key" in object;
}
