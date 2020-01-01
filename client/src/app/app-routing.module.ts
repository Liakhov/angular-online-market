import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketComponent } from './shared/layouts/market/market.component';
import { FrontPageComponent } from './front/front-page/front-page.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { ReviewPageComponent } from './admin/review-page/review-page.component';
import { OrderComponent } from './admin/order/order.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductPageComponent } from './admin/product-page/product-page.component';
import { OrderItemComponent } from './admin/order/order-item/order-item.component';
import {ProductItemComponent} from "./admin/product-page/product-item/product-item.component";
import {CategoryItemComponent} from './admin/category/category-item/category-item.component';
import {MailComponent} from './admin/mail/mail.component';

const routes: Routes = [
    { path: '', 
      component: MarketComponent, 
      children: [
              {path: '', component: FrontPageComponent, pathMatch: 'full'}
          ]
    },
    {path: 'admin', 
     component: AdminPanelComponent, 
     children: [
          {path: '', redirectTo: 'review', pathMatch: 'full'},
          {path: 'review', component: ReviewPageComponent},
          {path: 'order', component: OrderComponent},
          {path: 'order/:id', component: OrderItemComponent},
          {path: 'category', component: CategoryComponent},
          {path: 'category/:id', component: CategoryItemComponent},
          {path: 'category/new', component: CategoryItemComponent},
          {path: 'product', component: ProductPageComponent},
          {path: 'product/:id', component: ProductItemComponent},
          {path: 'product/new', component: ProductItemComponent},
          {path: 'mail', component: MailComponent}
        ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
