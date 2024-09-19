import { useEffect } from 'react';
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

interface IFilter {
  salary_from: string;
  salary_to: string;
  age_from: string;
  age_to: string;
  text: string;
  logic: string;
  order_by: string;
  gender: string;
  currency_code: string;
  label_only_with_age: boolean;
  label_only_with_photo: boolean;
  label_only_with_salary: boolean;
  education_level: string;
  employment: string[];
  experience: string[];
  schedule: string[];
  job_search_status: string[];
  per_page: number;
}

const Filters = ({ openFilter, setOpenFilter }: IFilters) => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<IFilter>({
    defaultValues: {
      salary_from: '',
      salary_to: '',
      age_from: '',
      age_to: '',
      text: '',
      logic: 'all',
      order_by: 'relevance',
      gender: 'unknown',
      currency_code: 'RUR',
      label_only_with_age: false,
      label_only_with_photo: false,
      label_only_with_salary: false,
      education_level: '',
      employment: [],
      experience: [],
      schedule: [],
      job_search_status: [],
      per_page: 5,
    },
  });

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    const keysToSetAsArrays = ['experience', 'employment', 'schedule', 'job_search_status'];

    keysToSetAsArrays.forEach((key) => {
      methods.setValue(key as keyof IFilter, new URLSearchParams(location.search).getAll(key));
    });

    for (const key in params) {
      if (keysToSetAsArrays.includes(key)) continue;
      if (key === 'label') {
        const labels = new URLSearchParams(location.search).getAll('label');
        labels.forEach((label) => {
          methods.setValue(`label_${label}` as keyof IFilter, true);
        });
      }

      methods.setValue(key as keyof IFilter, params[key]);
    }
  }, [location, methods]);

  const handleSearch = async (data: any) => {
    const newUrlParams = new URLSearchParams();

    for (const key in data) {
      if (data[key] && !key.startsWith('label_') && !Array.isArray(data[key])) {
        newUrlParams.set(key, data[key]);
      }

      if (Array.isArray(data[key])) {
        data[key].map((level) => {
          return newUrlParams.append(key, level);
        });
      }

      if (key.startsWith('label_') && data[key]) {
        const substringLabel = key.slice(6);
        newUrlParams.append('label', substringLabel);
      }
    }

    navigate({
      pathname: location.pathname,
      search: newUrlParams.toString(),
    });

    setOpenFilter(false);
  };

  const handleResetParams = () => {
    setOpenFilter(false);
    methods.reset();
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams().toString(),
    });
  };

  return (
    <Drawer
      closable
      destroyOnClose
      title="Фильтры"
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
