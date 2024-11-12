import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Drawer, Flex } from 'antd';

import {
  AgeAndPhoto,
  Automobile,
  CategoryRights,
  Citizenship,
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
  WorkTicket,
} from './components';

import { defaultValuesForm } from './constans';
import { IFilterParams, IFilters } from './types';

const Filters = ({ openFilter, setOpenFilter }: IFilters) => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<IFilterParams>({
    defaultValues: defaultValuesForm,
  });

  useEffect(() => {
    const formValues = methods.getValues();

    // ключи массивов
    const arrayKeysForm = Object.keys(formValues).filter((key) =>
      Array.isArray(formValues[key as keyof IFilterParams]),
    );

    // загрузка всех массиво в форму
    arrayKeysForm.forEach((key) => {
      methods.setValue(
        key as keyof IFilterParams,
        new URLSearchParams(location.search).getAll(key),
      );
    });

    // загрузка простых параметров и label
    const params = Object.fromEntries(new URLSearchParams(location.search));

    for (const key in params) {
      // example: label: only_with_salary => label_only_with_salary: true
      if (key === 'label') {
        const labels = new URLSearchParams(location.search).getAll('label');
        labels.forEach((label) => {
          methods.setValue(`label_${label}` as keyof IFilterParams, true);
        });
      }

      if (!arrayKeysForm.includes(key)) {
        methods.setValue(key as keyof IFilterParams, params[key]);
      }
    }
  }, [location, methods]);

  const handleSearch = async (data: IFilterParams) => {
    const newUrlQueryParams = new URLSearchParams();

    console.log('Выгружаемые', data);

    Object.entries(data).forEach(([key, value]) => {
      const isArrayQuery = Array.isArray(value);
      const isLabelQuery = key.startsWith('label_') && value;
      const isSimpleQuery = value && !isLabelQuery && !isArrayQuery;

      if (isSimpleQuery) newUrlQueryParams.set(key, value);

      // example: label_only_with_salary: true => label: only_with_salary
      if (isLabelQuery) newUrlQueryParams.append('label', key.slice(6));

      if (isArrayQuery) {
        value.forEach((elem: string) => newUrlQueryParams.append(key, elem));
      }
    });

    navigate({
      pathname: location.pathname,
      search: newUrlQueryParams.toString(),
    });

    setOpenFilter(false);
  };

  const handleResetParams = () => {
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams().toString(),
    });
    setOpenFilter(false);
    methods.reset();
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
      footer={
        <Flex gap={16} style={{ padding: '16px' }}>
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
          {/* <Skills /> */}
          <Citizenship />
          <WorkTicket />
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
