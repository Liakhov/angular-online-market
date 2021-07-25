import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
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
    fromComponents.CircleComponent,
    fromComponents.BreadcrumbComponent,
    fromComponents.BreadcrumbItemComponent
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
    fromComponents.CircleComponent,
    fromComponents.BreadcrumbComponent,
    fromComponents.BreadcrumbItemComponent
  ]
})
export class SharedModule {
}
