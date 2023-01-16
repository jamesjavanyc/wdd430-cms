import { Injectable, EventEmitter } from '@angular/core';
import Contact from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';


@Injectable(
    {
    // 向root module中注入唯一的contactService单例
        providedIn: 'root'
    }
)
export class ContactService {

    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[]{
        return this.contacts.slice(0, this.contacts.length)
    }

    getContact(id: string): Contact{
        let res: Contact = null
        for (let contact of this.contacts){
            if (contact.id === id) {
                res = contact;
            }
        }
        return res;
    }
}