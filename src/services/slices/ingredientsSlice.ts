import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TIngredientState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: {
    ingredients: [],
    isIngredientsLoading: false
  } satisfies TIngredientState as TIngredientState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.isIngredientsLoading = false;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    selectIngredientById: (state, id) =>
      state.ingredients.find((ingredient) => ingredient._id === id),
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading
  }
});

export const {
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientById,
  selectIsIngredientsLoading
} = ingredientsSlice.getSelectors(
  (rootState: RootState) => rootState.ingredients
);
