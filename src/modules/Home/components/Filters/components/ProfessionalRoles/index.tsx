import { Controller, useFormContext } from 'react-hook-form';

import { Skeleton } from '@components';

import { Flex, TreeSelect } from 'antd';

import { useProfessionalRoles } from '../../api';
import styles from '../Components.module.scss';

const ProfessionalRoles = () => {
  const { control } = useFormContext();

  const { data: professionalRoles, isLoading, isFetching } = useProfessionalRoles();

  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Специализация:</div>
        <Flex style={{ width: '100%' }}>
          {isLoading || isFetching ? (
            <Skeleton paragraph={false} active height="35px" />
          ) : (
            <Controller
              name="professional_role"
              control={control}
              render={({ field, ...restField }) => (
                <TreeSelect
                  placeholder="Специализация"
                  treeNodeFilterProp={'title'}
                  treeData={professionalRoles}
                  className="treeselect"
                  showSearch
                  size="large"
                  style={{ width: '100%' }}
                  allowClear
                  maxTagCount={5}
                  multiple
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  treeCheckable
                  onChange={(selectedValues) => {
                    field.onChange(selectedValues.map((value: any) => value));
                  }}
                  {...restField}
                />
              )}
            />
          )}
        </Flex>
      </Flex>
    </form>
  );
};

export default ProfessionalRoles;
