import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services/index';

@Component({
  selector: 'app-subscribers',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit, OnDestroy {

  @ViewChild('modal', {static: true}) modalElem: ElementRef
  modal: models.MaterialInstance
  mails
  form: FormGroup
  itemMail: models.Mail
  mailsSub: Subscription
  removeSub: Subscription
  updateDateSub: Subscription

  constructor(private mailService: services.MailService) { }

  ngOnInit() {
    this.mailsSub = this.mailService.fetch().subscribe(data => this.mails = data)

    this.modal = services.MaterialService.initModal(this.modalElem)

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      date: new FormControl(null)
    })
  }

  ngOnDestroy(): void {
    if(this.mailsSub) this.mailsSub.unsubscribe()
    if(this.removeSub) this.removeSub.unsubscribe()
    if(this.updateDateSub) this.updateDateSub.unsubscribe()
    if(this.modal) this.modal.destroy()
  }

  edit(item: models.Mail){
    this.modal.open()
    this.itemMail = item

    this.form.patchValue({
      email: item.email
    })
  }

  update(){
    this.updateDateSub = this.mailService.update(this.itemMail._id, {
      email: this.form.value.email
    }).subscribe(date => {
      services.MaterialService.toast('Изменения сохранены')
    })
    this.ngOnInit()
  }

  close(): void{
    this.modal.close()
  }

  remove(): void{
    let result = confirm('Вы уверены что хотите удалить данную подписку?')
    if(result){
      this.removeSub = this.mailService.remove(this.itemMail._id).subscribe(data => {
        services.MaterialService.toast(data.message)
      })
      this.modal.close()
    }
    this.ngOnInit()
  }

}
