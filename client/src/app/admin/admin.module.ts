import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AdminContainerComponent} from './containers/admin-container/admin-container.component';
import * as fromResolvers from './resolvers';
import * as services from './services';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    resolve: {
      admin: fromResolvers.AdminPanelResolver
    },
    children: [
      {path: '', redirectTo: 'review', pathMatch: 'full'},
      {
        path: 'review',
        loadChildren: () => import('./containers/review-page-container/review-page-container.module')
          .then(m => m.ReviewPageContainerModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./containers/order-container/order-container.module')
          .then(m => m.OrderContainerModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./containers/category-container/category-container.module')
          .then(m => m.CategoryContainerModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./containers/product-page-container/product-page-container.module')
          .then(m => m.ProductPageContainerModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./containers/brand-container/brand-container.module')
          .then(m => m.BrandContainerModule)
      },
      {
        path: 'mail',
        loadChildren: () => import('./containers/mail-container/mail-container.module')
          .then(m => m.MailContainerModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./containers/message-container/message-container.module')
          .then(m => m.MessageContainerModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    fromResolvers.AdminPanelResolver,
    services.ProductService
  ]
})
export class AdminModule {
}
