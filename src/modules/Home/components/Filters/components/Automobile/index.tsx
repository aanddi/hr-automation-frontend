import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex } from 'antd';

import styles from '../Components.module.scss';

const Automobile = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Автомобиль:</div>
        <Flex vertical>
          <Controller
            name="label_only_with_vehicle"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} {...field}>
                Есть личный автомобиль
              </Checkbox>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Automobile;
