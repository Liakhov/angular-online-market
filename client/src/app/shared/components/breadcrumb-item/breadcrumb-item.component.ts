import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbItemComponent {

  /**
   * Router link
   */
  @Input() link: string;
}
