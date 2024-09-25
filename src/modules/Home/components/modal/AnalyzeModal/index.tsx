import { Controller, useForm } from 'react-hook-form';

import { Title } from '@components';

import { IDataResumes } from '@common/api/services/hh/types';
import { ICreateScoreball } from '@common/api/services/scoreball/type';

import { Alert, Button, Descriptions, Flex, Input, Modal, Switch, Tooltip } from 'antd';

import styles from './AnalyzeModal.module.scss';

export interface ICreacteAnalyze {
  title: string;
  isDeepScoring: boolean;
}

interface IAnalyzeModal {
  open: boolean;
  setOpen: (state: boolean) => void;
  create: (data: ICreateScoreball) => void;
  resumes: IDataResumes;
}

const AnalyzeModal = ({ open, setOpen, create, resumes }: IAnalyzeModal) => {
  const { control, handleSubmit, watch, reset } = useForm<ICreacteAnalyze>({
    defaultValues: {
      title: '',
      isDeepScoring: false,
    },
  });

  const handleCreate = (data: ICreacteAnalyze) => {
    const body = {
      ...resumes,
      title: data.title,
      isDeepScoring: data.isDeepScoring,
    };
    create(body);
    setOpen(false);
    reset();
  };

  const isDeepScoring = watch('isDeepScoring');

  return (
    <Modal
      title={<Title level={4} title="Создание скоринга" />}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={
        <>
          <Button type="primary" size="large" onClick={handleSubmit(handleCreate)}>
            Создать и сохранить
          </Button>
          <Button size="large" onClick={() => setOpen(false)}>
            Отменить
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleCreate)} className={styles.form}>
        <Flex vertical gap={16}>
          <Descriptions column={1}>
            <Descriptions.Item label="Количество резюме">
              {resumes?.items.length} (лимит за раз 10)
            </Descriptions.Item>
          </Descriptions>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                size="large"
                placeholder="Описание. Например: Frontend разработчики"
                {...field}
              />
            )}
          />
          <div className={styles.scoring}>
            <Tooltip
              className={styles.popover}
              placement="bottom"
              title="За полный скоринг будет списываться просмотры резюме."
            >
              <div>Полный скоринг</div>
            </Tooltip>
            <Controller
              name="isDeepScoring"
              control={control}
              render={({ field }) => <Switch {...field} />}
            />
          </div>
          {!isDeepScoring ? (
            <Alert
              message="В обычном скоринге не учитываются: описание опыта работы, учебное заведение и специальность, контакты и профессиональная роль"
              type="warning"
              showIcon
            />
          ) : (
            <Alert
              message="Полный скоринг снимает снимает просмотры резюме с баланса!"
              type="warning"
              showIcon
            />
          )}
          <Alert message="Анализ резюме может занять какое-то время" type="info" showIcon />
        </Flex>
      </form>
    </Modal>
  );
};

export default AnalyzeModal;
