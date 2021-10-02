import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CreatePost from "./components/CreatePost";
import Article from "./components/Articles";

const BlogApp = (props) => {
  const [post, setpost] = useState({id:null,title:null,content:null});
  const [Create , setCreate] = useState(0);
  const [token] = useCookies(['token'])
  const [EditPost, setEditPost] = useState({})
  const url = "http://localhost:8000/api/home";
  const auth = {
    headers: {
      Authorization: `Token ${token['token']}`,
    },
  };
  useEffect(() => {
    if(token['token']){
    console.log(`Token ${token['token']}`)
    axios.get(url, auth).then(function (response) {
      setpost(response.data);
    }).catch((error) => {
      console.log('Error',error)
    })
  }
  }, [])


  const UpdateData = (newppost) => {
    setpost([newppost,...post])
    //Adding new added item at the begining
  }

  const UpdateDeletedData = (id) => {
    const updated_post = post.filter((current_post) => {
        return current_post.id!==id
      })

    console.log(updated_post);
    setpost(updated_post)
    
  }


   

  const DeletePost = (id) => {
    axios.delete(`${url}/${id}`, auth).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log('Error',error)
    });
    console.log('setting reload');
    
  };

  return (
    <div className="article_container">
      <div className="createDiv">
        <h2 className='text-center text-white'>
          View All Post or 
          <button className="btn btn-outline-info ms-2 " onClick={() => {
            setCreate(1)
          }}> Create New Post</button>
        </h2>
      </div>
      {Create===1?<CreatePost UpdateData={UpdateData}  CurrentPost={EditPost} hideFunc={setCreate}/>:''}
      
      {post.id === null? <h1 className='text-danger text-center'>Please,Login to see articles...</h1>:<Article post={post} setCreate={setCreate} SetCurrentPost = {setEditPost} UpdateDeletedData={UpdateDeletedData}   />}

    </div>
  );
};

export default BlogApp;
