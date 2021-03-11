import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {PipesModule} from '../../../shared/pipe.module';
import {CategoryItemContainerComponent} from './category-item-container/category-item-container.component';
import {CategoryContainerComponent} from './category-container.component';

const routes: Routes = [
  {path: '', component: CategoryContainerComponent},
  {path: ':id', component: CategoryItemContainerComponent},
  {path: 'new', component: CategoryItemContainerComponent}
];

@NgModule({
  declarations: [
    CategoryContainerComponent,
    CategoryItemContainerComponent
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
export class CategoryContainerModule {
}
