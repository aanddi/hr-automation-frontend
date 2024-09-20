import { Controller, useFormContext } from 'react-hook-form';

import { useExperience } from '@modules/Home/model';

import { Skeleton } from '@components';

import { Alert, Flex, Select, TreeSelect } from 'antd';

import { expPeriod } from '../../constans';
import styles from '../Components.module.scss';

const Region = () => {
  const { control, getValues } = useFormContext();

  const { data: experience, isLoading, isFetching } = useExperience();

  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Опыт работы в отрасли:</div>
        <Flex vertical gap={8} style={{ width: '100%' }}>
          <Flex>
            {isLoading || isFetching ? (
              <Skeleton paragraph={false} active height="35px" />
            ) : (
              <Controller
                name="filter_exp_industry"
                control={control}
                render={({ field, ...restField }) => (
                  <TreeSelect
                    placeholder="Отрасль"
                    treeNodeFilterProp={'title'}
                    treeData={experience}
                    showSearch
                    size="large"
                    style={{ width: '100%' }}
                    allowClear
                    treeCheckable
                    treeCheckStrictly
                    maxTagCount={3}
                    maxTagTextLength={25}
                    multiple
                    defaultValue={getValues('filter_exp_industry')}
                    onChange={(selectedValues) => {
                      field.onChange(selectedValues.map((value: any) => value.value));
                    }}
                    {...restField}
                  />
                )}
              />
            )}
          </Flex>
          <Flex style={{ width: '100%' }}>
            <Controller
              name="filter_exp_period"
              control={control}
              render={({ field }) => (
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  options={expPeriod}
                  defaultValue={expPeriod[0].value}
                  {...field}
                />
              )}
            />
          </Flex>
          <Alert
            message="Покажем резюме тех, кто месяц и дольше работал в нужной вам отрасли. Если важно, чтобы опыт был свежим, выбирайте период «За последний год»."
            type="info"
            closable
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Region;
