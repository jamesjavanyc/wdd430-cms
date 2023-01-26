import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from "./document.model"

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>()

  documentChangedEvent = new EventEmitter<Document[]>()

  constructor() {
    this.documents = MOCKDOCUMENTS;
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
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
