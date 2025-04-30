import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, selectIsAuthorized } from '../../services/slices/userSlice';
import { useEffect } from 'react';
import { selectOrderByNumber } from '../../services/slices/ordersSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const currentOrder = useSelector(selectOrderByNumber);
  useEffect(() => {
    if (!isAuthorized) {
      dispatch(getUser());
    }
  }, [isAuthorized]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { background?: Location };
  const goBackward = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isAuthorized={!isAuthorized} redirect='/profile'>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isAuthorized={!isAuthorized} redirect='/profile'>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isAuthorized={!isAuthorized} redirect='/profile'>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isAuthorized={!isAuthorized} redirect='/profile'>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthorized={isAuthorized} redirect='/login'>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isAuthorized={isAuthorized} redirect='/login'>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={currentOrder ? `${currentOrder.number}` : ''}
                onClose={goBackward}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={goBackward}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={currentOrder ? `${currentOrder.number}` : ''}
                onClose={goBackward}
              >
                <ProtectedRoute isAuthorized={isAuthorized} redirect='/login'>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
