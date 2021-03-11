import {
  ChangeDetectionStrategy,
  Component, Input,
} from '@angular/core';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderActionsComponent {
  @Input() cart: models.Position[] = [];
  @Input() wish: models.Position[] = [];

  public cartQuantity(cart): number {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
