import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {WishComponent} from './wish.component';

const routes: Routes = [
  {path: '', component: WishComponent}
];

@NgModule({
  declarations: [
    WishComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class WishModule {
}
