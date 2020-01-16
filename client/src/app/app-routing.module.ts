import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './shared/layouts/main/main.component';
import { FrontPageComponent } from './main/front-page/front-page.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { ReviewPageComponent } from './admin/review-page/review-page.component';
import { OrderComponent } from './admin/order/order.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductPageComponent } from './admin/product-page/product-page.component';
import { OrderItemComponent } from './admin/order/order-item/order-item.component';
import {ProductItemComponent} from "./admin/product-page/product-item/product-item.component";
import {CategoryItemComponent} from './admin/category/category-item/category-item.component';
import {MailComponent} from './admin/mail/mail.component';
import {CartComponent} from "./main/cart/cart.component";
import {ProductComponent} from "./main/product/product.component";
import {ShopComponent} from "./main/shop/shop.component";
import {ContactComponent} from "./main/contact/contact.component";
import {CheckoutComponent} from "./main/checkout/checkout.component";
import {MessageComponent} from "./admin/message/message.component";
import {CategoriesComponent} from "./main/categories/categories.component";

const routes: Routes = [
    { path: '',
      component: MainComponent,
      children: [
        {path: '', component: FrontPageComponent, pathMatch: 'full'},
        {path: 'shop', component: ShopComponent},
        {path: 'shop/:id', component: ProductComponent},
        {path: 'contact', component: ContactComponent},
        {path: 'cart', component: CartComponent},
        {path: 'checkout', component: CheckoutComponent},
        {path: 'category/:id', component: CategoriesComponent}
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
          {path: 'mail', component: MailComponent},
          {path: 'message', component: MessageComponent}
        ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
