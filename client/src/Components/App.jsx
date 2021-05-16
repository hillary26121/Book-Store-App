import {Switch, Route} from 'react-router-dom';
import SignIn from './SignIn';
import Search from './Search';
import BookDetails from './BookDetails'
import BookShelf from './BookShelf';


function App() {
  return(
    <>
   
      <Switch>

        <Route path = '/search'>
          <Search/>
        </Route>

        <Route path = '/bookId'>
          <BookDetails/>
        </Route>

        <Route path = '/bookshelf'>
          <BookShelf/>
        </Route>

        <Route path ='signin'>
          <SignIn/>
        </Route>
      </Switch>

    </>
  )
}

export default App;
