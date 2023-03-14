import { DocumentService } from '../posts.service';
import { Component, OnInit } from '@angular/core';
import Post from '../post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '@app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        //get the specific document (passing id param) and store it in document
        this.document = this.documentService.getDocument(params['id']);
      }
    )
  }



  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/posts'], { relativeTo: this.activatedRoute });
  }

  // @Input()
  document!: Post;

}
