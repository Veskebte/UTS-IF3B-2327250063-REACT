import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom"; // Mengimpor BrowserRouter, Route, dan NavLink dari react-router-dom

// Lazy loading untuk komponen Home dan MenuList
const Home = React.lazy(() => import("./components/Home"));
const MenuList = React.lazy(() => import("./components/Menu/List"));

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Home
          </NavLink>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/menu"
                >
                  Menu
                </NavLink>
              </li>
            </ul>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>

        <div>&copy; 2024 Nathasya</div>
      </div>
    </Router>
  );
}

export default App
