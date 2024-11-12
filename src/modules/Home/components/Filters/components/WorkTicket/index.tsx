import { Controller, useFormContext } from 'react-hook-form';

import { Flex, Select } from 'antd';

import { useCountries } from '../../api';
import styles from '../Components.module.scss';

const WorkTicket = () => {
  const { control } = useFormContext();

  const { data } = useCountries();

  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Разрешение на работу:</div>
        <Flex vertical gap={8} style={{ width: '100%' }}>
          <Controller
            name="work_ticket"
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

export default WorkTicket;
