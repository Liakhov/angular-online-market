import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DndModule} from 'ngx-drag-drop';

import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromComponents.UploadImgComponent,
    fromComponents.LoaderComponent,
    fromComponents.ButtonComponent,
    fromComponents.SearchFormComponent,
    fromComponents.CircleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule
  ],
  exports: [
    fromComponents.UploadImgComponent,
    fromComponents.LoaderComponent,
    fromComponents.ButtonComponent,
    fromComponents.SearchFormComponent,
    fromComponents.CircleComponent
  ]
})
export class SharedModule {
}
