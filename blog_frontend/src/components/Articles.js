import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CreatePost from "./CreatePost";

const Article = (props) => {
  const [post, setpost] = useState({id:null,title:null,content:null});
  const [Create , setCreate] = useState(0);
  const [token] = useCookies(['token'])

  const url = "http://localhost:8000/api/home";
  const auth = {
    headers: {
      // Authorization: `Token 6c8d44e39022fd297c93d54e79dd8733a609104b`,
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
      {Create===1?<CreatePost hideFunc={setCreate}/>:''}
      {post.id === null? <h1 className='text-danger text-center'>Please,Login to see articles...</h1>:post.map((item) => {
        return (
          <div className="post_div shadow" key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
            <p>{item.added}</p>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                DeletePost(item.id);
              }}
            >{item.id}
              <i className="fa fa-trash"></i>
            </button>
            <button className="btn btn-outline-success">
              <i className="fa fa-edit"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
