import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';

@Component({
  selector: 'app-mail-container',
  templateUrl: './mail-container.component.html',
  styleUrls: ['./mail-container.component.scss']
})
export class MailContainerComponent implements OnInit, OnDestroy {
  @ViewChild('modal', {static: true}) modalElem: ElementRef;
  public modal: models.MaterialInstance;
  public mails = [];
  public form: FormGroup;
  public itemMail: models.Mail;

  constructor(private mailService: services.MailService) {
    this.createForm();
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
    this.modal = services.MaterialService.initModal(this.modalElem);
  }

  ngOnDestroy(): void {
    if (this.modal) {
      this.modal.destroy();
    }
  }

  private async fetch(): Promise<void> {
    try {
      this.mails = await this.mailService.fetch().pipe(take(1)).toPromise();
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public edit(item: models.Mail): void {
    this.modal.open();
    this.itemMail = item;

    this.form.patchValue({
      email: item.email
    });
  }

  public async update(): Promise<void> {
    try {
      await this.mailService.update(this.itemMail._id, {email: this.form.value.email}).pipe(take(1)).toPromise();
      await this.fetch();
      services.MaterialService.toast('Изменения сохранены');
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public close(): void {
    this.modal.close();
  }

  public async remove(): Promise<void> {
    const result = confirm('Вы уверены что хотите удалить данную подписку?');
    if (result) {
      try {
        const mail = await this.mailService.remove(this.itemMail._id).pipe(take(1)).toPromise();
        services.MaterialService.toast(mail.message);
        this.modal.close();
      } catch (e) {
        services.MaterialService.toast(e.message);
      }
    }
    await this.fetch();
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      date: new FormControl(null)
    });
  }
}
