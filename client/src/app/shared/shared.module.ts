import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImgComponent } from "./components/upload-img/upload-img.component";

@NgModule({
  declarations: [
    UploadImgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploadImgComponent
  ]
})
export class SharedModule { }
