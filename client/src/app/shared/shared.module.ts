import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DndModule} from 'ngx-drag-drop';
import {RouterModule} from '@angular/router';

import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromComponents.CardComponent,
    fromComponents.UploadImgComponent,
    fromComponents.LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DndModule
  ],
  exports: [
    fromComponents.CardComponent,
    fromComponents.UploadImgComponent,
    fromComponents.LoaderComponent
  ]
})
export class SharedModule {
}
