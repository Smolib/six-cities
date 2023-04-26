import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeActiveCard } from '../../store/offers-data/offers-data';
import { getRating } from '../../utils/rating';

type CardProps = {
  offer: Offer;
  cssClassOfCard: string;
};

function Card({ offer, cssClassOfCard }: CardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article
      onMouseOver={() => dispatch(changeActiveCard(offer))}
      onMouseOut={() => dispatch(changeActiveCard(null))}
      className={`${cssClassOfCard}__card place-card`}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${cssClassOfCard}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(offer, true) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
