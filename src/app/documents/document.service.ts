import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from "./document.model"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxId: number;

  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>()

  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxId = this.getMaxId()
  }

  getDocuments(): Document[] {
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
    this.documentListChangedEvent.next(this.documents.slice());
  }

  addDocument(document: Document): void {
    if (!document) {
      return
    }
    this.maxId++
    document.id = this.maxId.toString()
    this.documents.push(document)
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(original: Document, newDoc: Document): void{
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
}
