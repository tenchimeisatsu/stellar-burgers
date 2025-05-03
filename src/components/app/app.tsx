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
import { getIngredients } from '../../services/slices/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const currentOrder = useSelector(selectOrderByNumber);
  useEffect(() => {
    if (!isAuthorized) {
      dispatch(getUser());
    }
    dispatch(getIngredients());
  }, [dispatch, isAuthorized]);
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
            <ProtectedRoute anonymous>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute anonymous>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute anonymous>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute anonymous>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute anonymous={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute anonymous={false}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute anonymous={false}>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
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
                <ProtectedRoute anonymous={false}>
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
