import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, Flex, InputNumber } from 'antd';

import styles from '../Components.module.scss';

const AgeAndPhoto = () => {
  const { control } = useFormContext();
  return (
    <form>
      <Flex gap={20}>
        <div className={styles.label}>Возраст и фото:</div>
        <Flex vertical gap={8}>
          <Flex gap={16}>
            <Controller
              name="age_from"
              control={control}
              render={({ field }) => (
                <InputNumber placeholder="от" size="large" min={0} max={100} {...field} />
              )}
            />
            <Controller
              name="age_to"
              control={control}
              render={({ field }) => (
                <InputNumber placeholder="до" size="large" min={0} max={100} {...field} />
              )}
            />
          </Flex>
          <Controller
            name="label_only_with_age"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} {...field}>
                Указан возраст
              </Checkbox>
            )}
          />
          <Controller
            name="label_only_with_photo"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} {...field}>
                Есть фото
              </Checkbox>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default AgeAndPhoto;
