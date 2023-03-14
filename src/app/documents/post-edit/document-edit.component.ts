import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Post from '../post.model';
import { DocumentService } from '../posts.service';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }

  originalDocument: Post;

  document: Post

  editMode: boolean = false;

  onSubmit(form: NgForm) {
    const values = form.value;
    const newDocument = new Post(null, values.name, values.description);
    if (this.editMode === true) {
      console.log("edit")
			this.documentService.updateDocument(this.originalDocument, newDocument);
		} else {
			this.documentService.addDocument(newDocument);
		}
		this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(id);
        if (!this.originalDocument) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onCancel() {
		this.router.navigate(['/posts'], { relativeTo: this.route });
	}
}
