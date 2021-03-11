import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

import {SearchItem} from '../../interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private sub: Subscription;
  @Input() searchResult: Array<SearchItem> = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchClick: EventEmitter<SearchItem> = new EventEmitter<SearchItem>();


  ngOnInit(): void {
    this.createForm();
    this.searchChanges();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onClickDropdown(dropdownItem: SearchItem): void {
    this.searchClick.emit(dropdownItem);
    this.form.reset();
  }

  private searchChanges(): void {
    this.sub = this.form.get('search')
      .valueChanges
      .pipe(
        tap(e => this.search.emit(e))
      )
      .subscribe();
  }

  private createForm(): void {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }
}
