import { EventEmitter, Injectable } from '@angular/core';
import Post from "./post.model"
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CommonResponse from '@app/http/response.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxId: number;

  documents: Post[] = [];

  documentSelectedEvent = new EventEmitter<Post>()

  documentListChangedEvent = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router, private route:ActivatedRoute) {

  }

  getDocuments(): Post[] {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });
    this.http.get<Post[]>
      ("http://localhost:5000/posts", {
        headers: headers
      }).subscribe({
        next: response => {
          this.documents = response
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: error => {
          console.error("HTTP request error:", error)
        }
      })
    return this.documents.slice(0, this.documents.length)
  }

  getDocument(id: string): Post {
    let res: Post = null
    for (let document of this.documents) {
      if (document._id === id) {
        res = document;
      }
    }
    return res;
  }

  deleteDocument(document: Post) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:5000/posts/' + document._id).subscribe(() => {
      this.documents.splice(pos, 1);
      this.router.navigate(['/posts'], { relativeTo: this.route });
      this.documentListChangedEvent.next(this.documents.slice());
    })
  }

  addDocument(document: Post): void {
    if (!document) {
      return
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    });
    this.http.post("http://localhost:5000/posts", document).subscribe({
      next: response => {
        this.documents.push(response as Post)
        this.router.navigate(['/posts'], { relativeTo: this.route });
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error: error => {
        console.error("HTTP request error:", error)
      }
    })
  }

  updateDocument(original: Post, newDoc: Post): void {
    if (!original || !newDoc) {
      return
    }
    let pos: number = this.documents.indexOf(original)
    if (pos < 0) {
      return
    }
    this.http.put("http://localhost:5000/posts/" + original._id, newDoc).subscribe({
      next: response => {
        this.documents[pos].title = newDoc.title
        this.documents[pos].body = newDoc.body
        this.router.navigate(['/posts'], { relativeTo: this.route });
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error: error => {
        console.error("HTTP request error:", error)
      }
    })
  }

}
