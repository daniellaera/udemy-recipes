import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../../features/recipes/recipe.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: Http,
    private recipeServices: RecipeService
    ) { }

  storeRecipes() {
    return this.http.put('https://ng-recipes-45a08.firebaseio.com/recipes.json',
    this.recipeServices.getRecipes());
  }

  getRecipes() {
    this.http.get('https://ng-recipes-45a08.firebaseio.com/recipes.json')
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeServices.setRecipes(recipes);
        }
      );
  }
}
