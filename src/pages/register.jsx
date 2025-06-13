import React from 'react';

const RegisterForm = () => {
  return (
    <div className="register-container-background">
      <div className="register-card">
        <div className="form-section">
          <p className="sign-up-text">SIGN UP NOW</p>
          <h2>Register For Free.</h2>
          <p className="login-prompt">
            Already have an account? <a href="#">Log in.</a>
          </p>

          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>

            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </div>

        <div className="image-section">
          <img src="#" alt="Illustration of people shopping with bags and a sale sign" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;