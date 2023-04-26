import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';
import { FormData } from '../../types/form-data';
import { getIsCommentValid } from '../../utils/is-comment-valid';
import { PartialFormData } from '../../types/form-data';

type InitialState = {
  activeOffer: Offer | null;
  nearByOffer: Offer[];
  comments: Comment[];
  formData: FormData;
};

const initialState: InitialState = {
  activeOffer: null,
  nearByOffer: [],
  comments: [],
  formData: {
    comment: '',
    rating: 0,
    isValid: false,
    isDisabled: false,
    isErrorActive: false,
  },
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    loadOffer: (state, { payload }: PayloadAction<Offer>) => {
      state.activeOffer = payload;
    },
    loadNearByOffer: (state, { payload }: PayloadAction<Offer[]>) => {
      state.nearByOffer = payload;
    },
    loadComments: (state, { payload }: PayloadAction<Comment[]>) => {
      state.comments = payload;
    },
    changeFormData: (state, { payload }: PayloadAction<PartialFormData>) => {
      let newFormData = state.formData;
      newFormData = Object.assign(newFormData, payload);
      if (payload.comment || payload.rating) {
        newFormData.isErrorActive = false;
      }
      state.formData = newFormData;
      const isValid = getIsCommentValid({
        comment: state.formData.comment,
        rating: state.formData.rating,
      });
      state.formData.isValid = isValid;
    },
    clearOffer: (state) => {
      state.activeOffer = null;
    },
  },
});

export const {
  loadOffer,
  loadNearByOffer,
  loadComments,
  changeFormData,
  clearOffer,
} = offerData.actions;
