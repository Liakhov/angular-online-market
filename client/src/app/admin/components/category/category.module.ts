import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {PipesModule} from '../../../shared/pipe.module';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CategoryComponent} from './category.component';

const routes: Routes = [
  {path: '', component: CategoryComponent},
  {path: ':id', component: CategoryItemComponent},
  {path: 'new', component: CategoryItemComponent}
];

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule {
}
