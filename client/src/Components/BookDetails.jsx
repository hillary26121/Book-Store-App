import axios from 'axios';
import { useState, useContext, useEffect } from 'react';   
import { useParams } from 'react-router-dom';
import { AccessTokenContext } from "../Context/AccessTokenContext";
import { AccessTokenProvider } from "../Context/AccessTokenContext";

function BookDetails(){
    const {getToken, logOut} = useContext(AccessTokenContext);
    const { bookId } = useParams();
    const [details, setDetails] = useState();
    const [errorMessage, setErrorMessage] = useState('');
  

    const getBookDetails = () => {
        console.log(bookId)
        axios
          .request({
            method: "GET",
            url: `/api/book/${bookId}`,
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setDetails(response.data.book);
            
          })
          .catch( (error)=>{
            console.error(error);
            if(error.response && error.response.status === 401){
              setErrorMessage("You aren't logged in!");
            } else{setErrorMessage("Something is wrong here, come back later when I've figured out my life.")}
          })
      };

      useEffect( ()=>{
        getBookDetails();
      }, [])
 return(
    <div>
        <button onClick = {logOut} class = 'log-out'>Click to Log Out</button>
        {details ?
            (
                <div><h2>{details.title}</h2>
                <img src={details.imageLinks && details.imageLinks.thumbnail} alt=""/>
                <h3>{details.author && details.author}</h3>
                <h3>{details.description && details.description}</h3>
                </div>

            )
            :<div></div>
        }
    </div>
 )
}
export default BookDetails;