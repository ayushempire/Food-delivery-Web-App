import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/ContextReducer";
import "./navbar.css";
import Cart from "../screens/Cart";
import Model from "../Model";

// iporting bootstrap badge
import { Badge } from "react-bootstrap";

export default function Navbar() {
  let data = useCart();
  const navigate = useNavigate();

  const [cartView, setCartView] = useState(false);

  //  Css for Nav brand
  var Nav_heading = {
    fontFamily: "Bebas Neue, sans-serif",
  };
  // end of Css Nav brand

  // logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  // end of logout function
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-bold"
            to="/"
            style={Nav_heading}
          >
            MyFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white fs-5 fw-bold active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {/* logic for my order link to display after sign in */}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active text-white fs-5 fw-bold active"
                    aria-current="page"
                    to="/"
                  >
                    MyOerders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex">
              {/* lcogic for display cart button and loguot button */}
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link
                    className="btn text-success bg-white mx-1 fw-bold"
                    to="/Login"
                  >
                    Login
                  </Link>

                  <Link
                    className="btn text-success bg-white fw-bold mx-1"
                    to="/Signup"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="btn text-success bg-white mx-1 fw-bold"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    My Cart
                    <Badge pill className="ms-2">
                      {data.length === 0 ? "" : data.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Model onClose={() => setCartView(false)}>
                      <Cart></Cart>
                    </Model>
                  ) : null}
                  <div
                    className="btn text-danger bg-white fw-bold mx-1"
                    onClick={logout}
                  >
                    Logout
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
