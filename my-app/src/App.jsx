import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import RootLayout from './pages/Root.jsx';
import SongContextProvider from './app_context/song-context.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: '/', element: <Home /> }],
  },
  { path: '/login', element: <Login /> },
]);

function App() {
  return (
    <div>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </div>
  );
}

export default App;
