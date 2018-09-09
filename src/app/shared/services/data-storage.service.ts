import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../../features/recipes/recipe.model';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: Http,
    private recipeServices: RecipeService,
    private authService: AuthService
    ) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipes-45a08.firebaseio.com/recipes.json?auth=' + token,
    this.recipeServices.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipes-45a08.firebaseio.com/recipes.json?auth=' + token)
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
