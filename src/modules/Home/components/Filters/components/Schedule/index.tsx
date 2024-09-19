import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex } from 'antd';

import { schedule } from '../../constans';
import styles from '../Components.module.scss';

const Schedule = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>График работы:</div>
        <Flex vertical>
          <Controller
            name="schedule"
            control={control}
            render={({ field }) => (
              <Checkbox.Group {...field}>
                <Flex vertical gap={8}>
                  {schedule.map((level) => {
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

export default Schedule;
