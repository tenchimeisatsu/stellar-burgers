import store, { rootReducer } from '../services/store';

describe('rootReducer tests', () => {
  test('should correctly return state after UNKNOWN_ACTION', () => {
    const initialState = store.getState();
    const afterAction = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(afterAction).toEqual(initialState);
  });
});
