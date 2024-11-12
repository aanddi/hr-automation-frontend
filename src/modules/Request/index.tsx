import { useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { AboutRequest, ContainerPage } from '@common/components';

import { Skeleton, Tabs, TabsProps } from 'antd';

import Resumes from './components/Resumes';

import styles from './Request.module.scss';
import { useRequestsById } from './api';
import { itemsBreadcrumb } from './constance';

const Request = () => {
  const { id } = useParams();

  const { data: requestData, isFetching } = useRequestsById(Number(id));

  const items: TabsProps['items'] = [
    {
      key: 'resumes',
      label: 'Резюме',
      children: <Resumes resumes={requestData?.resumes || []} idRequest={requestData?.idRequest} />,
    },
    {
      key: 'info',
      label: 'Информация о запросе',
      children: <AboutRequest data={requestData?.info} />,
    },
  ];

  return (
    <ContainerPage className={styles.list}>
      <div className={styles.header}>
        <Breadcrumb items={itemsBreadcrumb} />
        {isFetching ? (
          <Skeleton.Input active />
        ) : (
          <Title
            title={
              requestData?.info.title
                ? `${requestData?.info.title}`
                : `Запрос № ${requestData?.idRequest}`
            }
          />
        )}
      </div>

      {isFetching &&
        [...Array(2)].map((_, index) => (
          <Skeleton className={styles.skeleton} key={index} active />
        ))}

      {requestData && <Tabs defaultActiveKey="resumes" items={items} size="large" />}
    </ContainerPage>
  );
};

export default Request;
