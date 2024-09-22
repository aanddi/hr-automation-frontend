import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Drawer, Flex } from 'antd';

import {
  AgeAndPhoto,
  Automobile,
  CategoryRights,
  Education,
  Employment,
  Experience,
  ExperienceIndustry,
  Gender,
  ProfessionalRoles,
  Region,
  Salary,
  Schedule,
  ShowOnPage,
  Sorting,
  StatusesEmployer,
  Text,
} from './components';

import styles from './Filters.module.scss';
import { IFilterParams } from './types';

interface IFilters {
  openFilter: boolean;
  setOpenFilter: (state: boolean) => void;
}

const Filters = ({ openFilter, setOpenFilter }: IFilters) => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<IFilterParams>({
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
      label_only_with_vehicle: false,
      education_level: '',
      employment: [],
      experience: [],
      schedule: [],
      job_search_status: [],
      area: [],
      filter_exp_industry: [],
      driver_license_types: [],
      per_page: 5,
      relocation: 'living_or_relocation',
      filter_exp_period: 'all_time',
      professional_role: [],
    },
  });

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    const keysToSetAsArrays = [
      'experience',
      'employment',
      'schedule',
      'job_search_status',
      'area',
      'filter_exp_industry',
      'driver_license_types',
      'professional_role',
    ];

    keysToSetAsArrays.forEach((key) => {
      methods.setValue(
        key as keyof IFilterParams,
        new URLSearchParams(location.search).getAll(key),
      );
    });

    for (const key in params) {
      if (keysToSetAsArrays.includes(key)) continue;
      if (key === 'label') {
        const labels = new URLSearchParams(location.search).getAll('label');
        labels.forEach((label) => {
          methods.setValue(`label_${label}` as keyof IFilterParams, true);
        });
      }

      methods.setValue(key as keyof IFilterParams, params[key]);
    }
  }, [location, methods]);

  const handleSearch = async (data: any) => {
    const newUrlQueryParams = new URLSearchParams();

    for (const key in data) {
      if (data[key] && !key.startsWith('label_') && !Array.isArray(data[key])) {
        newUrlQueryParams.set(key, data[key]);
      }

      if (Array.isArray(data[key])) {
        data[key].map((level) => {
          return newUrlQueryParams.append(key, level);
        });
      }

      if (key.startsWith('label_') && data[key]) {
        const substringLabel = key.slice(6);
        newUrlQueryParams.append('label', substringLabel);
      }
    }

    navigate({
      pathname: location.pathname,
      search: newUrlQueryParams.toString(),
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
          <ProfessionalRoles />
          <ExperienceIndustry />
          <Region />
          <StatusesEmployer />
          <AgeAndPhoto />
          <Salary />
          <Gender />
          <Education />
          <Experience />
          <Schedule />
          <Employment />
          <Automobile />
          <CategoryRights />
          <Sorting />
          <ShowOnPage />
        </Flex>
      </FormProvider>
    </Drawer>
  );
};

export default Filters;
