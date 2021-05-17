import {Switch, Route, Redirect} from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
import SignIn from './SignIn';
import Search from './Search';
import BookDetails from './BookDetails'
import BookShelf from './BookShelf';
import React from 'react';
import NavBar from './NavBar';


function App() {

  return(
    <>
    <NavBar/>
   
      <Switch>
     


        <Route path = '/bookId'>
          <BookDetails/>
        </Route>

        <Route path = '/bookshelf'>
          <BookShelf/>
        </Route>

        
        <Route path = '/search'>
          <Search/>
        </Route>

        <Route path = '/bookdetails'>
          <BookDetails/>
        </Route>
        <Route path ='/signin'>
          <SignIn/>
        </Route>
        <Route>
          <Redirect to ='/signin'/>
        </Route>

      </Switch>

    </>
  )
}

export default App;
