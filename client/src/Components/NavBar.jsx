import { Link } from 'react-router-dom';

function NavBar(){
    return(
<div id = 'navbar'>
 <Link to = "/bookshelf" class = "navbar-link">BookShelf</Link>
 <Link to = "/search" class = "navbar-link">Search</Link>
 
 </div>

    )

}
export default NavBar;