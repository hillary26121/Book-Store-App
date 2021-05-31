import {Switch, Route, Redirect} from 'react-router-dom';
import SignIn from './SignIn';
import Search from './Search';
import BookDetails from './BookDetails'
import BookShelf from './BookShelf';
import React from 'react';
import NavBar from './NavBar';
import {AccessTokenProvider} from '../Context/AccessTokenContext';
import ProtectedRoute from '../Context/ProtectedRoute'


function App() {

  return(
    <>
    <NavBar/>
   <AccessTokenProvider>
      <Switch>

        <ProtectedRoute path = "/bookshelf">
          <BookShelf />
      </ProtectedRoute>

        
        <ProtectedRoute path = '/search'>
          <Search/>
        </ProtectedRoute>

        <ProtectedRoute path = '/book/:bookid'>
          <BookDetails/>
        </ProtectedRoute>
        <Route exact path ='/signin'>
          <SignIn/>
        </Route>
        <Route>
          <Redirect to ='/signin'/>
        </Route>

      </Switch>
      </AccessTokenProvider>
    </>
  )
}

export default App;
