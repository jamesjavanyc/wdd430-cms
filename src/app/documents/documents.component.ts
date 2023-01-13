import { Component, OnInit } from '@angular/core';
import  Document from '@app/documents/document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {


  selectedDocument!: Document;

  setSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }

  ngOnInit(): void {

  }
}
