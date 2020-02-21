import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as services from '../../../shared/services/index';
import * as models from '../../../shared/interface';

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
  categories$: Observable<models.Category[]>

  constructor(private mailService: services.MailService, private store: Store<{ cart: [] }>, private categoriesService: services.CategoryService) {
    this.cart$ = store.pipe(select('cart'));
  }

  ngOnInit() {
      this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)])
      })

    this.categories$ = this.categoriesService.fetch()
  }

  ngOnDestroy(): void{
    if(this.subscibeMail$){
      this.subscibeMail$.unsubscribe()
    }
  }

  dropdown(): void{
    this.showMenu = !this.showMenu;
  }

  sendMail(): void{
    const email: models.Mail = {
      email: this.form.value.email
    }

    this.subscibeMail$ = this.mailService.create(email).subscribe(data => {
      services.MaterialService.toast(data.message)
    })
    this.form.reset()
  }

  cartQuantity(cart): number{
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0)
  }

}
