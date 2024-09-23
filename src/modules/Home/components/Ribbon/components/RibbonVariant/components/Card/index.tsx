import { CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Skeleton, Title } from '@components';

import { IDataResumes } from '@common/api/services/hh/types';
import { formatDate, formatExperience } from '@common/utils';
import { formatPrice } from '@common/utils/formatted/Number';

import { Avatar, Flex, Tag } from 'antd';

import { User } from 'lucide-react';

import styles from './Card.module.scss';

interface ICard {
  data: IDataResumes;
  loading: boolean;
}

const Card = ({ data, loading }: ICard) => {
  return (
    <div className={styles.cards}>
      {loading && (
        <Flex vertical gap={16}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton height="200px" key={index} />
          ))}
        </Flex>
      )}
      {data?.items?.map((candidate) => {
        return (
          <div key={candidate.id} className={styles.card}>
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <div className={styles.avatar}>
                  <Avatar size={120} src={candidate?.photo?.medium}>
                    <User size={50} />
                  </Avatar>
                </div>
                <div className={styles.info}>
                  <Link to={candidate.alternate_url} target="_blank">
                    <Title level={4} title={candidate?.title} className={styles.title} />
                  </Link>
                  <Flex gap={18}>
                    {candidate?.age && <span>Возраст: {candidate?.age}</span>}
                    <div className={styles.update}>
                      <span>Обновленно:</span>
                      <span>{formatDate(candidate.updated_at, 'DD.MM.YYYY')}</span>
                    </div>
                  </Flex>
                  <div className={styles.experience}>
                    Опыт работы: {formatExperience(candidate?.total_experience?.months)}
                  </div>
                  <div className={styles.salary}>
                    {formatPrice(candidate?.salary?.amount)} {candidate?.salary?.currency}
                  </div>
                </div>
              </div>
              <div className={styles.scoting}>
                {candidate.scoring.idRequest ? (
                  <Link to={`/request/${candidate.scoring.idRequest}`}>
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Скоринг пройден
                    </Tag>
                  </Link>
                ) : (
                  <Tag>Скоринг не пройден</Tag>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
