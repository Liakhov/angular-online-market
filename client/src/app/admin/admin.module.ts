import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AdminLayoutComponent} from './containers/admin-layout/admin-layout.component';
import * as fromResolvers from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    resolve: {
      admin: fromResolvers.AdminPanelResolver
    },
    children: [
      {path: '', redirectTo: 'review', pathMatch: 'full'},
      {
        path: 'review',
        resolve: {
          admin: fromResolvers.AdminPanelResolver
        },
        loadChildren: './components/review-page/review-page.module#ReviewPageModule'
      },
      {path: 'order', loadChildren: './components/order/order.module#OrderModule'},
      {path: 'category', loadChildren: './components/category/category.module#CategoryModule'},
      {path: 'product', loadChildren: './components/product-page/product-page.module#ProductPageModule'},
      {path: 'mail', loadChildren: './components/mail/mail.module#MailModule'},
      {path: 'message', loadChildren: './components/message/message.module#MessageModule'}
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    fromResolvers.AdminPanelResolver
  ]
})
export class AdminModule {
}
