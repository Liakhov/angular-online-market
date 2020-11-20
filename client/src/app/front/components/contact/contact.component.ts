import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';

import * as services from '../../../shared/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public form: FormGroup;

  constructor(private messageService: services.MessageService) {
    this.createForm();
  }

  public async onSubmit(): Promise<void> {
    this.form.disable();
    try {
      await this.messageService.sendMessage(this.form.value).pipe(take(1)).toPromise();
      services.MaterialService.toast('Сообщение отправлено');
      this.form.reset();
    } catch (e) {
      console.log(e);
      this.form.enable();
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(32)]),
      message: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
    });
  }
}
