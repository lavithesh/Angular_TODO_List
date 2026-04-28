import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './index.html',
  styleUrls: ['./index.css'],
})
export class Index implements OnInit{
  posts:Post[] =[];

  constructor(private postService: PostService,private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.loadPost();
  }

  deletePost(id:number){
    if(confirm("Are you sure to remove this post?")){
      this.postService.deletePosts(id).subscribe(()=>{
      this.loadPost();
      });
    }
  }

  loadPost(){
      this.postService.getPosts().subscribe((data: Post[])=>{
    console.log("FULL RESPONSE => ", data);
    console.log("TYPE => ", typeof data);
    console.log("IS ARRAY => ", Array.isArray(data));
    this.posts = data;
    this.cdr.detectChanges();
     
    });
  }

}
