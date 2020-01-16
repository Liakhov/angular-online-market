import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../../shared/services/material.service";
import {MessageService} from "../../shared/services/message.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  form: FormGroup
  formSub: Subscription

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(32)]),
      message: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
    })
  }

  ngOnDestroy(): void {
    if(this.formSub) this.formSub.unsubscribe()
  }

  onSubmit(){
    this.form.disable()

    this.formSub = this.messageService.sendMessage(this.form.value).subscribe(
() => {
        MaterialService.toast('Сообщение отправлено')
        this.form.reset()
      },
      error => {
          console.log(error)
          this.form.enable()
        }
      )
  }
}
