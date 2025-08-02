import { Link } from 'react-router-dom';
import './Login.css';

export default function LoginContent() {
  return (
    <main className="login-main">
      <div>
        <div className="login-fields">
          <label for="login">Username </label>
          <input type="text" id="login" />
        </div>
        <div className="login-fields">
          <label for="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="login-button">
          <button>Login</button>
        </div>
        <div className="go-back">
          <Link to="/">Go to home page</Link>
        </div>
      </div>
    </main>
  );
}
