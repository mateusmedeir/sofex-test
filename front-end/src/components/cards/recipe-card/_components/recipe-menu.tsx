"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { IRecipe } from "@/interfaces/recipe.interface";

interface RecipeMenuProps {
  recipe: IRecipe;
  handleDeleteRecipe: (id: string) => void;
}

const RecipeMenu: React.FC<RecipeMenuProps> = ({
  recipe,
  handleDeleteRecipe,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <PencilIcon />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={async (e) => {
            e.stopPropagation();
            handleDeleteRecipe(recipe.id);
          }}
        >
          <Trash2Icon />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RecipeMenu;