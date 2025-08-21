import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth.js';

export default function Header() {
  const count = useSelector(state => state.song.count);
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const userName = useSelector(state => state.auth.enteredValues.email);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  return (
    <header className="app-header">
      <div className="count-and-user">
        <div className="card-badge">
          <strong>Number of cards</strong>
          <span className="badge">{count}</span>
        </div>
        {isLogin && <div className="user">Hello, {userName}</div>}
      </div>
      <div className="header-title">
        <h1>Song cards</h1>
      </div>

      <nav className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {isLogin ? (
              <Link to="/" onClick={() => dispatch(authActions.logOut())}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          {isAdmin && (
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
