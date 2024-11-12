import { Controller, useFormContext } from 'react-hook-form';

import { Flex, Radio } from 'antd';

import { showOnPage } from '../../dictionaries';
import styles from '../Components.module.scss';

const ShowOnPage = () => {
  const { control } = useFormContext();

  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Показывать на странице:</div>
        <Flex vertical>
          <Controller
            name="per_page"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Flex vertical gap={8}>
                  {showOnPage.map((item) => {
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

export default ShowOnPage;
