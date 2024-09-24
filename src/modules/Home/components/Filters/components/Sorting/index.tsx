import { Controller, useFormContext } from 'react-hook-form';

import { Flex, Radio } from 'antd';

import { searchOrder } from '../../dictionaries';
import styles from '../Components.module.scss';

const Sorting = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Сортировка:</div>
        <Flex vertical>
          <Controller
            name="order_by"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Flex vertical gap={8}>
                  {searchOrder.map((item) => {
                    return (
                      <Radio key={item.id} value={item.id}>
                        {item.name}
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

export default Sorting;
