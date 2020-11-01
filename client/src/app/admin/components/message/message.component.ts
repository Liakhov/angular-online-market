import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  public messages$: Observable<models.Message[]>;

  constructor(private messageService: services.MessageService) {
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  public async remove(message: models.Message): Promise<void> {
    const result = confirm('Вы уверены что хотите удалить данное сообщение?');

    if (result) {
      try {
        const data = await this.messageService.remove(message._id).pipe(take(1)).toPromise();
        services.MaterialService.toast(data.message);
      } catch (e) {
        services.MaterialService.toast(e.message);
      }
    }
    await this.fetch();
  }

  private async fetch(): Promise<void> {
    this.messages$ = this.messageService.fetch();
  }
}
