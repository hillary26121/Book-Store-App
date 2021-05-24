import { BookApiContext } from "../Context/Bookapicontext";
import { BookApiProvider } from "../Context/Bookapicontext";
import { useContext, useHistory } from 'react';

function BookDetails(){
   const { setDetails, getBookDetails } = useContext(BookApiContext);
   
 return(
    <div></div>
 )
}
export default BookDetails;