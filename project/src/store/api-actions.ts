import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../utils/token';
import { Comment } from '../types/comment';
import { loadOffers } from './offers-data/offers-data';
import { setServerError, setTrueLoadOfferStatus } from './api-statuses/api-statiuses';
import { changeFormData, loadComments, loadNearByOffer, loadOffer } from './offer-data/offer-data';
import { redirectToRoute } from './action';
import { requireAuthorization, setUserData } from './user-data/user-data';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {

  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  } catch {
    dispatch(setServerError(true));
  }
});

export const fetchOfferAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (id, { dispatch, extra: api }) => {
  try {
    const offer = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    const nearOffers = await api.get<Offer[]>(
      `${APIRoute.Offers}/${id}/nearby`
    );
    const comments = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadNearByOffer(nearOffers.data));
    dispatch(loadComments(comments.data.reverse()));
    dispatch(loadOffer(offer.data));
  } catch {
    dispatch(setTrueLoadOfferStatus());
    dispatch(setServerError(true));
  }
});

export const postComment = createAsyncThunk<
  void,
  { idOfOffer: number; commentFormData: { comment: string; rating: number } },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('comment/postComment', async (args, { dispatch, extra: api }) => {
  dispatch(changeFormData({ isDisabled: true }));
  try {
    const comments = await api.post<Comment[]>(
      `${APIRoute.Comments}/${args.idOfOffer}`,
      args.commentFormData
    );
    dispatch(loadComments(comments.data.reverse()));
    dispatch(changeFormData({ comment: '', rating: 0, isDisabled: false }));
  } catch {
    dispatch(changeFormData({ isDisabled: false, isErrorActive: true }));
    dispatch(setServerError(true));
  }
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setServerError(true));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(setServerError(true));
    }
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  } catch {
    dispatch(setServerError(true));
  }
});
