import { useContext, useState } from "react";
import axios from "axios";
import { AccessTokenContext } from "../Context/AccessTokenContext";
import { AccessTokenProvider } from "../Context/AccessTokenContext";

function Search() {
  const { getToken, logOut } = useContext(AccessTokenContext);
  const [search, setSearch] = useState('');
  const [userInput, setUserInput] = useState("");

  const searchBooks = ()=>{
      axios.request({
          method: 'GET',
          url: `/api/book/search/${userInput}`,
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
  const addBook = (bookId, shelfKey) => {
    axios
      .request({
        method: "PUT",
        url: `/api/bookshelf/${bookId}/${shelfKey}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
      })
  };
  return (
    <div>
        <button onClick={logOut} class = 'log-out'>Click to Log Out</button>
      <div><label htmlFor="" id = 'search-label'>Search For Books: </label>
      <input
        id = 'search-input'
        type="text"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        
      />
      <button onClick={searchBooks} class = 'search-button'>Search</button>
      {search && search.map( (book)=>{
          return(
          <div> <h3>{book.title}</h3>
          <img
            src={book.imageLinks && book.imageLinks.thumbnail}
            alt=""
          />
            <select name="" id="book-dropdown" onChange={(e)=>addBook(book.id, e.currentTarget.value)}>
              <option value="">Add to a shelf</option>
              <option value="wantToRead">
                Want to Read
              </option>
              <option value="currentlyReading" >Currently Reading</option>
              <option value="read">Read</option>
              
            </select>
           
          </div>
          )
      })}
      </div>
      
    </div>
  );
}

export default Search;
