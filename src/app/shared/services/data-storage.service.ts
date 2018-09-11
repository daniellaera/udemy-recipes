import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../../features/recipes/recipe.model';

import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeServices: RecipeService,
    ) { }

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer éokfhgnélsdfnbj');

    /* return this.httpClient.put('https://ng-recipes-45a08.firebaseio.com/recipes.json',
    this.recipeServices.getRecipes(), {
      observe: 'body',
      params: new HttpParams().set('auth', token)
      // headers: headers
    }); */
    const req = new HttpRequest('PUT', 'https://ng-recipes-45a08.firebaseio.com/recipes.json', this.recipeServices.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  getRecipes() {
    // this.httpClient.get<Recipe[]>('https://ng-recipes-45a08.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipes-45a08.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
          console.log(recipes);
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
