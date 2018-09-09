import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app.routing';
import { RecipeService } from '../../shared/services/recipe.service';
import { ShoppingListService } from '../../shared/services/shopping-list.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { AuthService } from '../../shared/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    DataStorageService,
    AuthService
  ]
})
export class CoreModule { }
