import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DocumentsComponent } from './documents/posts.component';
import { DocumentEditComponent } from './documents/post-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/post-detail/document-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'posts',
        component: DocumentsComponent,
        children: [
            {
                path: 'new',
                component: DocumentEditComponent
            },
            {
                path: 'mine',
                component: DocumentEditComponent
            },
            {
                path: ':id',
                component: DocumentDetailComponent
            },
            {
                path: ':id/edit',
                component: DocumentEditComponent
            }
        ]
    },
    {
        path: 'documents',
        redirectTo: '/posts'
    },
]


//ngModel导入导出路由对象
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
