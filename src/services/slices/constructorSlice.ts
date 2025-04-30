import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';
import { orderBurgerApi } from '@api';

type TConstructorState = {
  bun?: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  createdOrder: TOrder | null;
};

const swap = (array: TConstructorIngredient[], i1: number, i2: number) => {
  const tmp = array[i1];
  array[i1] = array[i2];
  array[i2] = tmp;
};

export const createOrder = createAsyncThunk(
  'constructor/createOrder',
  orderBurgerApi
);

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState: {
    createdOrder: null,
    isLoading: false,
    bun: undefined,
    ingredients: []
  } satisfies TConstructorState as TConstructorState,
  reducers: {
    resetConstructorState: (state) => {
      state.createdOrder = null;
      state.isLoading = false;
      state.bun = undefined;
      state.ingredients = [];
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (payload: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...payload } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') return;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      if (action.payload === state.ingredients.length - 1) return;
      swap(state.ingredients, action.payload, action.payload + 1);
    },
    moveUp: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) return;
      swap(state.ingredients, action.payload, action.payload - 1);
    }
  },
  selectors: {
    selectOrder: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    }),
    selectCreatedOrder: (state) => state.createdOrder,
    selectOrderIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.createdOrder = payload.order;
        state.isLoading = false;
      });
  }
});

export const { selectOrder, selectOrderIsLoading, selectCreatedOrder } =
  constructorSlice.getSelectors((rootState: RootState) => rootState.burger);

export const {
  resetConstructorState,
  addIngredient,
  removeIngredient,
  moveDown,
  moveUp
} = constructorSlice.actions;
