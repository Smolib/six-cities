import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeTypeOfSorting, sortOffers } from '../../store/offers-data/offers-data';
import { SortInfo } from '../../consts';
import { useState } from 'react';
import { SortData } from '../../types/sort-data';

function SortingForm(): JSX.Element {
  const typeOfSorting = useAppSelector((state) => state.OFFERS.typeOfSorting);

  const dispatch = useAppDispatch();

  const [isListOpened, setIsListOpened] = useState(false);

  const onClickTypesOfSort = (type: SortData) => {
    dispatch(changeTypeOfSorting(type));
    dispatch(sortOffers(type));
    setIsListOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsListOpened(!isListOpened)}
      >
        {typeOfSorting.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isListOpened ? ' places__options--opened' : ''
        }`}
      >
        {SortInfo.map((item) => (
          <li
            className={`places__option${
              item.name === typeOfSorting.name ? ' places__option--active' : ''
            }`}
            tabIndex={0}
            key={item.name}
            onClick={() => onClickTypesOfSort(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingForm;
