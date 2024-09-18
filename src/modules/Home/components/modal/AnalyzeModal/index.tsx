import { Controller, useForm } from 'react-hook-form';

import { Title } from '@components';

import { IDataResumes } from '@common/api/services/hh/types';
import { ICreateScoreball } from '@common/api/services/scoreball/type';

import { Alert, Button, Descriptions, Flex, Input, Modal } from 'antd';

import styles from './AnalyzeModal.module.scss';

export interface ICreacteAnalyze {
  title: string;
}

interface IAnalyzeModal {
  open: boolean;
  setOpen: (state: boolean) => void;
  create: (data: ICreateScoreball) => void;
  resumes: IDataResumes;
}

const AnalyzeModal = ({ open, setOpen, create, resumes }: IAnalyzeModal) => {
  const { control, handleSubmit } = useForm<ICreacteAnalyze>();

  const handleCreate = (data: ICreacteAnalyze) => {
    const body = {
      ...resumes,
      title: data.title,
    };
    create(body);
    setOpen(false);
  };

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
            <Descriptions.Item label="Количество резюме">{resumes?.items.length}</Descriptions.Item>
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
          <Alert message="Анализ резюме может занять какое-то время" type="info" showIcon />
        </Flex>
      </form>
    </Modal>
  );
};

export default AnalyzeModal;
