import { Injectable, EventEmitter} from '@angular/core';
import Contact from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    // 向root module中注入唯一的contactService单例
    providedIn: 'root'
})
export class ContactService {
    // hold the selected contact
    //contactChangedEvent = new EventEmitter<Contact>();


    constructor() {

    }
}