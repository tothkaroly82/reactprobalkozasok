import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export default function Menu(props) {
  return (
    <Navbar bg="dark" expand="lg" className="form-group">
     
          <Nav>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/home"> Home </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/analyzis"> Analyzis</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/about"> About </NavLink>
          </Nav>
      
    </Navbar>
  )
}
