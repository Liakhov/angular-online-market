import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import * as fromResolvers from '../../resolvers';
import {ReviewPageContainerComponent} from './review-page-container.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      admin: fromResolvers.AdminPanelResolver
    },
    component: ReviewPageContainerComponent
  }
];

@NgModule({
  declarations: [
    ReviewPageContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReviewPageContainerModule {
}
