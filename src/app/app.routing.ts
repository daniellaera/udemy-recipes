import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './features/recipes/recipes.module#RecipesModule'},
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
