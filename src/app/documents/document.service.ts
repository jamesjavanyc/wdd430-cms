import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from "./document.model"
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxId: number;

  http: HttpClient;

  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>()

  documentListChangedEvent = new Subject<Document[]>();

  constructor(http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxId = this.getMaxId()
    this.http = http
  }

  getDocuments(): Document[] {
    console.log(111)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin":"*"
    });
    this.http.get<{ message: string, documents: Document[] }>
      ("https://wdd430-ceb4f-default-rtdb.firebaseio.com/documents", {
        headers:headers
      }).subscribe({
        next: response => {
          this.documents = response.documents
          this.maxId = this.getMaxId()
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          )
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: error =>
          console.error("HTTP request error:", error)
      })
    return this.documents.slice(0, this.documents.length)
  }

  getDocument(id: string): Document {
    let res: Document = null
    for (let document of this.documents) {
      if (document.id === id) {
        res = document;
      }
    }
    return res;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments()
  }

  addDocument(document: Document): void {
    if (!document) {
      return
    }
    this.maxId++
    document.id = this.maxId.toString()
    this.documents.push(document)
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments()
  }

  updateDocument(original: Document, newDoc: Document): void {
    if (!original || !newDoc) {
      return
    }
    let pos: number = this.documents.indexOf(original)
    if (pos < 0) {
      return
    }
    newDoc.id = original.id
    this.documents[pos] = newDoc
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments()
  }


  getMaxId(): number {
    let maxId: number = 0
    this.documents.forEach((doc) => {
      if (Number(doc.id) > maxId) {
        maxId = Number(doc.id)
      }
    })
    return maxId
  }

  storeDocuments() {
    let documentsStr = JSON.stringify(this.documents)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put('https://cms-app-d5fce.firebaseio.com/documents.json', documentsStr, { headers: headers })
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }
}
