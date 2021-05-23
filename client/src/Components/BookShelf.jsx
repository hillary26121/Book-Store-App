import { useEffect, useHistory, useContext, useState } from "react";
import axios from "axios";
import { AccessTokenContext } from "../Context/AccessTokenContext";
import { AccessTokenProvider } from "../Context/AccessTokenContext";

function BookShelf() {
  const { getToken, logOut } = useContext(AccessTokenContext);
  const [bookShelf, setBookShelf] = useState({});
  const [shelf, setShelf] = useState('');
  const [books, setBooks] = useState("");
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
      });
  };

  const addBook = (bookId, shelfKey) => {
    console.log(bookId);
    console.log(shelfKey);
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
        setBooks(response.data.books);
      });
  };

  useEffect(() => {
    getBookShelf();
  }, []);
  
  return (
    <div>
      <h1>Book Shelf</h1>
      <h2>
        Click to log out <button onClick={logOut}>Log Out</button>
      </h2>
      {bookShelf && bookShelf.currentlyReading.map((book) => {
        return (
          <div>
            <select name="" id="book-dropdown">
              <option value="want-to-read">
                Want to Read
              </option>
              <option value="currently-reading">Currently Reading</option>
              <option value="read">Read</option>
            </select>
            <h1>{book.title}</h1>
            <img
              src={book.imageLinks.thumbnail}
              alt="photo of 'pokemon handbook' cover"
            />
          </div>
        );
      })}
      <button onClick={getBookShelf}>click</button>
      <button onClick={addBook}>add book api</button>
    </div>
  );
}
export default BookShelf;
