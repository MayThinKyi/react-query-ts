import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Post } from "../types/types"
type Props={
    post?:Post,
    actionHandler:(data:Post)=>void;
    formStatus:'add'| 'edit';
}

const PostForm = ({actionHandler,post,formStatus}:Props) => {
    console.log('post form',post)
     const [form,setForm]=useState<{[key:string] :string}>({
        title:'',
        body:''
     })
     const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setForm({...form,[e.target.id]:e.target.value})

     }
    const renderField=(label:string)=>{
        return <div>
            <span>{label}</span><br/>
            <input  id={label} value={form[label]} onChange={handleInput} />
        </div>
    }
    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault();
        if(formStatus==='add') {setForm({title:'',body:''})}
        actionHandler({
            id:post?.id || Math.random(),
           title:form.title,
           body:form.body
        });

        
    }
    useEffect(()=>{
        setForm({title:post?.title||'',body:post?.body||''})
    },[post])
  return (
    <form onSubmit={handleSubmit}>
      {renderField('title')}
      {renderField('body')}<br/>
        <button type="submit">{formStatus==='edit' ? 'Update Post' :'Add Post'}</button>
        <hr/>
    </form>
  )
}

export default PostForm
