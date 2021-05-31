import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import { AccessTokenContext } from "../Context/AccessTokenContext";
import { AccessTokenProvider } from "../Context/AccessTokenContext";




function BookShelf() {
  const { getToken, logOut } = useContext(AccessTokenContext);
  const [bookShelf, setBookShelf] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
  const getBookShelf = () => {
    axios
      .request({
        method: "GET",
        url: "/api/bookshelf",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBookShelf(response.data.books);
      })
      .catch( (error)=>{
        console.error(error);
        if(error.response && error.response.status === 401){
          setErrorMessage("You aren't logged in!");
        } else{setErrorMessage("Something is wrong here, come back later when I've figured out my life.")}
      })
  };

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
        setBookShelf(response.data.books);
      })
      .catch( (error)=>{
        console.error(error);
        if(error.response && error.response.status === 401){
          setErrorMessage("You aren't logged in!");
        } else{setErrorMessage("Something is wrong here, come back later when I've figured out my life.")}
      })
  };

  useEffect(() => {
    getBookShelf();
  }, []);

  const removeBook = (bookId) => {
    axios
      .request({
        method: "DELETE",
        url: `/api/bookshelf/${bookId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBookShelf(response.data.books);
      })
      .catch( (error)=>{
        console.error(error);
        if(error.response && error.response.status === 401){
          setErrorMessage("You aren't logged in!");
        } else{setErrorMessage("Something is wrong here, come back later when I've figured out my life.")}
      })
  };

  const getBookDetails = (bookId) => {
    console.log(bookId)
        history.push(`/book/${bookId}`)
      
     
  };


 

  return (
    <div>
        <button onClick = {logOut} class = 'log-out'>Click to Log Out</button>
      <div class="shelf">
        <div class = 'shelf-title'><h2 id = 'currently-reading'>Currently Reading</h2></div>
        {bookShelf &&
          bookShelf.currentlyReading &&
          bookShelf.currentlyReading.map((book) => {
            return (
              <div>
               <h3>{book.title}</h3>
                <a onClick = {(e)=>getBookDetails(book.id, e.target.value)}><img
                  src={book.imageLinks.thumbnail}
                  alt="photo of 'pokemon handbook' cover"
                />
                </a>
                <select
                  name=""
                  id="book-dropdown"
                  onChange={(e) => addBook(book.id, e.currentTarget.value)}
                > 
                  <option value="wantToRead">Want to Read</option>
                  <option value="currentlyReading" selected>
                    Currently Reading
                  </option>
                  <option value="read">Read</option>
                </select>
                <div><button class = 'delete-button' onClick={(e) => removeBook(book.id, e.target.value)}>
                  Remove Book
                </button>
                </div>
              </div>
            );
          })}
      </div>
      <div class="shelf">
        <div class = 'shelf-title'><h2 id = 'want-to-read'>Want To Read</h2></div>
        {bookShelf &&
          bookShelf.wantToRead &&
          bookShelf.wantToRead.map((book) => {
            return (
              <div>
                <h3>{book.title}</h3>
                <a onClick = {(e)=>getBookDetails(book.id, e.target.value)}><img
                  src={book.imageLinks.thumbnail}
                  alt="photo of 'pokemon handbook' cover"
                />
                </a>
                <select
                  name=""
                  id="book-dropdown"
                  onChange={(e) => addBook(book.id, e.currentTarget.value)}
                >
                  <option value="wantToRead" selected>
                    Want to Read
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read">Read</option>
                </select>
                <div>
                <button class = 'delete-button' onClick={(e) => removeBook(book.id, e.target.value)}>
                  Remove Book
                </button>
                </div>
              </div>
            );
          })}
      </div>

      <div class="shelf">
        <div class = 'shelf-title'><h2 id = 'read'>Read</h2></div>
        {bookShelf &&
          bookShelf.read &&
          bookShelf.read.map((book) => {
            return (
              <div>
                <h3>{book.title}</h3>
                <a onClick = {(e)=>getBookDetails(book.id, e.target.value)}><img
                  src={book.imageLinks.thumbnail}
                  alt="photo of 'pokemon handbook' cover"
                />
                </a>
                <select
                  name=""
                  id="book-dropdown"
                  onChange={(e) => addBook(book.id, e.currentTarget.value)}
                >
                  <option value="wantToRead">Want to Read </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read" selected>
                    Read
                  </option>
                </select>
                <div>
                <button class = 'delete-button' onClick={(e) => removeBook(book.id, e.target.value)}>
                  Remove Book
                </button>
                </div>
              </div>
            );
          })}
      </div>
      
    </div>
  );
}
export default BookShelf;
