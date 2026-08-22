import React from "react";
import { ArrowRight } from "iconsax-react";

import "./Login.scss";

interface LoginProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Login = ({
  isLoading,
  isAuthenticated,
  onLogin,
  onLogout,
}: LoginProps) => {
  return (
    <main className="login">
      {/* =====================================================
          BLUE DOTTED BACKGROUND
      ====================================================== */}

      <div className="login__background" aria-hidden="true">
        <div className="login__dots" />
      </div>

      {/* =====================================================
          LOGIN CONTENT
      ====================================================== */}

      <div className="login__wrapper">

        {/* Illustration */}
        <div className="login__illustration">
          <img
            src="/redesign/welcome.png"
            alt=""
            draggable="false"
          />
        </div>

        {/* Login Card */}
        <section className="login__card">

          <div className="login__content">

            <h1>
              Welcome to Resmind
            </h1>

            <p>
              AI-powered resume analysis to help
              <br className="login__desktop-break" />
              you stand out and get hired.
            </p>

            <div className="login__action">

              {isLoading ? (
                <button
                  type="button"
                  className="login__button login__button--loading"
                  disabled
                >
                  <span>Signing you in...</span>
                </button>
              ) : isAuthenticated ? (
                <button
                  type="button"
                  className="login__button"
                  onClick={onLogout}
                >
                  <span>Log Out</span>

                  <ArrowRight
                    size={25}
                    color="currentColor"
                    variant="Linear"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="login__button"
                  onClick={onLogin}
                >
                  <span>Login</span>

                  <ArrowRight
                    size={25}
                    color="currentColor"
                    variant="Linear"
                    aria-hidden="true"
                  />
                </button>
              )}

            </div>

          </div>

        </section>
      </div>
    </main>
  );
};

export default Login;