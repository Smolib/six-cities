import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { clearOffer, loadOffer } from '../offer-data/offer-data';
import { loadOffers } from '../offers-data/offers-data';

type InitialState = {
  isServerError: boolean;
  isOffersLoad: boolean;
  isOfferLoad: boolean;
};

const initialState: InitialState = {
  isServerError: false,
  isOffersLoad: false,
  isOfferLoad: false,
};

export const apiStatuses = createSlice({
  name: NameSpace.Api,
  initialState,
  reducers: {
    setServerError: (state, { payload }: PayloadAction<boolean>) => {
      state.isServerError = payload;
    },
    setTrueLoadOfferStatus: (state) => {
      state.isOfferLoad = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffer, (state ) => {
        state.isOfferLoad = true;
      })
      .addCase(loadOffers, (state ) => {
        state.isOffersLoad = true;
      })
      .addCase(clearOffer, (state) => {
        state.isOfferLoad = false;
      });
  },
});

export const { setServerError, setTrueLoadOfferStatus } = apiStatuses.actions;
