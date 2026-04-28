import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './show.html',
  styleUrl: './show.css',
})
export class Show {
   id = '';
   title = '';
   body = '';


   
  constructor(private postSevice: PostService,private route:ActivatedRoute,private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['postId'];
    this.postSevice.findPosts(this.id).subscribe((post:Post)=>{
      console.log(post)
      this.title=post.title;
      this.body=post.body;
      this.cdr.detectChanges();
    })
  }


}


