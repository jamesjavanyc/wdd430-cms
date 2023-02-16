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

  constructor(http: HttpClient) { 
    this.http = http
    // this.messages = MOCKMESSAGES
  }

  getMessages(): Message[] {
    this.http.get<{ message: string, messages: Message[] }>
    ("https://wdd430-ceb4f-default-rtdb.firebaseio.com/messages").subscribe({
      next: response => {
        this.messages = response.messages
        this.maxId = this.getMaxId()
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: error =>
        console.error("HTTP request error:", error)
    })
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
    this.messages.push(message)
    // this.messageChangedEvent.emit(this.messages.slice(0, this.messages.length))
    this.storeMessages()
  }


  storeMessages() {
    let str = JSON.stringify(this.messages)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put('https://cms-app-d5fce.firebaseio.com/messages.json', str, { headers: headers })
      .subscribe(
        () => {
          this.messageChangedEvent.next(this.messages.slice());
        }
      )
  }

}
