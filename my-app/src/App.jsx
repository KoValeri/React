import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import RootLayout from './pages/Root.jsx';
import CardPage from './pages/CardPage.jsx';
import Settings from './pages/Settings.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongs } from './store/song.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/card/:id', element: <CardPage /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
