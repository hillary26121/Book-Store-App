import { Link } from 'react-router-dom';

function NavBar(){
    return(
<div id = 'navbar'>
<Link to = "signin" class = "navbar-link">Sign In</Link>
 <Link to = "bookshelf" class = "navbar-link">BookShelf</Link>
 <Link to = "bookdetails" class = "navbar-link"> Book Details</Link>
 <Link to = "search" class = "navbar-link">Search</Link>
 
 </div>

    )

}
export default NavBar;