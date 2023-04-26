import { useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form/comment-form';
import ListOfComments from '../../components/list-of-comments/list-of-comments';
import Map from '../../components/map/map';
import ListOfOffers from '../../components/list-of-offers/list-of-offers';
import { fetchOfferAction } from '../../store/api-actions';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import LoadSpinner from '../../components/load-spinner/load-spinner';
import { getRating } from '../../utils/rating';
import { clearOffer } from '../../store/offer-data/offer-data';

type RoomProps = {
  isLogged: boolean;
};

function Room({ isLogged }: RoomProps): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    store.dispatch(fetchOfferAction(Number(params.id)));
    return () => {
      dispatch(clearOffer());
    };
  }, [dispatch, params]);

  const offer = useAppSelector((state) => state.OFFER.activeOffer);
  const offersNearByOffer = useAppSelector((state) => state.OFFER.nearByOffer);
  const comments = useAppSelector((state) => state.OFFER.comments);
  const isOfferLoad = useAppSelector((state) => state.API.isOfferLoad);

  if (!isOfferLoad) {
    return <LoadSpinner />;
  }
  if (offer === null) {
    return <div>Упс! Такой комнаты нет в базе</div>;
  }
  const stylesRating = {
    width: getRating(offer),
  };
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.slice(0,6).map((link) => (
              <div className="property__image-wrapper" key={link}>
                <img className="property__image" src={link} alt="Studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer.isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">{offer.title}</h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={stylesRating}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">
                {offer.rating}
              </span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((item) => (
                  <li className="property__inside-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="property__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="property__user-name">{offer.host.name}</span>
                <span className="property__user-status">
                  {offer.host.isPro}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">{offer.description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot;
                <span className="reviews__amount">{comments.length}</span>
              </h2>
              <ListOfComments comments={comments} />
              {isLogged && <CommentForm idOfOffer={Number(params.id)} />}
            </section>
          </div>
        </div>
        <Map
          city={offersNearByOffer[0].city}
          offers={[...offersNearByOffer, offer]}
          cssClassOfMap={'property__map'}
          mainOffer={offer}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            <ListOfOffers
              offers={offersNearByOffer}
              cssClassOfCard={'near-places'}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
export default Room;
