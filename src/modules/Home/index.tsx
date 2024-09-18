import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Title } from '@components';

import { formatPrice } from '@common/utils/formatted/Number';

import { Button, Flex, Input, Skeleton } from 'antd';

import { Settings2 } from 'lucide-react';

import Filters from './components/Filters';
import RibbonResumes from './components/RibbonResumes';

import styles from './Home.module.scss';
import { useResumes } from './model';

const Home = () => {
  const [params] = useSearchParams();

  const { data, isFetching, isLoading, refetch } = useResumes(params.toString());

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const loadingResumes = isFetching || isLoading;

  return (
    <div className={styles.home}>
      <Title title="Поиск резюме" />
      <Flex gap={16}>
        <Input placeholder="Поиск" size="large" />
        <Button
          type="default"
          size="large"
          icon={<Settings2 size={20} />}
          onClick={() => setOpenFilters(true)}
          className={styles.buttonFilter}
        />
        <Button type="primary" size="large" className={styles.buttonSubmit}>
          Найти
        </Button>
        <Filters openFilter={openFilters} setOpenFilter={setOpenFilters} />
      </Flex>
      <div className={styles.content}>
        {loadingResumes ? (
          <Skeleton.Input active />
        ) : (
          <Title level={4} title={`Найдено ${formatPrice(data?.found)} резюме `} />
        )}
        <RibbonResumes data={data} loading={loadingResumes} />
      </div>
    </div>
  );
};

export default Home;
