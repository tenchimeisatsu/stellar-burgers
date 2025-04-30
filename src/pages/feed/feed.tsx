import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeed,
  selectFeed,
  selectFeedIsLoading
} from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeed);
  const isLoading = useSelector(selectFeedIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeed());
      dispatch(getIngredients());
    }
  }, [orders]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
