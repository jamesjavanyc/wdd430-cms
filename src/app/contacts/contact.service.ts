import { Injectable, EventEmitter } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';


@Injectable(
    {
        // 向root module中注入唯一的contactService单例
        providedIn: 'root'
    }
)
export class ContactService {

    contacts: Contact[] = [];

    maxId: number;

    contactSelectedEvent = new EventEmitter<Contact>();

    // contactChangedEvent = new EventEmitter<Contact[]>();

    contactListChangedEvent = new Subject<Contact[]>();

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxId = this.getMaxId()
    }

    getContacts(): Contact[] {
        return this.contacts.slice(0, this.contacts.length)
    }

    getContact(id: string): Contact {
        let res: Contact = null
        for (let contact of this.contacts) {
            if (contact.id === id) {
                res = contact;
            }
        }
        return res;
    }

    deleteContact(contact: Contact): void {
        if (!contact) return
        this.contacts.map((c: Contact, i) => {
            if (c.id === contact.id) {
                this.contacts.splice(i, 1)
            }
        })
        this.contactListChangedEvent.next(this.contacts.slice())
    }

    updateContact(original: Contact, newCont: Contact): void {
        if (!original || !newCont) {
            return
        }
        let pos:number = this.contacts.indexOf(original)
        if (pos < 0) {
            return
        }
        newCont.id = original.id
        this.contacts[pos] = newCont
        this.contactListChangedEvent.next(this.contacts.slice())
    }

    addContact(contact: Contact): void {
        if (!contact) {
            return
        }
        contact.id = (++this.maxId).toString()
        this.contacts.push(contact)
        this.contactListChangedEvent.next(this.contacts.slice())
    }

    getMaxId(): number {
        let maxId: number = 0
        this.contacts.forEach((doc) => {
            if (Number(doc.id) > maxId) {
                maxId = Number(doc.id)
            }
        })
        return maxId
    }
}
