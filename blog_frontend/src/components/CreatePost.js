import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const CreatePost = (props) => {
  const [token] = useCookies("token");
  console.log(`Cookie here : ${token.token}`);
  // const title_inp = useRef("test");
 const [title_inp, settitle_inp] = useState('')
 const [content_inp, setcontent_inp] = useState('')
  const [post, setpost] = useState({title:null,content:null});
  const data = {
    title: post.title,
    content: post.content,
  };

  console.log(props.CurrentPost)

  const url = "http://localhost:8000/api/home/";
  
  const auth = {
    headers: {
      Authorization: `Token ${token["token"]}`,
    },
  };

  const hideCreate = () => {
    props.hideFunc(0);
  };

  const CreatePost = (e) => {
    e.preventDefault();
    setpost({
      title: title_inp,
      content: content_inp,
    });

  };

useEffect(() => {
  setcontent_inp(props.CurrentPost.content)
  settitle_inp(props.CurrentPost.title)
}, [props.CurrentPost])
  

  // useEffect(() => {
  //   if(post.title!==null){
  //   axios
  //   .post(url, data, auth)
  //   .then(function (response) {
  //     console.log(response);
  //     props.UpdateData(data);
  //   })
  //   .catch(function (error) {
  //     console.log(`Error : `,error);
  //   });

  // }
  // }, [post])

  return (
    <div>
      
      <form action="" onSubmit={CreatePost} className="w-50 mt-5 m-auto">
        <input
          className="form-control my-2"
          type="text"
          value={post.title}
          // value={props.CurrentPost.title}

          placeholder="Title"
          onChange={(e) => {
          settitle_inp(e.target.value)
            
            
          }}
          

        />
        <textarea
          className="form-control my-2"
          type="text"
          value={post.content}
          placeholder="Content"
          onChange={(e) => {
          setcontent_inp(e.target.value)
            
            
          }}

        />
        <button className="btn btn-outline-success my-2">Publish</button>
        <button className="btn btn-outline-info ms-2 " onClick={hideCreate}> Close</button>
      </form>
    </div>
  );
};

export default CreatePost;
