import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() type: 'submit' | 'button' = 'button';
  @Input() isDisabled = false;
  @Input() wavesEffect = false;
  @Input() wavesLight = false;
  @Input() background;
}
