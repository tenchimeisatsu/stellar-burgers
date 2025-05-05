import {
  ordersSlice,
  getFeed,
  getUserOrders,
  getOrderByNumber
} from '../services/slices/ordersSlice';

describe('ordersSlice tests', () => {
  const initialState = {
    isLoadingOrders: false,
    isLoadingFeed: false,
    orders: [],
    orderData: undefined,
    feed: [],
    feedStats: { total: 0, totalToday: 0 }
  };

  test('should handle getFeed.pending', () => {
    const action = { type: getFeed.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoadingFeed).toBe(true);
  });

  test('should handle getFeed.fulfilled', () => {
    const mockFeedData = {
      orders: [
        { _id: '1', status: 'done', number: 1 },
        { _id: '2', status: 'pending', number: 2 }
      ],
      total: 100,
      totalToday: 10
    };

    const action = {
      type: getFeed.fulfilled.type,
      payload: mockFeedData
    };
    const state = ordersSlice.reducer(initialState, action);

    expect(state.feed).toEqual(mockFeedData.orders);
    expect(state.feedStats).toHaveProperty('total', mockFeedData.total);
    expect(state.feedStats).toHaveProperty(
      'totalToday',
      mockFeedData.totalToday
    );
    expect(state.isLoadingFeed).toBe(false);
  });

  test('should handle getOrderByNumber.fulfilled', () => {
    const mockOrderData = {
      orders: [{ _id: '1', status: 'done', number: 1 }]
    };

    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrderData
    };
    const state = ordersSlice.reducer(initialState, action);

    expect(state.orderData).toEqual(mockOrderData.orders[0]);
  });

  test('should handle getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoadingOrders).toBe(true);
  });

  test('should handle getUserOrders.fulfilled', () => {
    const mockOrders = [
      { _id: '1', status: 'done', number: 1 },
      { _id: '2', status: 'pending', number: 2 }
    ];

    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersSlice.reducer(initialState, action);

    expect(state.orders).toEqual(mockOrders);
    expect(state.isLoadingOrders).toBe(false);
  });
});
