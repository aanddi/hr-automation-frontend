import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex } from 'antd';

import { experience } from '../../dictionaries';
import styles from '../Components.module.scss';

const Experience = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Опыт работы:</div>
        <Flex vertical>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Checkbox.Group {...field}>
                <Flex vertical gap={8}>
                  {experience.map((level) => {
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

export default Experience;
