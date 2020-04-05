import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import * as fromResolvers from './resolvers';
import {FrontLayoutComponent} from './containers/front-layout/front-layout.component';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {ProductComponent} from './components/product/product.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {PipesModule} from '../shared/pipe.module';
import {SharedModule} from '../shared/shared.module';
import {ShopComponent} from './components/shop/shop.component';


const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {path: '', component: FrontPageComponent, pathMatch: 'full'},
      {
        path: 'shop',
        component: ShopComponent,
        resolve: {
          shop: fromResolvers.ShopResolver
        }
      },
      {
        path: 'shop/:id',
        component: ProductComponent,
        resolve: {
          product: fromResolvers.ProductResolver
        }
      },
      {path: 'category/:id', component: CategoriesComponent},
      {path: 'cart', loadChildren: './components/cart/cart.module#CartModule'},
      {path: 'wish', loadChildren: './components/wish/wish.module#WishModule' },
      {path: 'checkout', loadChildren: './components/checkout/checkout.module#CheckoutModule'},
      {path: 'contact', loadChildren: './components/contact/contact.module#ContactModule'}
    ]
  }
];

@NgModule({
  declarations: [
    FrontLayoutComponent,
    FrontLayoutComponent,
    FrontPageComponent,
    ProductComponent,
    CategoriesComponent,
    ShopComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    fromResolvers.ProductResolver,
    fromResolvers.ShopResolver
  ]
})
export class FrontModule {
}
