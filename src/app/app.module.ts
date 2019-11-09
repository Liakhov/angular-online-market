import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MarketComponent } from './shared/layouts/market/market.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CategoryService } from './shared/layouts/services/category.service';
import { OrderItemComponent } from './order/order-item/order-item.component';

@NgModule({
  declarations: [ AppComponent, MarketComponent, AdminPanelComponent, FrontPageComponent, ReviewPageComponent, OrderComponent, CategoryComponent, UserPageComponent, ProductPageComponent, OrderItemComponent ],
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  bootstrap:    [ AppComponent ],
  providers: [CategoryService]
})
export class AppModule { 
 
}
