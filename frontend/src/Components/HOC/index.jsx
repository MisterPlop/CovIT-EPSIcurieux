import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getItemWithExpiration } from "../../Assets/Variables/functions";
import { signout } from '../../store/slices/user'

import Header from "./Header";
import Footer from "./Footer";
import Title from "../Title";

function HOC({ child, title, auth }) {
  const Child = child;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [tokenIsValid, setTokenIsValid] = useState(false);
  const TOKEN = getItemWithExpiration('auth');

  useEffect(() => {
    async function checkAuth() {
      if (auth) {
        if (!TOKEN) {
          navigate("/");
          dispatch(signout());
        }
        if (TOKEN) {
          setTokenIsValid(true);
        }
      }
    }
    checkAuth();
  }, [auth, TOKEN, navigate, dispatch]);

  return (
    <div id={pathname === "/" ? "home_body" : "navigation_body"}>
      <div className="navigation_container">
        <Header />

        <main className="navigation_main">
          {(!auth || (auth && tokenIsValid)) && <Title title={title} />}
          {(!auth || (auth && tokenIsValid)) && <Child />}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default HOC;
