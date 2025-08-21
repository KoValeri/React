import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import Input from './Input.jsx';
import { isEmail, hasLetterAndNumber, hasMinLength } from './validation.js';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth.js';

export default function LoginContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enteredValues = useSelector(state => state.auth.enteredValues);

  const [notValidField, setNotValidField] = useState({
    email: false,
    password: false,
  });

  const [disabledButton, setDisabledButton] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
    navigate('/');
  }

  function handleInputChange(identifier, value) {
    dispatch(authActions.setEnteredValues({ identifier, value }));
  }

  function handleBlur(identifier) {
    const validation = {
      email: isEmail,
      password: password => hasLetterAndNumber(password) && hasMinLength(password),
    };

    const isValid = validation[identifier](enteredValues[identifier]);
    setNotValidField(prevValid => ({
      ...prevValid,
      [identifier]: !isValid,
    }));
    setDisabledButton(!isValid);
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
