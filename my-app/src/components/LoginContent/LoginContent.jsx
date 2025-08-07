import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import Input from './Input.jsx';
import { isEmail, hasLetterAndNumber, hasMinLength } from './validation.js';

export default function LoginContent() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [notValidField, setNotValidField] = useState({
    email: false,
    password: false,
  });

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
    setNotValidField(prevValid => ({
      ...prevValid,
      [identifier]: false,
    }));
  }

  const passwordIsValid =
    hasLetterAndNumber(enteredValues.password) && hasMinLength(enteredValues.password);
  const userNameIsValid = isEmail(enteredValues.email);

  function handleBlur(identifier) {
    if (identifier === 'email') {
      if (!userNameIsValid) {
        setNotValidField(prevValid => ({
          ...prevValid,
          [identifier]: true,
        }));
        setDisabledButton(true);
      } else {
        setDisabledButton(false);
      }
    }

    if (identifier === 'password') {
      if (!passwordIsValid) {
        setNotValidField(prevValid => ({
          ...prevValid,
          [identifier]: true,
        }));
        setDisabledButton(true);
      } else {
        setDisabledButton(false);
      }
    }
  }

  return (
    <main className="login-main">
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          id="email"
          type="text"
          onBlur={() => handleBlur('email')}
          value={enteredValues.email}
          onChange={event => handleInputChange('email', event.target.value)}
          required
          error={notValidField.email && 'Username should be an email'}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          onBlur={() => handleBlur('password')}
          value={enteredValues.password}
          onChange={event => handleInputChange('password', event.target.value)}
          required
          error={
            notValidField.password &&
            'Password has to include at least 1 number and 1 letter and contain at least 8 symbols'
          }
        />
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
