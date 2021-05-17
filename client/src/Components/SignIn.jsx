import {useState, useEffect} from 'react';
import axios from 'axios';
import BookShelf from './BookShelf'


function SignIn() {

    
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  
    const signIn = (e)=>{
      e.preventDefault();
      setIsLoading(true);
      axios.request({
        method: 'POST',
        url: '/api/signin',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data:{
         username: username,
         password: password,
          
        }
      
      })
      
      .then((response)=>{
        setToken(response.data.token)
        console.log(response)
      })
      .catch( (error)=>{
        console.error(error);
        if(error.response && error.response.status === 401){
          setErrorMessage("You done messed up parnter. Try the CORRECT information this time!");
        } else{setErrorMessage("actually, i have no idea what's messed up. try again later!")}
      })
    }
  
    const logout =()=>{
        setToken('');
        setIsLoading(false);
        setErrorMessage('');

    }

  
//   useEffect( ()=>{
//       signIn();
//   }, []); 
  
  if(token){
    return (<BookShelf token = {token} logout={logout} setToken={setToken} username = {username} password = {password}/> 
    )
    
  }else
  

 
    return(
    
    <>
     <label htmlFor="">Username: </label>
     <input value = {username} onChange = {(e)=>{setUsername(e.target.value)}}type="text"/>
     <label htmlFor="">Password: </label>
     <input value = {password} onChange = {(e)=>{setPassword(e.target.value)}}type="password"/>
     <button onClick= {signIn}> Sign In</button>
     {isLoading && <p>Loading ...</p>}
     {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    
    
    </>
    )

}

export default SignIn;