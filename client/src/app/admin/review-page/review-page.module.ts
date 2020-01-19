import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReviewPageComponent} from "./review-page.component";

const routes: Routes = [
  {path: '', component: ReviewPageComponent}
]

@NgModule({
  declarations: [
    ReviewPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReviewPageModule { }
