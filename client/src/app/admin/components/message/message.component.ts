import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';

import * as services from '../../../shared/services';
import {Message} from '../../../shared/interface';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages$;

  constructor(private messageService: services.MessageService) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  public async remove(message: Message): Promise<void> {
    const result = confirm('Вы уверены что хотите удалить данное сообщение?');

    if (result) {
      try {
        const data = await this.messageService.remove(message._id).pipe(take(1)).toPromise();
        services.MaterialService.toast(data.message);
      } catch (e) {
        services.MaterialService.toast(e.message);
      }
    }
    this.fetch();
  }

  private async fetch(): Promise<void> {
    this.messages$ = this.messageService.fetch();
  }
}
