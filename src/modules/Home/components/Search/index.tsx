import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Title } from '@components';

import { ContainerPage } from '@common/components';
import { Search as SearchIcon, Settings } from '@common/icons';

import { Badge, Button, Flex, Input } from 'antd';

import styles from './Search.module.scss';

import Filters from '../Filters';

interface ISearch {
  openFilters: boolean;
  setOpenFilters: (state: boolean) => void;
}

const Search = ({ openFilters, setOpenFilters }: ISearch) => {
  const [countFilters, setCountFilters] = useState(0);
  const location = useLocation();

  const handleCountFilters = (params: string) => {
    if (!params) return [];

    const paramsClose = ['per_page', 'page', 'order_by'];

    const arrayParams = params
      .slice(1)
      .split('&')
      .filter((param) => {
        const nameParam = param.split('=')[0];
        if (paramsClose.includes(nameParam)) return;
        return nameParam;
      });

    return arrayParams;
  };

  useEffect(() => {
    setCountFilters(handleCountFilters(location.search).length);
  }, [location]);

  return (
    <div className={styles.search}>
      <ContainerPage>
        <Title title="Поиск резюме" />
        <Flex gap={16} className={styles.content}>
          <Input
            prefix={<SearchIcon className={styles.searchIcon} />}
            placeholder="Поиск"
            size="large"
            className={styles.formItem}
          />
          <Badge count={countFilters}>
            <Button
              type="default"
              size="large"
              icon={<Settings className={styles.icon} />}
              onClick={() => setOpenFilters(true)}
              className={`${styles.buttonFilter} ${styles.formItem}`}
            />
          </Badge>
          <Button type="primary" size="large" className={styles.buttonSubmit}>
            Найти
          </Button>
        </Flex>
        <Filters openFilter={openFilters} setOpenFilter={setOpenFilters} />
      </ContainerPage>
    </div>
  );
};

export default Search;
