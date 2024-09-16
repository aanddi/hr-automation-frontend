import { useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { AboutRequest } from '@common/components';

import { Alert, Skeleton, Tabs, TabsProps } from 'antd';

import Resumes from './components/Resumes';

import styles from './Request.module.scss';
import { itemsBreadcrumb } from './constance';
import { useRequestsById } from './model';

const Request = () => {
  const { id } = useParams();

  const { data: requestData, isFetching, isLoading } = useRequestsById(Number(id));

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Резюме',
      children: <Resumes resumes={requestData?.resumes || []} idRequest={requestData?.idRequest} />,
    },
    {
      key: '2',
      label: 'Информация о запросе',
      children: <AboutRequest data={requestData?.info} />,
    },
  ];

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <Breadcrumb items={itemsBreadcrumb} />
        <Title title={`Запрос № ${requestData?.idRequest ?? ''}`} />
      </div>
      {isFetching &&
        isLoading &&
        Array.from({ length: 2 }).map((_, index) => (
          <Skeleton className={styles.skeleton} key={index} active />
        ))}
      {!requestData && !isLoading && <Alert message="Ошибка" type="error" />}
      {requestData && (
        <div className={styles.content}>
          <Tabs defaultActiveKey="1" items={items} size="large" />
        </div>
      )}
    </div>
  );
};

export default Request;
