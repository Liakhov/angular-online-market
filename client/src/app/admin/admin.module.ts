import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminPanelComponent} from "../shared/layouts/admin-panel/admin-panel.component";

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {path: '', redirectTo: 'review', pathMatch: 'full'},
      {path: 'review', loadChildren: './review-page/review-page.module#ReviewPageModule'},
      {path: 'order', loadChildren: './order/order.module#OrderModule'},
      {path: 'category', loadChildren: './category/category.module#CategoryModule'},
      {path: 'product', loadChildren: './product-page/product-page.module#ProductPageModule'},
      {path: 'mail', loadChildren: './mail/mail.module#MailModule'},
      {path: 'message', loadChildren: './message/message.module#MessageModule'}
    ]
  }
]

@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
