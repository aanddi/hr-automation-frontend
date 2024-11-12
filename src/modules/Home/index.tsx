import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Ribbon from './components/Ribbon';
import Search from './components/Search';

import { useResumes } from './api';

const Home = () => {
  const [params] = useSearchParams();

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const { data, isFetching, refetch } = useResumes(params.toString());

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <Search openFilters={openFilters} setOpenFilters={setOpenFilters} />
      <Ribbon loading={isFetching} data={data} />
    </>
  );
};

export default Home;
