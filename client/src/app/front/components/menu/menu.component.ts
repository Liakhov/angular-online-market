import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import * as constants from '../../../shared/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  public menu = constants.FRONT_MENU;
  public showMenu = false;

  public onToggleDropdown(): void {
    if (window.innerWidth <= 600) {
      this.showMenu = !this.showMenu;
    }
  }
}
