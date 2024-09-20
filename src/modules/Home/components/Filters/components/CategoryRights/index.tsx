import { Controller, useFormContext } from 'react-hook-form';

import { Flex, Select } from 'antd';

import { driverLicenseTypes } from '../../constans';
import styles from '../Components.module.scss';

const CategoryRights = () => {
  const { control } = useFormContext();

  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Категория прав:</div>
        <Flex vertical gap={8} style={{ width: '100%' }}>
          <Controller
            name="driver_license_types"
            control={control}
            render={({ field }) => (
              <Select
                mode="multiple"
                placeholder="Категория"
                style={{ width: '100%' }}
                size="large"
                options={driverLicenseTypes}
                {...field}
              />
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default CategoryRights;
