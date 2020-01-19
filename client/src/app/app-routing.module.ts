import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './shared/layouts/main/main.component';
import { FrontPageComponent } from './main/front-page/front-page.component';
import {CartComponent} from "./main/cart/cart.component";
import {ProductComponent} from "./main/product/product.component";
import {ShopComponent} from "./main/shop/shop.component";
import {ContactComponent} from "./main/contact/contact.component";
import {CheckoutComponent} from "./main/checkout/checkout.component";
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
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
