import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {Router} from '@angular/router';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() cart: models.Position[];
  @Input() wish: models.Position[];
  @Input() searchResult = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  public onSearchClick(searchClick: models.SearchItem): void {
    const url = searchClick.type === 'category' ? '/category/' + searchClick.id : '/shop/' + searchClick.id;
    this.router.navigate([url]);
  }

}
