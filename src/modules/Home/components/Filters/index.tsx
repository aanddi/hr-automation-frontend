import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Drawer, Flex } from 'antd';

import {
  AgeAndPhoto,
  Education,
  Employment,
  Experience,
  Gender,
  Salary,
  Schedule,
  ShowOnPage,
  Sorting,
  StatusesEmployer,
  Text,
} from './components';

import styles from './Filters.module.scss';

interface IFilters {
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
}

const Filters = ({ openFilter, setOpenFilter }: IFilters) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = useCallback(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    if (params.toString().length > 0) {
      const transformedParams: any = {};

      const experiences = new URLSearchParams(location.search).getAll('experience');
      const employments = new URLSearchParams(location.search).getAll('employment');
      const schedules = new URLSearchParams(location.search).getAll('schedule');

      transformedParams['experience'] = [...experiences];
      transformedParams['employment'] = [...employments];
      transformedParams['schedule'] = [...schedules];

      for (const key in params) {
        if (key === 'label') {
          const labels = new URLSearchParams(location.search).getAll('label');
          labels.forEach((label) => {
            transformedParams[`label_${label}`] = true;
          });
        }

        if (key === 'experience' || key === 'employment' || key === 'schedule') continue;

        transformedParams[key] = params[key];
      }

      console.log(transformedParams)
      return transformedParams;
    }

    return {};
  }, [location.search]);

  const defaultdsf = getQueryParams();

  const methods = useForm({
    defaultValues: {
      logic: 'all',
      order_by: 'relevance',
      gender: 'unknown',
      ...defaultdsf,
    },
  });

  console.log(methods.getValues());

  const handleSearch = async (data: any) => {
    const newUrlParams = new URLSearchParams();

    for (const key in data) {
      if (data[key] && !key.startsWith('label_') && !Array.isArray(data[key])) {
        newUrlParams.set(key, data[key]);
      }

      if (Array.isArray(data[key])) {
        const array: string[] = data[key];
        array.map((level) => {
          return newUrlParams.append(key, level);
        });
      }

      if (key.startsWith('label_') && data[key]) {
        const substring = key.slice(6);
        newUrlParams.append('label', substring);
      }
    }

    navigate({
      pathname: location.pathname,
      search: newUrlParams.toString(),
    });

    setOpenFilter(false);
  };

  const handleResetParams = () => {
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams().toString(),
    });
    methods.reset();
    setOpenFilter(false);
  };

  return (
    <Drawer
      closable
      destroyOnClose
      title={<p>Фильтры</p>}
      placement="right"
      open={openFilter}
      width={800}
      onClose={() => setOpenFilter(false)}
      className={styles.filter}
      footer={
        <Flex className={styles.footer} gap={16}>
          <Button type="primary" size="large" onClick={methods.handleSubmit(handleSearch)}>
            Применить
          </Button>
          <Button type="text" size="large" onClick={handleResetParams}>
            Очистить фильтр
          </Button>
        </Flex>
      }
    >
      <FormProvider {...methods}>
        <Flex vertical gap={32}>
          <Text />
          <StatusesEmployer />
          <AgeAndPhoto />
          <Salary />
          <Gender />
          <Education />
          <Experience />
          <Schedule />
          <Employment />
          <Sorting />
          <ShowOnPage />
        </Flex>
      </FormProvider>
    </Drawer>
  );
};

export default Filters;
