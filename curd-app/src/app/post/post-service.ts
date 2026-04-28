import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL="http://localhost:8000/api";

  constructor(private http:HttpClient){}

    getPosts():Observable<Post[]>{
      return this.http.get<Post[]>(this.apiURL+"/posts");
    } 

    createPost(data: Post) : Observable<Post>{
      return this.http.post<Post>(this.apiURL+"/posts",data);
    }

    findPosts(id: string):Observable<Post>{
      return this.http.get<Post>(this.apiURL+"/posts/"+id);
    } 

    updatePost(id:string,data: Post) : Observable<Post>{
      return this.http.put<Post>(this.apiURL+"/posts/"+id, data);
    }

    deletePosts(id: number):Observable<any>{
      return this.http.delete<any>(this.apiURL+"/posts/"+id);
    }
  
}
