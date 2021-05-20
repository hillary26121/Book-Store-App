import { useEffect, useHistory, useContext} from 'react';
import axios from 'axios';
import SignIn from './SignIn';
import { AccessTokenContext } from "../Context/AccessTokenContext";
import {AccessTokenProvider} from '../Context/AccessTokenContext'

// const { getToken } = useContext(AccessTokenContext);

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