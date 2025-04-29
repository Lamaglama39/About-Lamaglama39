import React from 'react';
import { Link } from "react-router";
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
