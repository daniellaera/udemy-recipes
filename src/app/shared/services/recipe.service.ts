import { Injectable } from '@angular/core';
import { Recipe } from '../../features/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tiramisu',
      'This is a Tiramisu recipe',
      'https://as2.ftcdn.net/jpg/00/78/58/79/500_F_78587934_C2vkyy4JQ5cqtYVjNyhAdwRWBO84GwlI.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Salad',
      'This is a Salad',
      'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
