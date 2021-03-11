import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  public form: FormGroup;
  public year = new Date().getFullYear();
  @Input() categories: models.Category[];
  @Output() submitEmail: EventEmitter<models.Mail> = new EventEmitter<models.Mail>();

  constructor() {
    this.createForm();
  }

  public async sendMail(): Promise<void> {
    const email: models.Mail = {
      email: this.form.value.email
    };
    this.form.reset();
    this.submitEmail.emit(email);
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)])
    });
  }
}
