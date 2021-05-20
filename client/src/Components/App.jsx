import {Switch, Route, Redirect} from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
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
     
      

        <Route path = '/bookId'>
          <BookDetails/>
        </Route>

        <ProtectedRoute exact path = "/bookshelf">
          <BookShelf />
      </ProtectedRoute>

        
        <Route path = '/search'>
          <Search/>
        </Route>

        <Route path = '/bookdetails'>
          <BookDetails/>
        </Route>
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
