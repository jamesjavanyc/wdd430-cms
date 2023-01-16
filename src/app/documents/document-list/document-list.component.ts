import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  constructor(public documentService: DocumentService) {
    
  }
  
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  documents: Document[] = []

  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    // this.selectedDocumentEvent.emit(document);
    // console.log(document)
    this.documentService.documentSelectedEvent.emit(document)
  }

}
