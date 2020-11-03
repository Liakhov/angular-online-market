import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() cart: models.Position[];
  @Input() wish$: Observable<models.Position[]>;
  public showMenu = false;

  constructor() {
  }

  public dropdown(): void {
    this.showMenu = !this.showMenu;
  }

  public cartQuantity(cart): number {
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  }
}
