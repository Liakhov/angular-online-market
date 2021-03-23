import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';

import {HomeContainerComponent} from './containers/home-container/home-container.component';
import {ProductContainerComponent} from './containers/product-container/product-container.component';
import {CategoriesContainerComponent} from './containers/categories-container/categories-container.component';
import {ShopContainerComponent} from './containers/shop-container/shop-container.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {LogoComponent} from './components/logo/logo.component';
import {MenuComponent} from './components/menu/menu.component';
import {HeaderActionsComponent} from './components/header-actions/header-actions.component';
import {FooterComponent} from './components/footer/footer.component';
import {CardComponent} from './components/card/card.component';
import * as fromResolvers from './resolvers';
import {PipesModule} from '../shared/pipe.module';
import {SharedModule} from '../shared/shared.module';
import * as effects from './store/effects';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'shop',
        component: ShopContainerComponent,
        resolve: {
          products: fromResolvers.ShopResolver
        }
      },
      {
        path: 'shop/:id',
        component: ProductContainerComponent,
        resolve: {
          product: fromResolvers.ProductResolver
        }
      },
      {
        path: 'category/:id', component: CategoriesContainerComponent, resolve: {
          category: fromResolvers.CategoryResolver
        }
      },
      {
        path: 'cart',
        loadChildren: () => import('./containers/cart-container/cart-container.module')
          .then(m => m.CartContainerModule)
      },
      {
        path: 'wish',
        loadChildren: () => import('./containers/wish-container/wish-container.module')
          .then(m => m.WishContainerModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('./containers/checkout-container/checkout-container.module')
          .then(m => m.CheckoutContainerModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./containers/contact-container/contact-container.module')
          .then(m => m.ContactContainerModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    HomeContainerComponent,
    ProductContainerComponent,
    CategoriesContainerComponent,
    ShopContainerComponent,
    HomeComponent,
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    HeaderActionsComponent,
    FooterComponent,
    CardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([effects.CartEffects, effects.WishEffects]),
    HttpClientModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    fromResolvers.ProductResolver,
    fromResolvers.ShopResolver,
    fromResolvers.CategoryResolver
  ]
})
export class FrontModule {
}
