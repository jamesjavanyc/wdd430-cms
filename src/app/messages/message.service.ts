import { CommonResponse } from './../http/response.model';
import { ContactService } from '@app/contacts/contact.service';
import { EventEmitter, Injectable } from '@angular/core';
import Message from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  http: HttpClient

  maxId: number

  messages: Message[] = []

  messageChangedEvent = new EventEmitter<Message[]>()

  constructor(http: HttpClient, contactService:ContactService) { 
    this.http = http
    contactService.getContacts()
    // this.messages = MOCKMESSAGES
  }

  getMessages(): Message[] {
    this.http.get<CommonResponse<Message[]> >
    ("http://localhost:5000/messages").subscribe({
      next: response => {
        this.messages = response.data
        console.log(this.messages)
        this.maxId = this.getMaxId()
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: error =>
        console.error("HTTP request error:", error)
    })
    // if (this.messages.length == 0) {
    //   fetch("../../assets/week11/messages.json")
    //     .then(res => res.json())
    //     .then(res => {
    //       for (let d of res) {
    //         console.log(d)
    //         this.addMessage(d)
    //       }
    //     })
    //   }
    return this.messages.slice(0, this.messages.length)
  }

  getMaxId() {
    let maxId: number = 0
    this.messages.forEach((msg) => {
      if (Number(msg.id) > maxId) {
        maxId = Number(msg.id)
      }
    })
    return maxId
  }

  getMessage(id: string): Message {
    let res: Message = null
    for (let message of this.messages) {
      if (message.id === id) {
        res = message;
      }
    }
    return res;
  }

  addMessage(message: Message) {
    if (!message) {
      //exit
      return;
    }
    // this.messageChangedEvent.emit(this.messages.slice(0, this.messages.length))
     //set headers
      const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //convert object to string to send on request
    message.id = '';
    const strMessage = JSON.stringify(message);

    //send request with object and headers
    this.http.post('http://localhost:5000/messages', strMessage, { headers: headers })
      //subscribe to response
      .subscribe(() => {
        this.messages.push(message)
        this.messageChangedEvent.next(this.messages.slice());
      });
  }


  // storeMessages() {
  //   let str = JSON.stringify(this.messages)
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   this.http.put('http://localhost:5000/messages', str, { headers: headers })
  //     .subscribe(
  //       () => {
  //         this.messageChangedEvent.next(this.messages.slice());
  //       }
  //     )
  // }

}
