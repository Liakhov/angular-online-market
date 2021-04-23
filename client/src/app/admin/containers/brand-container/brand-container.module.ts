import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';

import {BrandContainerComponent} from './brand-container.component';
import {BrandItemContainerComponent} from './brand-item-container/brand-item-container.component';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipe.module';
import * as services from '../../services';

const routes: Routes = [
  {path: '', component: BrandContainerComponent},
  {path: ':id', component: BrandItemContainerComponent},
  {path: 'add', component: BrandItemContainerComponent}
];

@NgModule({
  declarations: [
    BrandContainerComponent,
    BrandItemContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularEditorModule
  ],
  exports: [RouterModule],
  providers: [services.BrandService]
})
export class BrandContainerModule {
}
