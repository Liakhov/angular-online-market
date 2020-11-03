import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {take} from 'rxjs/operators';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';
import * as state from '../../../shared/store/state/app.state';
import * as reducers from '../../../shared/store/reducers';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent {
  public form: FormGroup;
  public categories$: Observable<models.Category[]>;
  public cart$: Observable<models.Position[]>;
  public wish$: Observable<models.Position[]>;

  constructor(
    private mailService: services.MailService,
    private store: Store<state.AppState>,
    private categoriesService: services.CategoryService) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
    this.wish$ = this.store.pipe(select(reducers.getWish));
    this.categories$ = this.categoriesService.fetch();
    this.createForm();
  }

  public async sendMail(): Promise<void> {
    const email: models.Mail = {
      email: this.form.value.email
    };
    try {
      const data = await this.mailService.create(email).pipe(take(1)).toPromise();
      services.MaterialService.toast(data.message);
    } catch (e) {
      services.MaterialService.toast(e);
    }
    this.form.reset();
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)])
    });
  }
}
