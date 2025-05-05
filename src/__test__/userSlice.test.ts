import {
  userSlice,
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logout
} from '../services/slices/userSlice';

describe('userSlice tests', () => {
  const initialState = {
    isAuthorized: false,
    user: undefined
  };

  test('should handle loginUser.fulfilled', () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthorized).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('should handle registerUser.fulfilled', () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthorized).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('should handle getUser.fulfilled', () => {
    const mockUserData = {
      user: {
        email: 'test@example.com',
        name: 'Test User'
      }
    };

    const action = {
      type: getUser.fulfilled.type,
      payload: mockUserData
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthorized).toBe(true);
    expect(state.user).toEqual(mockUserData.user);
  });

  test('should handle updateUser.fulfilled', () => {
    const initialStateWithUser = {
      isAuthorized: true,
      user: {
        email: 'old@example.com',
        name: 'Old User'
      }
    };

    const mockUserData = {
      user: {
        email: 'new@example.com',
        name: 'New User'
      }
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUserData
    };
    const state = userSlice.reducer(initialStateWithUser, action);

    expect(state.user).toEqual(mockUserData.user);
  });

  test('should handle logout.fulfilled', () => {
    const initialStateWithUser = {
      isAuthorized: true,
      user: {
        email: 'test@example.com',
        name: 'Test User'
      }
    };

    const action = { type: logout.fulfilled.type };
    const state = userSlice.reducer(initialStateWithUser, action);

    expect(state.isAuthorized).toBe(false);
    expect(state.user).toBeUndefined();
  });
});
