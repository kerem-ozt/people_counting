import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lutfenlutfen from './Lutfenlutfen';
import App from './App';
import Sorgu from './Sorgu';
import Login from './Login';
import Register from './Register';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/lutfenlutfen',
    element: <Lutfenlutfen />,
  },
  {
    path: '/sorgu',
    element: <Sorgu />,
  },
  {
    path: '/girisyap',
    element: <Login />,
  },
  {
    path: '/kayitol',
    element: <Register />,
  }
]);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
  rootElement
);
