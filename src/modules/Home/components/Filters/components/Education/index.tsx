import { Controller, useFormContext } from 'react-hook-form';

import { Button, Flex, Radio } from 'antd';

import { educationLevel } from '../../constans';
import styles from '../Components.module.scss';

const Education = () => {
  const { control, resetField } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Образование:</div>
        <Flex vertical>
          <Controller
            name="education_level"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Flex vertical gap={8}>
                  {educationLevel.map((level) => {
                    return (
                      <Radio key={level.id} value={level.id}>
                        {level.name}
                      </Radio>
                    );
                  })}
                  <Button
                    onClick={() => resetField('education_level')}
                    type="link"
                    size="small"
                    style={{ width: 'max-content', padding: '0' }}
                  >
                    Очистить
                  </Button>
                </Flex>
              </Radio.Group>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Education;
