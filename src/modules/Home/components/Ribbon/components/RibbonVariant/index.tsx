import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IDataResumes } from '@common/api/services/hh/types';
import { IСandidates } from '@common/api/services/scoreball/type';

import { Flex, Pagination, Segmented } from 'antd';

import Card from './components/Card';
import ResumesTable from './components/Table';

import styles from './RibbonVariant.module.scss';

enum Display {
  CARD = 'card',
  TABLE = 'table',
}

interface IRibbon {
  loading: boolean;
  data: IDataResumes;
  candidates: IСandidates[];
}

const RibbonVariant = ({ data, candidates, loading }: IRibbon) => {
  const [displayRibbon, setDisplayRibbon] = useState(
    localStorage.getItem('display') || Display.CARD,
  );

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const currentPage = parseInt(params.get('page') || '1', 10);

  const handlePageChange = (page: number) => {
    params.set('page', page.toString());

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });

    window.scrollTo({
      top: 0,
    });
  };

  const handleVariant = (valueSegmented: string) => {
    localStorage.setItem('display', valueSegmented);
    setDisplayRibbon(valueSegmented as Display);
  };

  return (
    <div className={styles.ribbon}>
      <Flex justify="flex-end" className={styles.segmented}>
        <Segmented
          defaultValue={displayRibbon}
          options={[
            {
              label: 'Карточный вид',
              value: Display.CARD,
              icon: <AppstoreOutlined />,
            },
            {
              label: 'Табличный вид',
              value: Display.TABLE,
              icon: <BarsOutlined />,
            },
          ]}
          onChange={(valueSegmented) => handleVariant(valueSegmented)}
        />
      </Flex>
      {displayRibbon === Display.CARD ? (
        <Card data={data} loading={loading} />
      ) : (
        <ResumesTable data={candidates} loading={loading} />
      )}
      <Pagination
        current={currentPage}
        defaultCurrent={currentPage}
        total={data?.pages}
        onChange={handlePageChange}
        showSizeChanger={false}
        pageSize={data?.per_page}
        defaultPageSize={5}
        className={styles.pagination}
      />
    </div>
  );
};

export default RibbonVariant;
