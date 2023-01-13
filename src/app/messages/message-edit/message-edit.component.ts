import { Component, ViewChild, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import Message from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild("subject") subject!: ElementRef ;
  @ViewChild("msgText") msgText!: ElementRef ;
  currentSender: string = '0';
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    let newMsg: Message = new Message("100", this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.addMessageEvent.emit(newMsg)
    // this.onClearMessage()
  }
  onClearMessage() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  ngOnInit(): void {

  }

}
