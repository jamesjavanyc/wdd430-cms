import { Component, Input, OnInit } from '@angular/core';
import Message from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{

  constructor(public messageService: MessageService) {
    
  }
  ngOnInit(): void {
    this.messages = this.messageService.getMessages()
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages
    })
  }

  @Input() messages: Message[] = []
  
  // onAddMessage(message: Message):void {
  //   // this.messages.push(message);
  // }

}
