import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex, InputNumber, Select } from 'antd';

import { salary } from '../../constans';
import styles from '../Components.module.scss';

const Salary = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Зарплата:</div>
        <Flex vertical style={{ width: '100%' }} gap={8}>
          <Flex gap={16}>
            <Controller
              name="salary_from"
              control={control}
              render={({ field }) => (
                <InputNumber style={{ width: '100%' }} placeholder="от" size="large" {...field} />
              )}
            />
            <Controller
              name="salary_to"
              control={control}
              render={({ field }) => (
                <InputNumber style={{ width: '100%' }} placeholder="до" size="large" {...field} />
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
