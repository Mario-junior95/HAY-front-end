import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu} from 'react-burger-menu';


const Sidenav = () => {
  
    return (
        <div id="side-nav">

        <Menu>
        <Link to="/">Home</Link>
            <Link to="/Book">Book</Link>
            <Link to="/Events">Events</Link>
            <Link to="/Blog">Blog</Link>
            <Link to="/Contact">Contact Us</Link>
        </Menu>

        </div>
    )
}

export default Sidenav;