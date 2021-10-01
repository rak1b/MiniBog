import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const CreatePost = (props) => {
  const [token] = useCookies("token");
  console.log(`Cookie here : ${token.token}`);
  const title_inp = useRef(null);
  const content_inp = useRef(null);

  const [post, setpost] = useState({title:null,content:null});

  const data = {
    title: post.title,
    content: post.content,
  };

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
      title: title_inp.current.value,
      content: content_inp.current.value,
    });

  };

  useEffect(() => {
    if(post.title!==null){
    axios
    .post(url, data, auth)
    .then(function (response) {
      console.log(response);
      props.UpdateData(data);
    })
    .catch(function (error) {
      console.log(`Error : `,error);
    });

  }
  }, [post])

  return (
    <div>
      <form action="" onSubmit={CreatePost} className="w-50 mt-5 m-auto">
        <input
          className="form-control my-2"
          type="text"
          ref={title_inp}
          placeholder="Title"
        />
        <textarea
          className="form-control my-2"
          type="text"
          ref={content_inp}
          placeholder="Content"
        />
        <button className="btn btn-outline-success my-2">Publish</button>
        <button className="btn btn-outline-info ms-2 " onClick={hideCreate}> Close</button>
      </form>
    </div>
  );
};

export default CreatePost;
