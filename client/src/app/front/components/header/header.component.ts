import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnDestroy, OnInit,
  Output,
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public showMenu = false;
  private sub: Subscription;
  @Input() cart: models.Position[];
  @Input() wish$: Observable<models.Position[]>;
  @Input() searchResult = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.createForm();
    this.searchChanges();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private searchChanges(): void {
    this.sub = this.form.get('search')
      .valueChanges
      .pipe(
        tap(e => this.search.emit(e))
      )
      .subscribe();
  }

  public dropdown(): void {
    this.showMenu = !this.showMenu;
  }

  public cartQuantity(cart): number {
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  }

  public onOpenLink(): void {
    this.form.reset();
  }

  private createForm(): void {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }
}
