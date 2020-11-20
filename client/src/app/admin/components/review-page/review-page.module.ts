import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import * as fromResolvers from '../../resolvers';
import {ReviewPageComponent} from './review-page.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      admin: fromResolvers.AdminPanelResolver
    },
    component: ReviewPageComponent
  }
];

@NgModule({
  declarations: [
    ReviewPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReviewPageModule {
}
