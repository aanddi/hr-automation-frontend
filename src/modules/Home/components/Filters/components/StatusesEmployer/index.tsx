import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex } from 'antd';

import { statusesEmployer } from '../../dictionaries';
import styles from '../Components.module.scss';

const StatusesEmployer = () => {
  const { control } = useFormContext();

  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Статус поиска:</div>
        <Flex vertical>
          <Controller
            name="job_search_status"
            control={control}
            render={({ field }) => (
              <Checkbox.Group {...field}>
                <Flex vertical gap={8}>
                  {statusesEmployer.map((level) => {
                    return (
                      <Checkbox checked={field.value} key={level.id} value={level.id}>
                        {level.name}
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

export default StatusesEmployer;
