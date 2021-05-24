import { createContext, useState, useContext, useHistory } from "react";
import axios from "axios";
import { AccessTokenContext } from "./AccessTokenContext";
import { AccessTokenProvider } from "./AccessTokenContext";

export const BookApiContext = createContext();

export function BookApi({children}){
    const { getToken, logOut } = useContext(AccessTokenContext);
    const [details, setDetails] = useState('');
    const history = useHistory();
    const getBookDetails = (bookId) => {
        axios
          .request({
            method: "GET",
            url: `/api/bookshelf/${bookId}`,
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setDetails(response.data.books);
            history.push('/bookdetails')
          });
      };

      return<BookApiContext.Provider
  value={{
    getBookDetails,
    setDetails,
  }}>
    {children}
    
   </BookApiContext.Provider>
}
 