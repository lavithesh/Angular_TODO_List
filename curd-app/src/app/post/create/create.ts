import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  title = '';
  body = '';
  error='';

  constructor(private postSevice: PostService,private router:Router){}

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

    this.postSevice.createPost(input).subscribe();
    alert("Post created");

    this.router.navigate(['/posts'])
  }
}
