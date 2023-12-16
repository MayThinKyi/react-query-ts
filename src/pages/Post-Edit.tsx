import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, updatePost } from '../api/posts';
import PostForm from '../components/PostForm';
import { Post } from '../types/types';

const PostEdit = () => {
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const {postId}=useParams();
    const {data:post,isLoading}=useQuery({
        queryKey:['posts','post',postId],
        queryFn:()=>getPost(Number(postId))
    })
    const updatePostMutation=useMutation({
        mutationFn:updatePost,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['posts',postId]});
            navigate('/');

        }
    })
    const updatePostHandler=(post:Post)=>{
        updatePostMutation.mutate({...post})
    }
    
    if(isLoading) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Post Edit :{postId}</h2>
      <PostForm formStatus='edit' actionHandler={updatePostHandler} post={post} />
    </div>
  )
}

export default PostEdit
