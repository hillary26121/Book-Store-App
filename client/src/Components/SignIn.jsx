import {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AccessTokenContext } from "../Context/AccessTokenContext";
import {AccessTokenProvider} from '../Context/AccessTokenContext'
import axios from 'axios';


function SignIn() {

    
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, getToken } = useContext(AccessTokenContext);
    const history = useHistory();
  
    const signIn = (e)=>{
      setIsLoading(true);
      axios.request({
        method: 'POST',
        url: '/api/signin',
        headers: {
          Authorization: `Bearer ${getToken}`,
          'Content-Type': 'application/json',
        },
        data:{
         username: username,
         password: password,
          
        }
      
      })
      
      .then((response)=>{
        login(response.data.token)
        history.push('/bookshelf')
        console.log(response)
      })
      .catch( (error)=>{
        console.error(error);
        if(error.response && error.response.status === 401){
          setErrorMessage("You done messed up partner. Try the CORRECT information this time!");
        } else{setErrorMessage("actually, i have no idea what's messed up. try again later!")}
      })
    }
  

  

 return(
    
    <>
     <label htmlFor="">Username: </label>
     <input value = {username} onChange = {(e)=>{setUsername(e.target.value)}}type="text"/>
     <label htmlFor="">Password: </label>
     <input value = {password} onChange = {(e)=>{setPassword(e.target.value)}}type="password"/>
     <button onClick= {signIn}> Sign In</button>
     {isLoading && <p>Loading ...</p>}
     {errorMessage && (
        <div id = 'error-message' class= 'alert alert danger'>
          {errorMessage}
        </div>
      )}
    
    
    </>
    )

}

export default SignIn;