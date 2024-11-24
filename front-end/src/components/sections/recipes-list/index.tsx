"use client";

import RecipeCard from "@/components/cards/recipe-card";
import { IRecipe } from "@/interfaces/recipe.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationControl from "@/components/pagination-control";
import { deleteRecipe, getRecipes } from "@/utils/recipes";
import RecipeModal from "@/components/modals/recipe-modal";
import AddRecipeModal from "@/components/modals/add-recipe-modal";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const RecipesList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [total, setTotal] = useState(0);

  const handledeleteRecipe = async (id: string) => {
    await deleteRecipe(id);

    const newRecipes = recipes.filter((recipe) => recipe.id !== id);

    if (newRecipes.length === 0) {
      const page = parseInt(String(params.get("page"))) || 1;
      if (page > 1) {
        params.set("page", String(page - 1));
        router.push(`?${params.toString()}`);
        return;
      }
    } else setRecipes(newRecipes);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, total } = await getRecipes({
        params,
      });
      setRecipes(data);
      setTotal(total);
    };
    fetchRecipes();
  }, [searchParams]);

  return (
    <section className="container flex flex-col gap-6 py-16">
      <AddRecipeModal>
        <Button className="w-fit">
          <PlusCircleIcon />
          Adicionar Receita
        </Button>
      </AddRecipeModal>
      {recipes?.map((recipe, index) => (
        <RecipeModal
          key={index}
          recipe={recipe}
          deleteRecipe={handledeleteRecipe}
        >
          <RecipeCard recipe={recipe} />
        </RecipeModal>
      ))}
      <PaginationControl link="" total={total} />
    </section>
  );
};

export default RecipesList;
