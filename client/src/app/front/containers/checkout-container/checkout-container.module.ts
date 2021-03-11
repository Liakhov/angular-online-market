import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CheckoutContainerComponent} from './checkout-container.component';


const routes: Routes = [
  {path: '', component: CheckoutContainerComponent}
];

@NgModule({
  declarations: [
    CheckoutContainerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class CheckoutContainerModule {
}
