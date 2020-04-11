import { NgModule } from '@angular/core';

import * as pipes from './pipes';

@NgModule({
  declarations: [
    pipes.FilterPipe,
    pipes.DatePipe
  ],
  imports: [],
  exports: [
    pipes.FilterPipe,
    pipes.DatePipe
  ]
})
export class PipesModule { }
