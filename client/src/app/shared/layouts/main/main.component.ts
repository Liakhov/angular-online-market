import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Mail} from '../../interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store'
import {MailService} from "../../services/mail.service";
import {MaterialService} from "../../services/material.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  showMenu: boolean = false
  form: FormGroup
  subscibeMail$
  cart$: Observable<[]>
  categories$: Observable<Category[]>

  constructor(private mailService: MailService, private store: Store<{ cart: [] }>, private categoriesService: CategoryService) {
    this.cart$ = store.pipe(select('cart'));
  }

  ngOnInit() {
      this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)])
      })

    this.categories$ = this.categoriesService.fetch()
  }

  ngOnDestroy(){
    if(this.subscibeMail$){
      this.subscibeMail$.unsubscribe()
    }
  }

  dropdown(){
    this.showMenu = !this.showMenu;
  }

  sendMail(){
    const email: Mail = {
      email: this.form.value.email
    }

    this.subscibeMail$ = this.mailService.create(email).subscribe(data => {
      MaterialService.toast(data.message)
    })
    this.form.reset()
  }

}
