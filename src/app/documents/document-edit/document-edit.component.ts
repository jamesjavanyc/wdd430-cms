import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }

  originalDocument: Document;

  document: Document;

  editMode: boolean = false;

  onSubmit(form: NgForm) {
    const values = form.value;
    const newDocument = new Document(null, values.name, values.description, values.url, null);
		if (this.editMode === true) {
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
		this.router.navigate(['/documents'], { relativeTo: this.route });
	}
}
