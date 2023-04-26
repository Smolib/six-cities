import { SortData } from './types/sort-data';

export enum AppRoute {
  Main = '/',
  Room = 'offer/:id',
  Login = '/login',
}

export const SortInfo: SortData[] = [
  { name: 'Popular', sortingValue: 'rating', lowToHight: true },
  { name: 'Price: low to hight', sortingValue: 'price', lowToHight: true },
  { name: 'Price: high to low', sortingValue: 'price', lowToHight: false },
  { name: 'Top rated first', sortingValue: 'rating', lowToHight: false },
];

export enum StylesOfPage {
  Default = 'page',
  Main = 'page page--gray page--main',
  Login = 'page page--gray page--login',
}

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';


export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];


export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const InputsSetting = [
  {
    value: 5,
    id: '5-stars',
    title: 'perfect',
  },
  {
    value: 4,
    id: '4-stars',
    title: 'good',
  },
  {
    value: 3,
    id: '3-stars',
    title: 'not bad',
  },
  {
    value: 2,
    id: '2-stars',
    title: 'badly',
  },
  {
    value: 1,
    id: '1-star',
    title: 'terribly',
  },
];


export const Mounths = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export enum NameSpace {
  Api = 'API',
  User = 'USER',
  Offers = 'OFFERS',
  Offer = 'OFFER',
}
