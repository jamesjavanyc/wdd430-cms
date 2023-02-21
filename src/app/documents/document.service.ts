import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from "./document.model"
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxId: number;

  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>()

  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxId = this.getMaxId()
  }

  getDocuments(): Document[] {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });
    this.http.get<CommonResponse<Document[]>>
      ("http://localhost:5000/documents", {
      // ("https://wdd430-ceb4f-default-rtdb.firebaseio.com/documents.json", {
        headers: headers
      }).subscribe({
        next: response => {
          this.documents = response.data
          this.maxId = this.getMaxId()
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          )
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: error => {
          console.log()
          console.error("HTTP request error:", error)
        }
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
    this.http.delete('http://localhost:5000/documents/' + document.id).subscribe(() => {
      this.documents.splice(pos, 1);
      this.documentListChangedEvent.next(this.documents.slice());
    })
    // this.storeDocuments()
  }

  addDocument(document: Document): void {
    if (!document) {
      return
    }
    this.maxId++
    document.id = this.maxId.toString()
    this.documents.push(document)
    this.documentListChangedEvent.next(this.documents.slice());
    // this.storeDocuments()
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
    this.documentListChangedEvent.next(this.documents.slice());
    // this.storeDocuments()
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

  // storeDocuments() {
  //   let documents = JSON.stringify(this.documents)
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   this.http.put('https://wdd430-ceb4f-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
  //     .subscribe(
  //       () => {
  //         this.documentListChangedEvent.next(this.documents.slice());
  //       }
  //     )
  // }
}
