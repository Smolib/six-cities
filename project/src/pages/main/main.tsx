import Map from '../../components/map/map';
import OffersMainSection from '../../components/offers-main-section/offers-main-section';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CITIES } from '../../consts';
import CitiesNav from '../../components/cities-nav/cities-nav';
import { memo } from 'react';
import EmptyOffersSection from '../../components/empty-offers-section/empty-offers-section';
import { changeActiveCity, getOffersFromCity } from '../../store/offers-data/offers-data';

function Main(): JSX.Element {
  const currentCity = useAppSelector((state) => state.OFFERS.currentCity);
  const currentOffers = useAppSelector((state) => state.OFFERS.currentOffers);

  const dispatch = useAppDispatch();

  const onChangeCity = (city: string) => {
    dispatch(changeActiveCity(city));
    dispatch(getOffersFromCity());
  };
  const isOffersEmpty = currentOffers.length === 0;
  return (
    <main
      className={`page__main page__main--index ${
        isOffersEmpty ? 'page__main--index-empty' : ''
      }`}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesNav
            cities={CITIES}
            currentCity={currentCity}
            onChangeCity={onChangeCity}
          />
        </section>
      </div>
      <div className="cities">
        {isOffersEmpty ? (
          <EmptyOffersSection currentCity={currentCity} />
        ) : (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <OffersMainSection />
            </section>
            <div className="cities__right-section">
              <Map
                city={currentOffers[0].city}
                offers={currentOffers}
                cssClassOfMap={'cities__map'}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default memo(Main);
