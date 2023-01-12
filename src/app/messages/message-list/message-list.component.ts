import { Component, Input } from '@angular/core';
import Message from './message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  @Input() messages: Message[] = [
    new Message("1", "food", "Hello world.", "Anderson"),
    new Message("2","foodie", "Hello world1.", "Anderson1"),
  ]
  
  onAddMessage(message: Message):void {
    this.messages.push(message);
  }

}
