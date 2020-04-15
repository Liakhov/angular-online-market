import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AngularEditorModule} from '@kolkov/angular-editor';

import {environment} from '../environments/environment';
import {EnvironmentInterface} from '../environments/environment.interface';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PipesModule} from './shared/pipe.module';
import {reducers} from './shared/store/reducers';


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
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      logOnly: environment.type !== EnvironmentInterface.DEVELOPMENT
    }),
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule {
}
