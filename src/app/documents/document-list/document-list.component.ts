import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Document from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  private subscription: Subscription;
  constructor(public documentService: DocumentService) {
    
  }
  
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    })
  }

  documents: Document[] = []

  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // onSelectedDocument(document: Document) {
  //   // this.selectedDocumentEvent.emit(document);
  //   // console.log(document)
  //   this.documentService.documentSelectedEvent.emit(document)
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
