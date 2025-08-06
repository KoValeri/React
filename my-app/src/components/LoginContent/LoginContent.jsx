import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import Input from './Input.jsx';

export default function LoginContent() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [notValidPassword, setNotValidPassword] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
    alert(JSON.stringify(enteredValues));
  }

  function handleInputChange(identifier, value) {
    setEnteredValues(prev => ({
      ...prev,
      [identifier]: value,
    }));
    setNotValidPassword(false);
  }

  function handleBlur() {
    const passwordIsValid = /^(?=.*[a-zA-Z])(?=.*\d)/.test(enteredValues.password);

    if (!passwordIsValid) {
      setNotValidPassword(true);
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }

  return (
    <main className="login-main">
      <form onSubmit={handleSubmit}>
        <div className="login-fields">
          <Input
            label="Username"
            id="email"
            type="email"
            value={enteredValues.email}
            onChange={event => handleInputChange('email', event.target.value)}
            required
          />
        </div>
        <div className="login-fields">
          <Input
            label="Password"
            id="password"
            type="password"
            onBlur={() => handleBlur()}
            value={enteredValues.password}
            onChange={event => handleInputChange('password', event.target.value)}
            minLength={8}
            required
          />
        </div>
        {notValidPassword ? (
          <p className="not-valid">Password has to include at least 1 number and 1 letter</p>
        ) : undefined}
        <div className="login-button">
          <button type="submit" disabled={disabledButton}>
            Login
          </button>
        </div>
        <div className="go-back">
          <Link to="/">Go to home page</Link>
        </div>
      </form>
    </main>
  );
}
