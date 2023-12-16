import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost, deletePost, getAllPosts } from "../api/posts"
import PostForm from "../components/PostForm"
import { Post } from "../types/types"
import { Link } from "react-router-dom"

const Posts = () => {
    const queryClient=useQueryClient();
    const {data:posts,isLoading}=useQuery({
        queryKey:['posts'],
        queryFn:getAllPosts
    })
    const createPostMutation=useMutation({
        mutationFn:createPost,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['posts']})
        }
    })
    const createPostHandler=(data:Post)=>{
        createPostMutation.mutate(data);
    };
    const deletePostMutation=useMutation({
        mutationFn:deletePost,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['posts']})
        }
    })
    const deletePostHandler=(id:number)=>{
        deletePostMutation.mutate(id)
    }

    if(isLoading) return <h2>Loading...</h2>
    
  return (
    <div>
        <PostForm formStatus='add' actionHandler={createPostHandler} />
        <h2>Post Lists</h2>
        <div>
            {posts?.map((post)=>{
                return <div key={post.id}>
                <Link to={`/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p>{post.body}</p>
                <Link to={`/${post.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={()=>deletePostHandler(post.id)}>Delete</button>
                <hr/>
                </div>
            })}
        </div>
    </div>
  )
}

export default Posts
