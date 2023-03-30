import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/SignUp');
  }
  return (
    <div>
    <img src="https://www.logodesignteam.com/images/portfolio-images/ecommerce-websites-logo-design/ecommerce-websites-logo-design20.jpg" 
    alt="logo"
      className='logo'
    />
    {
      auth ?       
      <ul className='nav-ul'>
        <li><Link to="/">OurProducts</Link> </li>
        <li><Link to="/add">Add Product</Link> </li>
        <li><Link to="/update/:id">Update Product</Link> </li>
        <li><Link to="/Profile">Profile</Link> </li>
         <li> <Link onClick={logout} to="/SignUp">Logout</Link> </li></ul>
            : 
            <ul className='nav-ul nav-right'>
              <li><Link to="/SignUp">SignUp</Link></li>
              <li><Link to="/Login">Login</Link></li>
              </ul>
        }
      
    </div>
  )
}

export default Nav;
