import React, { useState,useEffect } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useHistory} from 'react-router-dom'
 const Login = () => {
  const [token, settoken] = useCookies();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory() 

  useEffect(() => {
    if(token["token"]){
        history.push('/articles')
        console.log(token["token"])
    }
  },[token])
  const login = () => {
    const url = 'http://localhost:8000/api/auth';
    const data = {
      'username': username,
      'password': password,
    }

    axios
      .post("http://localhost:8000/api/auth", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        settoken('token',response.data.token)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className='w-50 mx-auto mt-4 shadow  p-5'>

      <input
        type="text"
        placeholder="username"
        onChange={(e) => {
          setusername(e.target.value);
        }}
        value={username}
        className='form-control my-4 '
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        value={password}
        className='form-control my-4 '

      />
      <button className='btn btn-outline-success' onClick={login}>Login</button>
    </div>
  );
};

export default Login;
