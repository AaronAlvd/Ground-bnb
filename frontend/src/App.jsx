import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation/Navigation';
import SpotsDisplayPage from './components/Spots/SpotsDisplayPage';
import SpotDetailPage from './components/Spots/SpotDetailPage/SpotDetailPage';
import SpotFormPage from './components/Spots/SpotFormPage/SpotFormPage';
import ManageSpots from './components/Spots/ManageSpots/ManageSpots';
import ManageReviews from './components/Reviews/ManageReviews/ManageReviews';
import UpdateSpot from './components/Spots/UpdateSpot/UpdateSpot';
import * as sessionActions from './store/session';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsDisplayPage />
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetailPage />
      },
      {
        path: '/spotformpage',
        element: <SpotFormPage />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '/reviews/current',
        element: <ManageReviews />
      },
      {
        path: '/updatespotform',
        element: <UpdateSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
