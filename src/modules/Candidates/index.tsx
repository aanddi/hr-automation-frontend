import { Breadcrumb, Title } from '@components';

import { AboutRequest } from '@common/components';
import { useAppSelector } from '@common/hooks';

import { Tabs, TabsProps } from 'antd';

import Resumes from './components/Resumes';

import { itemsBreadcrumb } from './constans';
import styles from './Сandidates.module.scss';

const Candidates = () => {
  const { request } = useAppSelector((state) => state.request);

  console.log(request)

  const dataInfo = {
    prompt: request?.prompt,
    urlHh: request?.urlHhRuApi,
    createdAt: String(new Date()),
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Найденные резюме',
      children: <Resumes data={request} />,
    },
    {
      key: '2',
      label: 'Информация о запросе',
      children: <AboutRequest data={dataInfo} />,
    },
  ];

  return (
    <div className={styles.candidates}>
      <div className={styles.header}>
        <Breadcrumb items={itemsBreadcrumb} />
        <Title title=" Результат поиска" />
      </div>
      <div className={styles.content}>
        <Tabs defaultActiveKey="1" items={items} size="large" />
      </div>
    </div>
  );
};

export default Candidates;
