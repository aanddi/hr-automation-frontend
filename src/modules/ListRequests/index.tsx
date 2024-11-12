import { Skeleton, Title } from '@components';

import { ContainerPage } from '@common/components';

import { Alert } from 'antd';

import CardRequest from './components/CardRequest';

import styles from './ListRequests.module.scss';
import { useRequests } from './api';

const ListRequests = () => {
  const { data: requests, isLoading: isLoadingRequest } = useRequests();

  return (
    <ContainerPage className={styles.list}>
      <Title title="Мои запросы" />
      <div className={styles.content}>
        {requests?.items.length === 0 && !isLoadingRequest && (
          <Alert message="Запросы не найдены" type="info" />
        )}

        <div className={styles.ribbon}>
          {requests?.items.map((card) => {
            return <CardRequest key={card.id} item={card} id={card.id} />;
          })}

          {isLoadingRequest &&
            [...Array(8)].map((_, index) => (
              <Skeleton key={index} height="150px" className={styles.skeleton} />
            ))}
        </div>
      </div>
    </ContainerPage>
  );
};

export default ListRequests;
