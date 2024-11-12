import { Title } from '@components';

import { ContainerPage } from '@common/components';
import { Search as SearchIcon, Settings } from '@common/icons';

import { Button, Flex, Input } from 'antd';

import styles from './Search.module.scss';

import Filters from '../Filters';

interface ISearch {
  openFilters: boolean;
  setOpenFilters: (state: boolean) => void;
}

const Search = ({ openFilters, setOpenFilters }: ISearch) => {
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
          <Button
            type="default"
            size="large"
            icon={<Settings className={styles.icon} />}
            onClick={() => setOpenFilters(true)}
            className={`${styles.buttonFilter} ${styles.formItem}`}
          />
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
