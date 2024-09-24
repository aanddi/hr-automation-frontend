import debounce from 'lodash/debounce';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { HhruService } from '@common/api/services/hh';

import { Flex, Select } from 'antd';

import styles from '../Components.module.scss';

interface ISkills {
  id: string;
  text: string;
}

const Skills = () => {
  const { control, getValues } = useFormContext();

  const [suggest, setSuggest] = useState([]);

  const handleSearch = (value: string) => {
    const debouncedSearch = debounce(async (value) => {
      if (value) {
        const response = await HhruService.getSkillsSuggest(value);
        const formatter = response.items.map((elem: ISkills) => {
          return {
            value: elem.id,
            label: elem.text,
          };
        });
        setSuggest(formatter);
      }
    }, 500);

    debouncedSearch(value);
  };

  return (
    <form>
      <Flex gap={20} align="center">
        <div className={styles.label}>Ключевые навыки:</div>
        <Flex vertical style={{ width: '100%' }}>
          <Controller
            name="skill"
            control={control}
            render={({ field }) => (
              <Select
                mode="multiple"
                size="large"
                placeholder="Поиск"
                onSearch={handleSearch}
                notFoundContent={null}
                defaultValue={getValues('skill')}
                defaultActiveFirstOption={false}
                filterOption={false}
                options={suggest}
                {...field}
              />
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default Skills;
