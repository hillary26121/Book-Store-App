import { useEffect, useHistory, useContext, useState} from 'react';
import axios from 'axios';
import { AccessTokenContext } from "../Context/AccessTokenContext";
import {AccessTokenProvider} from '../Context/AccessTokenContext'



function BookShelf(){
    const { getToken, setToken } = useContext(AccessTokenContext);
    const { bookShelf, setBookShelf } = useState('');
const getBookShelf = () =>{
    axios.request({
    method:'GET',
    url: '/api/bookshelf',
    headers:{
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
    },
    })
    .then( (response)=>{
        console.log(response.data.books)
        setBookShelf(response.data.books)
        
    })
 
    
}






    return(
        <div>
        <h1>My Bookshelf</h1>
        <button onClick={getBookShelf}>click</button>
        </div>
    )

}
export default BookShelf;