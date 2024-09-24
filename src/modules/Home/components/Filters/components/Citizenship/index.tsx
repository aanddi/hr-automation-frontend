import { Controller, useFormContext } from 'react-hook-form';

import { useCountries } from '@modules/Home/model';

import { Flex, Select } from 'antd';

import styles from '../Components.module.scss';

const Citizenship = () => {
  const { control } = useFormContext();

  const { data } = useCountries();

  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Гражданство:</div>
        <Flex vertical gap={8} style={{ width: '100%' }}>
          <Controller
            name="citizenship"
            control={control}
            render={({ field }) => (
              <Select
                mode="multiple"
                placeholder="Выбор стран"
                style={{ width: '100%' }}
                size="large"
                options={data}
                {...field}
              />
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Citizenship;
