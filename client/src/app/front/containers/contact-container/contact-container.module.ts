import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {ContactContainerComponent} from './contact-container.component';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {path: '', component: ContactContainerComponent}
];

@NgModule({
  declarations: [
    ContactContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContactContainerModule {
}
