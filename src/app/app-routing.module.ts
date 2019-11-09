import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketComponent } from './shared/layouts/market/market.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { OrderItemComponent } from './order/order-item/order-item.component';

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
          {path: 'user', component: UserPageComponent},
          {path: 'category', component: CategoryComponent},
          {path: 'product', component: ProductPageComponent}
        ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }