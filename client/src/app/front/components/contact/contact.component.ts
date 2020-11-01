import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import * as services from '../../../shared/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnDestroy {
  public form: FormGroup;
  private formSub: Subscription;

  constructor(private messageService: services.MessageService) {
    this.createForm();
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    this.formSub = this.messageService.sendMessage(this.form.value).subscribe(
      () => {
        services.MaterialService.toast('Сообщение отправлено');
        this.form.reset();
      },
      error => {
        console.log(error);
        this.form.enable();
      }
    );
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(32)]),
      message: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
    });
  }
}
