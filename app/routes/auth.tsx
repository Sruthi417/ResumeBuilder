
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { usePuterStore } from "~/lib/puter";

import Login from "../Components/Login";

export const meta = () => [
  {
    title: "Resmind | Auth",
  },
  {
    name: "description",
    content: "Log into your account",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const next = params.get("next");

  /*
   * After successful authentication,
   * redirect to the requested page.
   */
  useEffect(() => {
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <Login
      isLoading={isLoading}
      isAuthenticated={auth.isAuthenticated}
      onLogin={auth.signIn}
      onLogout={auth.signOut}
    />
  );
};

export default Auth;


//