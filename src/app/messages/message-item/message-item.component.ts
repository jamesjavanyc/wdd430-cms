import { CommonResponse } from './../../http/response.model';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Contact from '@app/contacts/contact.model';
import { ContactService } from '@app/contacts/contact.service';
import Message from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message!: Message;

  messageSender: string;
  contact: Contact;

  constructor(private contactService: ContactService, private http:HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get<CommonResponse<Contact>>("http://localhost:5000/contacts/" + this.message.sender)
      .subscribe((res) => {
        this.contact = res.data
      })
  }

}
