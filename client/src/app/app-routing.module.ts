import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontLayoutComponent } from './front/containers/front-layout/front-layout.component';
import { FrontPageComponent } from './front/components/front-page/front-page.component';
import { CartComponent } from "./front/components/cart/cart.component";
import { ProductComponent} from "./front/components/product/product.component";
import { ShopComponent } from "./front/components/shop/shop.component";
import { ContactComponent } from "./front/components/contact/contact.component";
import { CheckoutComponent } from "./front/components/checkout/checkout.component";
import { CategoriesComponent } from "./front/components/categories/categories.component";

const routes: Routes = [
    { path: '',
      component: FrontLayoutComponent,
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
