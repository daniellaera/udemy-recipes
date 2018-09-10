import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app.routing';
import { RecipeService } from '../../shared/services/recipe.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../shared/auth.interceptor';
import { LoggingInterceptor } from '../../shared/logging.interceptor';

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
    DataStorageService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule { }
