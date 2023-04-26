import { useAppSelector } from '../../hooks';
import ListOfOffers from '../list-of-offers/list-of-offers';
import SortingForm from '../sorting-form/sorting-form';

function OffersMainSection(): JSX.Element {
  const currentCity = useAppSelector((state) => state.OFFERS.currentCity);
  const currentOffers = useAppSelector((state) => state.OFFERS.currentOffers);

  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {currentOffers.length} places to stay in {currentCity}
      </b>
      <SortingForm />
      <div className="cities__places-list places__list tabs__content">
        <ListOfOffers offers={currentOffers} cssClassOfCard="cities" />
      </div>
    </>
  );
}

export default OffersMainSection;
