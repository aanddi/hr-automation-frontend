import { Controller, useFormContext } from 'react-hook-form';

import { Flex, Input, Select } from 'antd';

import { resumeSearchLogic } from '../../constans';
import styles from '../Components.module.scss';

const Text = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Ключевые слова:</div>
        <Flex vertical style={{ width: '100%' }} gap={8}>
          <Flex>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <Input placeholder="Поиск по резюме и навыкам" size="large" {...field} />
              )}
            />
          </Flex>
          <Controller
            name="logic"
            control={control}
            render={({ field }) => (
              <Select
                options={resumeSearchLogic}
                defaultValue="all"
                style={{ width: 120 }}
                popupMatchSelectWidth={false}
                variant="borderless"
                className={styles.select}
                {...field}
              />
            )}
          />
          {/* <Controller
            name="logic"
            control={control}
            render={({ field }) => (
              <Select
                options={resumeSearchLogic}
                defaultValue={'all'}
                style={{ width: '30%' }}
                variant="borderless"
                {...field}
              />
            )}
          /> */}
        </Flex>
      </Flex>
    </form>
  );
};

export default Text;
