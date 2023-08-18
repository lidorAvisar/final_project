import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HamburgerAdmin() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto mt-2">
            <ul>
              <li> <Link to="/admin/users" className="text-white">Users</Link ></li>
              <li> <Link to="/admin/categories" className="text-white">Categoris</Link ></li>
              <li><Link to="/admin/products" className="text-white">Products</Link ></li>
            </ul>
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}