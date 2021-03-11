import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {MailContainerComponent} from './mail-container.component';

const routes: Routes = [
  {path: '', component: MailContainerComponent}
];

@NgModule({
  declarations: [
    MailContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MailContainerModule { }
