import { IInfoRequest } from '@common/api/services/request/types';
import { formatDate } from '@common/utils';

import { Descriptions } from 'antd';

import styles from './AboutRequest.module.scss';

const AboutRequest = ({ data }: { data?: IInfoRequest }) => {
  return (
    <div className={styles.info}>
      <Descriptions column={1} bordered labelStyle={{ width: '250px' }}>
        <Descriptions.Item label="Дата создания">{formatDate(data?.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="Название">{data?.title || '-'}</Descriptions.Item>
       
      </Descriptions>
    </div>
  );
};

export default AboutRequest;
