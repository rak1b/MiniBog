import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Article = (props) => {
  const [token] = useCookies(['token'])
  const url = "http://localhost:8000/api/home";
  const auth = {
    headers: {
      Authorization: `Token ${token['token']}`,
    },
  };



   

  const DeletePost = (id) => {
    axios.delete(`${url}/${id}`, auth).then((response) => {
      props.UpdateDeletedData(id);
      console.log(response.data)
    }).catch((error) => {
      console.log('Error',error)
      
    });
    
  }; 
  
  const EditPost = (id) => {
    axios.patch(`${url}/${id}`, auth).then((response) => {
      props.UpdateEditedData(id);
      console.log(response.data)
    }).catch((error) => {
      console.log('Error',error)
      
    });
    
  };

  



  return (
    <>
      {props.post.map((item) => {
        return (
          <div className="post_div shadow" key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
            <p>{item.added}</p>
            <p>{item.id}</p>
            <button
              className="btn btn-outline-danger me-2"
              onClick={() => {
                DeletePost(item.id);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
            <button className="btn btn-outline-success" onClick={() => {
                props.setCreate(1) 
                props.SetCurrentPost(item);

              }}>
              <i className="fa fa-edit"></i>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Article;
