import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

export const redirectToRoute = createAction(
  'data/redirectToRoute',
  (redirect: AppRoute) => ({
    payload: redirect,
  })
);
