import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Message } from "../../../shared/interface";
import { MessageService } from "../../../shared/services/message.service";
import { MaterialService } from "../../../shared/services/material.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  messages$
  oSub: Subscription

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages$ = this.messageService.fetch()
  }

  ngOnDestroy(): void {
    if(this.oSub) this.oSub.unsubscribe()
  }

  remove(message: Message){
    let result = confirm('Вы уверены что хотите удалить данное сообщение?')

    if(result){
      this.oSub = this.messageService.remove(message._id).subscribe(
        (data) => MaterialService.toast(data.message)
      )
    }
    this.ngOnInit()
  }
}
