import { ContactService } from './contacts/contact.service';
import { ContactsComponent } from './contacts/contacts.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

@NgModule({
  // 声明组件， 管道符 指令
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactsComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageEditComponent,
    MessageItemComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent,
  ],
  // 模块 针对全局
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  // 服务注入
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
