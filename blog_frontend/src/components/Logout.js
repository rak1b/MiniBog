import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const [token,setToken,removeToken] = useCookies("token");
  const history = useHistory();

  useEffect(() => {
    removeToken("token",{ path: '/' });
    history.push("/login");

  },[]);

  return <div>Logging out</div>;
};

export default Logout;
