import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Mail} from '../../interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store'
import {MailService} from "../../services/mail.service";
import {MaterialService} from "../../services/material.service";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit, OnDestroy {

  showMenu: boolean = false
  form: FormGroup
  subscibeMail$
  cart$: Observable<[]>;

  constructor(private mailService: MailService, private store: Store<{ cart: [] }>) {
    this.cart$ = store.pipe(select('cart'));
  }

  ngOnInit() {
      this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)])
      })
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
