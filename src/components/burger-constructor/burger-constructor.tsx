import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  resetConstructorState,
  selectCreatedOrder,
  selectOrder,
  selectOrderIsLoading
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthorized } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectOrder);
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector(selectOrderIsLoading);

  const orderModalData = useSelector(selectCreatedOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthorized) navigate('/login');
    const burgerIngredients = [
      constructorItems.bun,
      ...constructorItems.ingredients,
      constructorItems.bun
    ].map((ingredient) => ingredient._id);
    dispatch(createOrder(burgerIngredients));
  };
  const closeOrderModal = () => {
    dispatch(resetConstructorState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
