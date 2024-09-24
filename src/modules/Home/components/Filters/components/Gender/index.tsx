import { Controller, useFormContext } from 'react-hook-form';

import { Flex, Radio } from 'antd';

import { genders } from '../../dictionaries';
import styles from '../Components.module.scss';

const Gender = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Пол:</div>
        <Flex vertical>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Radio.Group onChange={(e) => field.onChange(e.target.value)} value={field.value}>
                <Flex vertical gap={8}>
                  {genders.map((item) => {
                    return (
                      <Radio key={item.value} value={item.value}>
                        {item.label}
                      </Radio>
                    );
                  })}
                </Flex>
              </Radio.Group>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Gender;
