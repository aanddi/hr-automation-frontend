import { Controller, useForm } from 'react-hook-form';

import { Title } from '@components';

import { ISearchGpt } from '@common/api/services/search/types';

import { Button, Input } from 'antd';

import { Search } from 'lucide-react';

import History from './components/History';

import styles from './Home.module.scss';
import useCreateSearch from './model';

const Home = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ISearchGpt>({
    mode: 'onSubmit',
  });

  const { mutate: createRequestGpt, isPending } = useCreateSearch(getValues);

  const handleSearch = async (data: ISearchGpt) => {
    createRequestGpt(data);
  };

  return (
    <div className={styles.home}>
      <form onSubmit={handleSubmit(handleSearch)} className={styles.search}>
        <div className={styles.header}>
          <Title title=" Поиск кандидатов" level={2} className={styles.title} />
        </div>
        <div className={styles.content}>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Укажите описание' }}
            render={({ field }) => (
              <Input.TextArea
                size="large"
                placeholder="Опишите требования к кандидату..."
                className={`
                           ${styles.textarea} 
                           ${errors.description && styles.error}`}
                autoSize={{ minRows: 1, maxRows: 10 }}
                status={errors.description && 'error'}
                {...field}
              />
            )}
          />
          <Button
            type="primary"
            size="large"
            className={styles.button}
            htmlType="submit"
            loading={isPending}
            icon={<Search size={18} />}
          >
            Найти
          </Button>
        </div>
      </form>
      <History setValue={setValue} />
    </div>
  );
};

export default Home;
