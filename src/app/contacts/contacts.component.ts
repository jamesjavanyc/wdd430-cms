import { Component, OnInit } from '@angular/core';
import Contact from './contact.model';
import { ContactService } from './contact.service';

@Component({
    selector: 'cms-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{

    constructor(private contactService: ContactService) {
    
    }

    selectedContact!: Contact;

    setSelectedContact(contact: Contact): void{
        this.selectedContact = contact;
        // console.log(contact)
    }

    ngOnInit(): void { 
        this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
            this.selectedContact = contact;
        })
    }

}