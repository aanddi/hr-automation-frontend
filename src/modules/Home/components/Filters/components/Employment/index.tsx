import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex } from 'antd';

import { employment } from '../../constans';
import styles from '../Components.module.scss';

const Employment = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Тип занятости:</div>
        <Flex vertical>
          <Controller
            name="employment"
            control={control}
            render={({ field }) => (
              <Checkbox.Group {...field}>
                <Flex vertical gap={8}>
                  {employment.map((item) => {
                    return (
                      <Checkbox checked={field.value} key={item.id} value={item.id}>
                        {item.name}
                      </Checkbox>
                    );
                  })}
                </Flex>
              </Checkbox.Group>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Employment;
