import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';

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
    this.mailsSub = this.mailService.fetch().subscribe(
      data => this.mails = data,
      error => services.MaterialService.toast(error.message)
    )
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

  public edit(item: models.Mail): void {
    this.modal.open()
    this.itemMail = item

    this.form.patchValue({
      email: item.email
    })
  }

  public update(): void {
    this.updateDateSub = this.mailService.update(this.itemMail._id, {
      email: this.form.value.email
    }).subscribe(
      () =>  services.MaterialService.toast('Изменения сохранены'),
      error => services.MaterialService.toast(error.message)
    )
    this.ngOnInit()
  }

  public close(): void {
    this.modal.close()
  }

  public remove(): void {
    const result = confirm('Вы уверены что хотите удалить данную подписку?')
    if (result) {
      this.removeSub = this.mailService.remove(this.itemMail._id).subscribe(
        data  => services.MaterialService.toast(data.message),
        error =>  services.MaterialService.toast(error.message),
    () => this.modal.close()
      )}
    this.ngOnInit()
  }

}
