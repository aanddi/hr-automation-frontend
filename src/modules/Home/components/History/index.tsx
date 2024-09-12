import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { ISearchGpt } from '@common/api/services/search/types';
import { useAppDispatch, useAppSelector } from '@common/hooks';

import { deleteAllHistory, deleteHistoryById } from '@store/slices/historys.slice';

import { Button, Popconfirm, Typography } from 'antd';

import { X as Close, History as HistoryIcon } from 'lucide-react';

import styles from './History.module.scss';

interface IHistoryProps {
  setValue: UseFormSetValue<ISearchGpt>;
}

const History = React.memo(({ setValue }: IHistoryProps) => {
  const { historys } = useAppSelector((state) => state.historys);
  const dispatch = useAppDispatch();

  const handleSetHistory = (history: string) => {
    setValue('description', history);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllHistory());
  };

  const handleDeleteById = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(deleteHistoryById({ id }));
  };

  return (
    <div className={styles.history}>
      {historys.length > 0 && (
        <div className={styles.header}>
          <Typography.Title level={4} className={styles.title}>
            История запросов
          </Typography.Title>
          <Popconfirm
            title="Удалить историю запросов"
            description="Вы уверены, что хотите удалить всю историю запросов?"
            okText="Удалить"
            cancelText="Нет"
            onConfirm={handleDeleteAll}
            placement="bottom"
          >
            <Button size="middle" danger>
              Удалить историю
            </Button>
          </Popconfirm>
        </div>
      )}
      {historys.map((item) => {
        return (
          <div
            className={styles.card}
            key={item.id}
            onClick={() => handleSetHistory(item.description)}
          >
            <div className={styles.text}>
              <div className={styles.textIcon}>
                <HistoryIcon size={17} />
              </div>
              {item.description}
            </div>
            <Button
              size="small"
              icon={<Close size={17} className={styles.closeIcon} />}
              onClick={(e) => handleDeleteById(e, item.id)}
              className={styles.closeBtn}
            />
          </div>
        );
      })}
    </div>
  );
});

export default History;
