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
        loadChildren: () => import('./components/review-page/review-page.module').then(m => m.ReviewPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./components/product-page/product-page.module').then(m => m.ProductPageModule)
      },
      {
        path: 'mail',
        loadChildren: () => import('./components/mail/mail.module').then(m => m.MailModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./components/message/message.module').then(m => m.MessageModule)
      }
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
