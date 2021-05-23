import { useEffect, useHistory, useContext, useState } from "react";
import axios from "axios";
import { AccessTokenContext } from "../Context/AccessTokenContext";
import { AccessTokenProvider } from "../Context/AccessTokenContext";

function BookShelf() {
  const { getToken, logOut } = useContext(AccessTokenContext);
  const [bookShelf, setBookShelf] = useState({});
  const [shelf, setShelf] = useState("");
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
        console.log(response);
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
        console.log(response);
        setBookShelf(response.data.books);
      });
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
      });
  };

  return (
    <div>
      <div class="shelf">
        <h2 id = 'currently-reading'>Currently Reading</h2>
        {bookShelf &&
          bookShelf.currentlyReading &&
          bookShelf.currentlyReading.map((book) => {
            return (
              <div>
                <h3>{book.title}</h3>
                <img
                  src={book.imageLinks.thumbnail}
                  alt="photo of 'pokemon handbook' cover"
                />
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
                <button onClick={(e) => removeBook(book.id, e.target.value)}>
                  Delete Book
                </button>
              </div>
            );
          })}
      </div>
      <div class="shelf">
        <h2 id = 'want-to-read'>Want To Read</h2>
        {bookShelf &&
          bookShelf.wantToRead &&
          bookShelf.wantToRead.map((book) => {
            return (
              <div>
                {" "}
                <h3>{book.title}</h3>
                <img
                  src={book.imageLinks.thumbnail}
                  alt="photo of 'pokemon handbook' cover"
                />
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
                <button onClick={(e) => removeBook(book.id, e.target.value)}>
                  Delete Book
                </button>
              </div>
            );
          })}
      </div>

      <div class="shelf">
        <h2 id = 'read'>Read</h2>
        {bookShelf &&
          bookShelf.read &&
          bookShelf.read.map((book) => {
            return (
              <div>
                <h3>{book.title}</h3>
                <img
                  src={book.imageLinks.thumbnail}
                  alt="photo of 'pokemon handbook' cover"
                />
                <select
                  name=""
                  id="book-dropdown"
                  onChange={(e) => addBook(book.id, e.currentTarget.value)}
                >
                  <option value="wantToRead">Read </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read" selected>
                    Read
                  </option>
                </select>
                <button onClick={(e) => removeBook(book.id, e.target.value)}>
                  Delete Book
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default BookShelf;
