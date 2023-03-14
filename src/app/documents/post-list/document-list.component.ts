import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '@app/service/auth.service';
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

  public mine: boolean = false;

  constructor(public documentService: DocumentService, public auth:AuthService) {
    
  }
  
  ngOnInit(): void {
    let urls = window.location.href.split("/")
    if (urls[urls.length - 1] == "mine") {
      this.mine = true
    }
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
