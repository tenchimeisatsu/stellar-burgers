import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TOrdersState = {
  isLoadingOrders: boolean;
  isLoadingFeed: boolean;
  orders: TOrder[];
  orderData?: TOrder;
  feed: TOrder[];
  feedStats: { total: number; totalToday: number };
};

export const getFeed = createAsyncThunk('orders/getFeed', getFeedsApi);
export const getUserOrders = createAsyncThunk('orders/getOrders', getOrdersApi);
export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (num?: string) => {
    if (!num) return Promise.reject();
    const parsedNum = Number.parseInt(num);
    return await getOrderByNumberApi(parsedNum);
  }
);

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: {
    isLoadingOrders: false,
    isLoadingFeed: false,
    orders: [],
    feed: [],
    feedStats: { total: 0, totalToday: 0 }
  } satisfies TOrdersState as TOrdersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoadingFeed = true;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.feed = payload.orders;
        state.feedStats = payload;
        state.isLoadingFeed = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderData = payload.orders[0];
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoadingOrders = true;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.isLoadingOrders = false;
      });
  },
  selectors: {
    selectFeedIsLoading: (state) => state.isLoadingFeed,
    selectFeed: (state) => state.feed,
    selectFeedStats: (state) => state.feedStats,
    selectOrderByNumber: (state) => state.orderData,
    selectOrdersIsLoading: (state) => state.isLoadingOrders,
    selectUserOrders: (state) => state.orders
  }
});

export const {
  selectFeedIsLoading,
  selectFeed,
  selectFeedStats,
  selectOrderByNumber,
  selectOrdersIsLoading,
  selectUserOrders
} = ordersSlice.getSelectors((rootState: RootState) => rootState.orders);
