import { Controller, useFormContext } from 'react-hook-form';

import { useAreas } from '@modules/Home/model';

import { Skeleton } from '@components';

import { Flex, Select, TreeSelect } from 'antd';

import { searchRelocation } from '../../constans';
import styles from '../Components.module.scss';

const Region = () => {
  const { control, getValues } = useFormContext();

  const { data: areas, isLoading, isFetching } = useAreas();

  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Регион:</div>
        <Flex vertical gap={8} style={{ width: '100%' }}>
          <Flex>
            {isLoading || isFetching ? (
              <Skeleton paragraph={false} active height="35px" />
            ) : (
              <Controller
                name="area"
                control={control}
                render={({ field, ...restField }) => (
                  <TreeSelect
                    showCheckedStrategy={TreeSelect.SHOW_PARENT}
                    placeholder="Регион"
                    treeNodeFilterProp={'title'}
                    treeData={areas}
                    showSearch
                    size="large"
                    style={{ width: '100%' }}
                    allowClear
                    treeCheckable
                    maxTagCount={3}
                    multiple
                    defaultValue={getValues('area')}
                    onChange={(selectedValues) => {
                      field.onChange(selectedValues.map((value: any) => value));
                    }}
                    {...restField}
                  />
                )}
              />
            )}
          </Flex>
          <Flex style={{ width: '100%' }}>
            <Controller
              name="relocation"
              control={control}
              render={({ field }) => (
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  options={searchRelocation}
                  defaultValue={searchRelocation[0].value}
                  {...field}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default Region;
