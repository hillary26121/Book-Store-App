import { createContext, useState } from "react";
import axios from 'axios';

export const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {
  const [token, setToken] = useState('');

  const login = (token) =>{
    setToken(token);
  }
  function logOut(){
    setToken(''); 
  }
  const getToken = ()=> token;
  const hasToken =() =>{
    if(token) return true;
    else return false;
  }

  const refreshToken = () =>{
     return axios
     .request({
         method: 'GET',
         url: '/api/refresh',
     })
     .then( (response)=>{
         setToken(response.data.token);
     })
     .catch( (error)=>{
         if(error.response && error.response.status === 401){
             
         }
     })
  }

  return<><AccessTokenContext.Provider
  value={{
    login,
    getToken,
    hasToken,
    logOut,
    refreshToken
  }}>
    {children}
    
    </AccessTokenContext.Provider></>
};