import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useUserContext } from '../context/user_context'

//Sidebar (Mobile Menu)
const Sidebar = () => {
  //Destructure isSidebarOpen and closeSidebar from product context
  const { isSidebarOpen, closeSidebar } = useProductsContext();
  //Destructure myUser from user context.
  const { myUser } = useUserContext();
  return (
    <SidebarContainer>
      {/* set aside class based in isSidebarOpen state to show or hide component */}
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        {/* Header. Logo and close sidebar button */}
        <div className="sidebar-header">
          <img src={logo} alt='Comfy Sloth' className='logo' />
          <button type="button" className='close-btn' onClick={closeSidebar}><FaTimes /></button>
        </div>
        {/* Navigation links */}
        <ul className='links'>
          {/* Map over links array. Destructure id, url and text from single product in callback function. Render as a link*/}
          {links.map(({ id, url, text }) => {
            return <Link key={id} to={url} onClick={closeSidebar}>{text}</Link>
          })}
          {/* If there's an user logged display checkout link */}
          {myUser &&
            <Link to='/checkout' onClick={closeSidebar}>Checkout</Link>
          }
        </ul>
        {/* Cart and login/out buttons */}
        <CartButtons />
      </aside>
    </SidebarContainer>
  )
}

//Component style
const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
