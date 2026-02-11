import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from "./componets/ErrorPage";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Movies from "./routes/Movies";
import Watchlist from "./routes/Watchlist";
import MoviesDetail, {loader as detailLoader} from "./routes/MovieDetail";
import store from './app/store';

const router = createBrowserRouter([
  {
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Movies/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "/:id",
        element: <MoviesDetail/>,
        loader: detailLoader, 
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
