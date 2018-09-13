import { Effect, Actions } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FECTH_RECIPES)
        .pipe(switchMap(
            (action: RecipeActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>('https://ng-recipes-45a08.firebaseio.com/recipes.json', {
                    observe: 'body',
                    responseType: 'json'
                });
            }
        ))
        .pipe(map(
            (recipes) => {
                console.log(recipes);
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        ));

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(withLatestFrom(this.store.select('recipes')))
        .pipe(switchMap(
            ([action, state]) => {
                const req = new HttpRequest('PUT', 'https://ng-recipes-45a08.firebaseio.com/recipes.json',
                state.recipes, {
                    reportProgress: true
                });
                return this.httpClient.request(req);
            }
        ));

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>
    ) {}
}
