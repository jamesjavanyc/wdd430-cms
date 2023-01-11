import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Contact from '../contact.model';
import { ContactService } from "../contact.service"

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[] = [
    new Contact("1",
      "R. Kent Jackson",
      "jacksonk@byui.edu",
      "208-496-3771",
      "../../assets/images/jacksonk.jpg",
      []
    ),
    new Contact("2",
      "Rex Barzee",
      "barzeer@byui.edu",
      "208-496-3768",
      "../../assets/images/barzeer.jpg",
      []
    )
  ]

  @Output() selectContactEvent = new EventEmitter<Contact>()

  constructor(private contactService: ContactService) {
    
  }

  ngOnInit(): void {
    return
  }

  onSelected(contact: Contact): void{
    //  successfully emit
    // console.log(contact)
    this.selectContactEvent.emit(contact);
  }

}
