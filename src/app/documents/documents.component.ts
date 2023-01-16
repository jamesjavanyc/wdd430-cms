import { DocumentService } from './document.service';
import { Component, OnInit } from '@angular/core';
import Document from '@app/documents/document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(public documentService: DocumentService) {

  }
  selectedDocument!: Document;

  setSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    })
  }
}
