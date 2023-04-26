import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import { AppRoute, StylesOfPage } from '../../consts';
import { setServerError } from '../../store/api-statuses/api-statiuses';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';

type LayoutProps = {
  isLogged: boolean;
};

function Layout({ isLogged }: LayoutProps): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isServeerError = useAppSelector((state) => state.API.isServerError);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isServeerError) {
      timer = setTimeout(() => dispatch(setServerError(false)), 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        dispatch(setServerError(false));
      }
    };
  }, [dispatch, isServeerError]);

  const pageStyle = (path: string) => {
    switch (path) {
      case AppRoute.Main:
        return StylesOfPage.Main;
      case AppRoute.Login:
        return StylesOfPage.Login;
      default:
        return StylesOfPage.Default;
    }
  };

  return (
    <div className={pageStyle(pathname)}>
      {isServeerError && <div style={{position: 'fixed', color: 'red', fontSize: '20px'}}>Ой, на сервере ошибка!</div>}
      <Header isNavNeed={pathname !== AppRoute.Login} isLogged={isLogged} />
      <Outlet />
    </div>
  );
}

export default Layout;
