import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { MailService} from "../../../shared/services/mail.service";
import { MaterialService } from "../../../shared/services/material.service";
import { CategoryService } from "../../../shared/services/category.service";
import { Category, Mail } from '../../../shared/interface';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit, OnDestroy {

  showMenu = false
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

  cartQuantity(cart){
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0)
  }

}
