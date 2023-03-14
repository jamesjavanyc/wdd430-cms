import { Component,  Input } from '@angular/core';
import Post from '@app/documents/post.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {

  @Input() document!: Post;

}
