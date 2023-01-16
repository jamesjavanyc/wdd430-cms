import { Component, ViewChild, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import Message from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild("subject") subject!: ElementRef ;
  @ViewChild("msgText") msgText!: ElementRef ;
  currentSender: string = 'test usr';
  // @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {
    
  }

  onSendMessage() {
    let newMsg: Message = new Message("100", this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    // this.addMessageEvent.emit(newMsg)
    // this.onClearMessage()
    this.messageService.addMessage(newMsg)
  }
  onClearMessage() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  ngOnInit(): void {

  }

}
