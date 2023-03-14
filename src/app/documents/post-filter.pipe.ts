import { AuthService } from './../service/auth.service';
import { Pipe, PipeTransform } from '@angular/core';
import Post from './post.model';

@Pipe({
    name: 'postsFilter'
})
export class PostsFilterPipe implements PipeTransform {
    constructor(private auth:AuthService) {
        
    }

    transform(contacts: any, [term]: any) {
        console.log("Filter")
        let filteredArray: Post[] = [];
        filteredArray = contacts.filter(
            (contact: any) => contact.author == this.auth.email
        );
        return filteredArray;
    }
}
