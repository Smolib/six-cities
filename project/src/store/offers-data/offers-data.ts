import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortInfo } from '../../consts';
import { Offer } from '../../types/offer';
import { SortData } from '../../types/sort-data';
import { sort } from '../../utils/sort';

const defaultTypeOfSorting = SortInfo[0];
const defaultCity = 'Paris';
const defaultSearch = 'Popular';

type InitialState = {
  currentOffers: Offer[];
  defaultSortOffers: Offer[];
  allOffers: Offer[];
  typeOfSorting: SortData;
  currentCity: string;
  activeCard: Offer | null;
};

const initialState: InitialState = {
  currentOffers: [],
  defaultSortOffers: [],
  allOffers: [],
  typeOfSorting: defaultTypeOfSorting,
  currentCity: defaultCity,
  activeCard: null,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    loadOffers: (state, { payload }: PayloadAction<Offer[]>) => {
      state.allOffers = payload;
      const initialOffers = state.allOffers.filter(
        (item) => item.city.name === state.currentCity
      );
      state.defaultSortOffers = initialOffers;
      state.currentOffers = initialOffers;
    },
    sortOffers: (state, { payload }: PayloadAction<SortData>) => {
      const sortData = payload;
      if (sortData.name === defaultSearch) {
        state.currentOffers = state.defaultSortOffers;
      } else {
        state.currentOffers = sort(
          state.currentOffers,
          sortData.sortingValue,
          sortData.lowToHight
        );
      }
    },
    changeActiveCity: (state, { payload }: PayloadAction<string>) => {
      state.currentCity = payload;
    },
    getOffersFromCity: (state) => {
      const offersFromCity = state.allOffers.filter(
        (item) => item.city.name === state.currentCity
      );
      state.currentOffers = offersFromCity;
      state.defaultSortOffers = offersFromCity;
    },
    changeActiveCard: (state, { payload }: PayloadAction<Offer | null>) => {
      state.activeCard = payload;
    },
    changeTypeOfSorting: (state, { payload }: PayloadAction<SortData>) => {
      state.typeOfSorting = payload;
    },
  }
});

export const {
  loadOffers,
  sortOffers,
  changeActiveCity,
  getOffersFromCity,
  changeActiveCard,
  changeTypeOfSorting
} = offersData.actions;
