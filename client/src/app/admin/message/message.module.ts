import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MessageComponent} from "./message.component";

const routes: Routes = [
  {path: '', component: MessageComponent}
]

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MessageModule { }
