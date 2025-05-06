import {
  ingredientsSlice,
  getIngredients
} from '../services/slices/ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    ingredients: [],
    isIngredientsLoading: false
  };

  test('should set isIngredientsLoading to true when pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(true);
  });

  test('should set ingredients and isIngredientsLoading to false when fulfilled', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isIngredientsLoading).toBe(false);
  });

  test('should set isIngredientsLoading to false when rejected', () => {
    const action = { type: getIngredients.rejected.type };
    const state = ingredientsSlice.reducer(
      { ...initialState, isIngredientsLoading: true },
      action
    );
    expect(state.isIngredientsLoading).toBe(false);
  });
});
