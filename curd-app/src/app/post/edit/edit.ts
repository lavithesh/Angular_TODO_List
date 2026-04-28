import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
 id ='';
 title = '';
  body = '';
  error='';

  constructor(private postSevice: PostService,private router:Router,private route:ActivatedRoute,private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['postId'];
    this.postSevice.findPosts(this.id).subscribe((post:Post)=>{
      console.log(post)
      this.title=post.title;
      this.body=post.body;
      this.cdr.detectChanges();
    })
  }

  submit(){
    
    if(!this.title || !this.body){
      this.error="Title and Body fields are required";
      return;
    }
    const input={
      title:this.title,
      body:this.body,
      id:1
    }

    this.postSevice.updatePost(this.id,input).subscribe();
    alert("Post updated");

    this.router.navigate(['/posts'])
  }

}
