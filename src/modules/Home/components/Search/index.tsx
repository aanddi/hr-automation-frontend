import { Button, Flex, Input } from 'antd';

import { Settings2 } from 'lucide-react';

import styles from './Search.module.scss';

import Filters from '../Filters';

interface ISearch {
  openFilters: boolean;
  setOpenFilters: (state: boolean) => void;
}

const Search = ({ openFilters, setOpenFilters }: ISearch) => {
  return (
    <>
      <Flex gap={16} className={styles.content}>
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
      </Flex>
      <Filters openFilter={openFilters} setOpenFilter={setOpenFilters} />
    </>
  );
};

export default Search;
