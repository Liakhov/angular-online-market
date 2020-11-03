import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public form: FormGroup;
  @Input() categories: models.Category[];
  @Output() submit: EventEmitter<models.Mail> = new EventEmitter<models.Mail>();

  constructor() {
    this.createForm();
  }

  public async sendMail(): Promise<void> {
    const email: models.Mail = {
      email: this.form.value.email
    };
    this.submit.emit(email);
    this.form.reset();
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)])
    });
  }
}
