import { Component, EventEmitter,Output } from '@angular/core';
import Document from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  documents: Document[] = [
    new Document("1", "WDD130", "class1", "www.google.com", []),
    new Document("2", "WDD230", "class2", "www.google.com", []),
    new Document("3","WDD330", "class3","www.google.com", []),
  ]

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
    // console.log(document)
  }

}
