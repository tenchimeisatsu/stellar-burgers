import { TConstructorIngredient } from '@utils-types';
import { constructorSlice } from '../services/slices/constructorSlice';

describe('constructorSlice tests', () => {
  const initialState = {
    bun: undefined,
    ingredients: [],
    isLoading: false,
    createdOrder: null
  };

  test('should handle addIngredient for bun', () => {
    const bun = {
      id: '1',
      _id: '643d69a5c3f7b9001cfa093',
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
    };

    const action = constructorSlice.actions.addIngredient(bun);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.bun).toEqual(bun);
  });

  test('should handle addIngredient for non-bun ingredient', () => {
    const ingredient = {
      id: '2',
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    const action = constructorSlice.actions.addIngredient(ingredient);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient);
  });

  test('should handle removeIngredient', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          id: '1',
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        }
      ]
    };

    const action = constructorSlice.actions.removeIngredient({
      id: '1',
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce'
    } as TConstructorIngredient);
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toHaveLength(0);
  });

  test('should handle moveDown', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          id: '1',
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce'
        } as TConstructorIngredient,
        {
          id: '2',
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce'
        } as TConstructorIngredient
      ]
    };

    const action = constructorSlice.actions.moveDown(0);
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  test('should handle moveUp', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          id: '1',
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce'
        } as TConstructorIngredient,
        {
          id: '2',
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce'
        } as TConstructorIngredient
      ]
    };

    const action = constructorSlice.actions.moveUp(1);
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });
});
