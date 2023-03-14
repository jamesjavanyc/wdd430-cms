import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Post from '../post.model';
import { DocumentService } from '../posts.service';

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
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Post[]) => {
      this.documents = documents;
    })
  }

  documents: Post[] = []

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
