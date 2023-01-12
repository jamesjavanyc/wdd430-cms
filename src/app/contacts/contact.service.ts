import { Injectable} from '@angular/core';


@Injectable({
    // 向root module中注入唯一的contactService单例
    providedIn: 'root'
})
export class ContactService {
    constructor() {

    }
}