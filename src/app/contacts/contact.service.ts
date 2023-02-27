import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { CommonResponse } from '@app/http/response.model';


@Injectable(
    {
        // 向root module中注入唯一的contactService单例
        providedIn: 'root'
    }
)
export class ContactService {

    contacts: Contact[] = [];

    http: HttpClient

    maxId: number;

    contactSelectedEvent = new EventEmitter<Contact>();

    // contactChangedEvent = new EventEmitter<Contact[]>();

    contactListChangedEvent = new Subject<Contact[]>();

    constructor(http: HttpClient) {
        // this.contacts = MOCKCONTACTS;
        // this.maxId = this.getMaxId()
        this.http = http

    }

    getContacts(): Contact[] {
        this.http.get<CommonResponse<Contact[]> >
            ("http://localhost:5000/contacts").subscribe({
                next: response => {
                    this.contacts = response.data
                    this.maxId = this.getMaxId()
                    this.contactListChangedEvent.next(this.contacts.slice());
                },
                error: error =>
                    console.error("HTTP request error:", error)
            })
        return this.contacts.slice(0, this.contacts.length)
    }

    getContact(id: string): Contact {
        if (this.contacts.length == 0) {
            this.getContacts()
        }
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
        // this.contactListChangedEvent.next(this.contacts.slice())
        this.storeContacts()
    }

    updateContact(original: Contact, newCont: Contact): void {
        if (!original || !newCont) {
            return
        }
        let pos: number = this.contacts.indexOf(original)
        if (pos < 0) {
            return
        }
        newCont.id = original.id
        this.contacts[pos] = newCont
        // this.contactListChangedEvent.next(this.contacts.slice())
        this.storeContacts()
    }

    addContact(contact: Contact): void {
        if (!contact) {
            return
        }
        contact.id = (++this.maxId).toString()
        this.contacts.push(contact)
        // this.contactListChangedEvent.next(this.contacts.slice())
        this.storeContacts()
    }

    getMaxId(): number {
        let maxId: number = 0
        console.log(this.contacts)
        this.contacts.forEach((doc) => {
            if (Number(doc.id) > maxId) {
                maxId = Number(doc.id)
            }
        })
        return maxId
    }

    storeContacts() {
        let contacts = JSON.stringify(this.contacts)
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.http.put('http://localhost:5000/contacts', contacts, { headers: headers })
            .subscribe(()=>this.contactListChangedEvent.next(this.contacts.slice()));
    }
}
