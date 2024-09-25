import { IListRequestItem } from '@common/api/services/request/types';
import { formatDate } from '@common/utils';

import { Button, Descriptions, Popconfirm, Tag, Typography } from 'antd';

import { Trash } from 'lucide-react';

import styles from './CardRequest.module.scss';

import { useDeleteRequest } from '../../model';

const CardRequest = ({ item, id }: { item: IListRequestItem; id: number }) => {
  const { mutate: deleteRequest } = useDeleteRequest();

  const handleDeleteRequest = () => {
    deleteRequest(item.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Typography.Title level={4} className={styles.title}>
            {item.title ? `${item.title}` : `Запрос №${id}`}
          </Typography.Title>
          {item.isDeepScoring ? (
            <Tag color="purple">Полный скоринг</Tag>
          ) : (
            <Tag>Поверхностный скоринг</Tag>
          )}
        </div>
        <div className={styles.info}>
          <Descriptions>
            <Descriptions.Item label="Дата создания">
              {formatDate(item.createdAt)}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className={styles.footer}>
          <Button type="primary" href={`/request/${item.id}`}>
            Подробнее
          </Button>
        </div>
        <div className={styles.actions}>
          <Popconfirm
            title="Удалить запрос"
            description="Вы уверены, что хотите удалить этот запрос?"
            okText="Удалить"
            cancelText="Нет"
            onConfirm={handleDeleteRequest}
          >
            <Button className={styles.actionsItem} icon={<Trash size={16} />}></Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default CardRequest;
