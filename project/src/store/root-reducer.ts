import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import { offerData } from './offer-data/offer-data';
import { offersData } from './offers-data/offers-data';
import { apiStatuses } from './api-statuses/api-statiuses';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Api]: apiStatuses.reducer,
  [NameSpace.User]: userData.reducer,
});
