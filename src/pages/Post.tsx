import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../api/posts';

const Post = () => {
    const navigate=useNavigate();
    const  {postId}=useParams();
    const {data:post,isLoading}=useQuery({
        queryKey:['post',postId],
        queryFn:()=>getPost(Number(postId))
    })
    if(isLoading) return <h2>Loading...</h2>
  return (
    <div>
        <button onClick={()=>navigate('/')}>Back to All Posts</button>
        <h1>Post : {postId}</h1>
        <h2>{post?.title}</h2>
        <p>{post?.body}</p>
    </div>
  )
}

export default Post
