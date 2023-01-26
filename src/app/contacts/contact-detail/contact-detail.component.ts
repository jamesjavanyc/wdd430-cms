import { ContactService } from '@app/contacts/contact.service';
import { Component, Input, OnInit } from '@angular/core';
import Contact from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
  @Input() contact!: Contact
  
  constructor(private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.contact = this.contactService.getContact(params['id']);
      }
    )
  }

  onDelete() {
    //delete using service
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}
