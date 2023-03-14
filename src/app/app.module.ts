import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DndModule } from 'ng2-dnd';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './service/auth.service';
import { DocumentsComponent } from './documents/posts.component';
import { DocumentListComponent } from './documents/post-list/document-list.component';
import { DocumentItemComponent } from './documents/post-item/document-item.component';
import { DocumentDetailComponent } from './documents/post-detail/document-detail.component';
import { DocumentEditComponent } from './documents/post-edit/document-edit.component';
import { PostsFilterPipe } from './documents/post-filter.pipe';

@NgModule({
  // 声明组件， 管道符 指令
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    LoginComponent,
    RegisterComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    PostsFilterPipe
  ],
  // 模块 针对全局
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DndModule.forRoot(),
    HttpClientModule
  ],
  // 服务注入
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
