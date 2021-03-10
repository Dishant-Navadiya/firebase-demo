import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

const style = {
  marginRight: {
    marginRight: "1.2rem",
  },
  marginLeft: {
    marginLeft: "2rem",
  },
  avtarStyle: {
    width: "36px",
  },
  centerImg: {
    display: "flex",
    alignItems: "center",
  },
};

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");

  const signIn = () => {
    const googlePro = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googlePro)
      .then((result) => {
        // console.log(result);
        setIsLoggedIn(true);
        setUsername(result.additionalUserInfo.profile.name);
        setUrl(result.additionalUserInfo.profile.picture);
      })
      .catch((err) => console.log(err));
  };
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then((result) => setIsLoggedIn(false));
  };
  return (
    <nav className="purple lighten-1">
      <div className="nav-wrapper ">
        <Link style={style.marginLeft} to="/" className="brand-logo">
          D'rock{" "}
          <span role="img" aria-label="pizza">
            🍕
          </span>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/active">
              Active-Table<span className="new badge">5</span>
            </Link>
          </li>
          <li>
            <Link to="/order">order</Link>
          </li>
          <li>
            <Link to="/manage">Manage</Link>
          </li>
          <li>
            <Link to="/gallary">Gallary</Link>
          </li>
          <li>
            <Link to="/feedback">Feedback</Link>
          </li>
          <li style={style.marginRight}>
            {isLoggedIn ? (
              <Link style={style.centerImg} className="avatar">
                {username}
                <img
                  style={style.avtarStyle}
                  className="circle img-responsive"
                  src={url}
                  alt=""
                />
              </Link>
            ) : (
              <button className="btn" onClick={signIn}>
                Login
              </button>
            )}
          </li>
          <li style={style.marginRight}>
            {isLoggedIn ? (
              <button className="btn" onClick={logOut}>
                Logout
              </button>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
