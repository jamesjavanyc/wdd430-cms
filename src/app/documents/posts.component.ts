import { DocumentService } from './posts.service';
import { Component, OnInit } from '@angular/core';
import Post from '@app/documents/post.model';
import { AuthService } from '@app/service/auth.service';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'cms-documents',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(public auth:AuthService,private router: Router,public documentService: DocumentService,private route: ActivatedRoute) {
    if (!this.auth.email) {
      this.router.navigate(['/login']);
    };
  }
  selectedDocument!: Post;

  setSelectedDocument(document: Post) {
    this.selectedDocument = document;
  }
  
  ngOnInit() {
    let urls = window.location.href.split("/")
    if (urls[urls.length - 1] !== "mine") {
      this.router.navigate(['/posts'], { relativeTo: this.route });
    }
    this.auth.email$.subscribe(email => {
      if (!this.auth.email) {
        this.router.navigate(['/login']);
      };
    });
    this.documentService.documentSelectedEvent.subscribe((document: Post) => {
      this.selectedDocument = document;
    })
  }
}
