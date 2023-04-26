import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postComment } from '../../store/api-actions';
import { InputsSetting } from '../../consts';
import { changeFormData } from '../../store/offer-data/offer-data';

type CommentFormProps = {
  idOfOffer: number;
};
function CommentForm({ idOfOffer }: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { comment, rating, isValid, isDisabled, isErrorActive } = useAppSelector((state) => state.OFFER.formData);
  const onChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeFormData({ comment: evt.target.value }));
  };
  const onChangeRating = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFormData({ rating: Number(evt.target.value) }));

  };

  const handleSubmitForm = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dispatch(postComment({ idOfOffer, commentFormData: { comment, rating } }));
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {InputsSetting.map((item) => (
          <label
            key={item.id}
            className="reviews__rating-label form__rating-label"
            title={item.title}
          >
            <input
              onChange={onChangeRating}
              className="form__rating-input visually-hidden"
              name="rating"
              value={item.value}
              id={item.id}
              type="radio"
              checked={false}
              disabled={isDisabled}
            />
            <svg
              className="form__star-image"
              width="37"
              height="33"
              style={{
                fill: item.value <= rating ? '#ff9000' : '',
              }}
            >
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        ))}
      </div>
      {isErrorActive && (<div style={{ color: 'red' }}>Упс! Что-то пошло не так, попробуйте еще раз</div>)}
      <textarea
        onChange={onChangeText}
        value={comment}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isDisabled}
          style={{ cursor: isValid ? 'pointer' : 'auto' }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
