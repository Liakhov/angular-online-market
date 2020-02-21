import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PipesModule } from "./shared/pipe.module";
import { cartReducer } from './shared/store/reducers/cart.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      cart: cartReducer
    }),
    StoreDevtoolsModule.instrument()
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
