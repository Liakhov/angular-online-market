import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {MessageContainerComponent} from './message-container.component';

const routes: Routes = [
  {path: '', component: MessageContainerComponent}
];

@NgModule({
  declarations: [
    MessageContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MessageContainerModule {
}
