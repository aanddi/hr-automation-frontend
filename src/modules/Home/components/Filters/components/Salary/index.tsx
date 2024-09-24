import { Controller, useFormContext } from 'react-hook-form';

import { formatPrice, parserNumber } from '@common/utils/formatted/Number';

import { Checkbox, Flex, InputNumber, Select } from 'antd';

import { salary } from '../../dictionaries';
import styles from '../Components.module.scss';

const Salary = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Зарплата:</div>
        <Flex vertical style={{ width: '100%' }} gap={8}>
          <Flex gap={16}>
            <Controller
              name="salary_from"
              control={control}
              render={({ field }) => (
                <InputNumber
                  min={0}
                  formatter={(valueInput) => formatPrice(valueInput as number)}
                  parser={(valueInput) => parserNumber(valueInput) as unknown as string}
                  placeholder="от"
                  size="large"
                  className={styles.inputNumber}
                  {...field}
                />
              )}
            />
            <Controller
              name="salary_to"
              control={control}
              render={({ field }) => (
                <InputNumber
                  min={0}
                  formatter={(value) => formatPrice(value as number)}
                  parser={(value) => parserNumber(value) as unknown as string}
                  placeholder="до"
                  size="large"
                  className={styles.inputNumber}
                  {...field}
                />
              )}
            />
            <Controller
              name="currency_code"
              control={control}
              render={({ field }) => (
                <Select size="large" options={salary} defaultValue={salary[0].value} {...field} />
              )}
            />
          </Flex>
          <Controller
            name="label_only_with_salary"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} {...field}>
                Не показывать резюме без зарплаты
              </Checkbox>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Salary;
