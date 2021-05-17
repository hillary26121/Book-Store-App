import { useEffect, useHistory } from 'react';
import axios from 'axios';
import SignIn from './SignIn';

function BookShelf({token, setToken, username, password}){
const getBooks = () =>{
    axios.request({
    method:'GET',
    url: '/api/bookshelf',
    headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data:{
    username: username,
    password: password
    }
    })
    .then( (response)=>{
        setToken(response.data.token)
        console.log(response)
    })
 
    
}



if(token){

    return(
        <div>
        <h1>My Bookshelf</h1>
        </div>
    )
}
    else{
        return <SignIn/>
    }
}
export default BookShelf;