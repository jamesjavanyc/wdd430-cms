import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/documents',
        pathMatch: 'full'
    },
    {
        path: 'documents',
        component: DocumentsComponent,
    },
    {
        path: 'messages',
        component: MessageListComponent,
    },
    {
        path: 'contacts',
        component: ContactsComponent,
    }
]


//ngModel导入导出路由对象
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
