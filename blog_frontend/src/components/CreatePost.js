import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const CreatePost = (props) => {
  const [token] = useCookies("token");
  const [title_inp, settitle_inp] = useState("");
  const [content_inp, setcontent_inp] = useState("");
  const url = "http://localhost:8000/api/home";
  const auth = {
    headers: {
      Authorization: `Token ${token["token"]}`,
    },
  };

  const hideCreate = () => {
    props.hideFunc(0);
  };

  console.log(props.EditCheck);
  const CreatePost = (e) => {
    e.preventDefault();
    const data = {
      title: title_inp,
      content: content_inp,
    };
    if (props.EditCheck === 0) {
      axios
        .post(url+'/', data, auth)
        .then(function (response) {
          console.log(response);
          props.UpdateData(data);
        })
        .catch(function (error) {
          console.log(`Error : `, error);
        });
    }else{
      axios.patch(`${url}/${props.CurrentPost.id}/`,data,auth).then((response) => {
        props.UpdateData(data);
        console.log(response.data)
      }).catch((error) => {
        console.log('Error',error)
        
      });
    }
  };

  useEffect(() => {
    setcontent_inp(props.CurrentPost.content);
    settitle_inp(props.CurrentPost.title);
    // SetEditCheck(1)
  }, [props.CurrentPost]);

  return (
    <div>
      <form action="" onSubmit={CreatePost} className="w-50 mt-5 m-auto">
        <input
          className="form-control my-2"
          type="text"
          value={title_inp}
          placeholder="Title"
          onChange={(e) => {
            settitle_inp(e.target.value);
          }}
        />
        <textarea
          className="form-control my-2"
          type="text"
          value={content_inp}
          placeholder="Content"
          onChange={(e) => {
            setcontent_inp(e.target.value);
          }}
        />

        {props.EditCheck===1?<button className="btn btn-outline-success my-2">Update</button>:<button className="btn btn-outline-success my-2">Publish</button>}
        <button className="btn btn-outline-info ms-2 " onClick={hideCreate}>
          Close
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
