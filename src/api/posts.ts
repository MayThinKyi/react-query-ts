import axios from "axios"
import { Post } from "../types/types";

export async function getAllPosts(){
     const res=await axios.get<Post[]>('http://localhost:3000/posts');
     const data= res.data;
     return data;
}

export async function getPost(id:number){
    const res=await axios.get<Post>(`http://localhost:3000/posts/${id}`);
    const data= res.data;
    return data;
}

export async function createPost(post:Post){
    const res=await axios.post<Post>('http://localhost:3000/posts',{
       ...post
    });
    const data= res.data;
    return data;
}
export async function deletePost(id:number){
    const res=await axios.delete(`http://localhost:3000/posts/${id}`);
    return res.data;
}

export async function updatePost(data:Post){
    const res=await axios.put(`http://localhost:3000/posts/${data.id}`,data);
    const up=await res.data;
    return data;
}