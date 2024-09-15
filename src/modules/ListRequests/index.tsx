import { Skeleton, Title } from '@components';

import { Alert } from 'antd';

import CardRequest from './components/CardRequest';

import styles from './ListRequests.module.scss';
import { useRequests } from './model';

const ListRequests = () => {
  const { data, isLoading, isFetching } = useRequests();

  return (
    <div className={styles.list}>
      <Title title="Мои запросы" />
      <div className={styles.content}>
        {!data && !isLoading && <Alert message="Запросы не найдены" type="info" />}
        {data?.items.length === 0 && <Alert message="У вас нет запросов" type="info" />}
        <div className={styles.ribon}>
          {data?.items.map((card) => {
            return <CardRequest key={card.id} item={card} id={card.id} />;
          })}
          {isLoading &&
            isFetching &&
            Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="150px" />)}
        </div>
      </div>
    </div>
  );
};

export default ListRequests;
