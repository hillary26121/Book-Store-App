import { useEffect, useHistory, useContext, useState } from "react";
import axios from "axios";
import { AccessTokenContext } from "../Context/AccessTokenContext";
import { AccessTokenProvider } from "../Context/AccessTokenContext";

function Search() {
  const { getToken, setToken, logOut } = useContext(AccessTokenContext);
  const [search, setSearch] = useState('');
  const [userInput, setUserInput] = useState("");

  const searchBooks = (bookTitle)=>{
      axios.request({
          method: 'GET',
          url: `/api/book/search/${bookTitle}`,
          headers:{
              Authorization: `Bearer ${getToken}`,
              'Content-Type': 'application/json'
          }
      })
      .then( (response)=>{
        console.log(response)
        setSearch(response.data.books)
      })
  }
  return (
    <div>
      <label htmlFor="">Search For Books:</label>
      <input
        type="text"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      {/* {books.map( (book)=>{
          return(
              <div>{book}</div>
          )
      })} */}
      <button onClick={searchBooks}>Search API</button>
      <button onClick = {logOut}>Click to log out</button>
    </div>
  );
}

export default Search;
