import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Contact from '../contact.model';
import { ContactService } from "../contact.service"

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[] = [];

  subscription:any

  // @Output() selectContactEvent = new EventEmitter<Contact>()

  constructor(private contactService: ContactService) {
    
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts
    })
  }

  onDestory(): void{
    this.subscription.unsubscribe()
  }


}
