import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Layout from '../layout/layot';
import NotFound from '../not-found/not-found';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoadSpinner from '../load-spinner/load-spinner';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.USER.authorizationStatus
  );
  const isOffersLoad = useAppSelector((state) => state.API.isOffersLoad);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || !isOffersLoad) {
    return <LoadSpinner />;
  }
  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout isLogged={isLogged} />}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Room} element={<Room isLogged={isLogged} />} />
          <Route path={AppRoute.Login} element={<Login isLogged={isLogged} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
