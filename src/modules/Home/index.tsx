import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Title } from '@components';

import Ribbon from './components/Ribbon';
import Search from './components/Search';

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
    <>
      <Title title="Поиск резюме" />
      <Search openFilters={openFilters} setOpenFilters={setOpenFilters} />
      <Ribbon loading={loadingResumes} data={data} />
    </>
  );
};

export default Home;
