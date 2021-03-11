import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {WishContainerComponent} from './wish-container.component';

const routes: Routes = [
  {path: '', component: WishContainerComponent}
];

@NgModule({
  declarations: [
    WishContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class WishContainerModule {
}
