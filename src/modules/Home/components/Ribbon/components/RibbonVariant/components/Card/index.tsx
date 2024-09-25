import { CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Skeleton, Title } from '@components';

import { IDataResumes } from '@common/api/services/hh/types';
import { formatCurrency, formatDate, formatExperience } from '@common/utils';
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
                <div className={styles.headerContent}>
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
                      <div>{candidate?.area?.name}</div>
                      <div className={styles.update}>
                        <span>Обновленно:</span>
                        <span>{formatDate(candidate.updated_at, 'DD.MM.YYYY')}</span>
                      </div>
                    </Flex>
                    {candidate?.education?.level?.name && (
                      <div className={styles.experience}>
                        Образование: {candidate?.education?.level?.name}
                      </div>
                    )}

                    <div className={styles.salary}>
                      <span>{formatPrice(candidate?.salary?.amount)}</span>
                      <span>{formatCurrency(candidate?.salary?.currency)}</span>
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
              <div className={styles.body}>
                {candidate?.total_experience?.months && (
                  <div className={styles.item}>
                    <div className={styles.label}>Опыт работы:</div>
                    <div className={styles.desc}>
                      {formatExperience(candidate?.total_experience?.months)}
                    </div>
                  </div>
                )}
                {candidate?.experience[0] && (
                  <div className={styles.item}>
                    <div className={styles.label}>Последнее место работы:</div>
                    <div className={styles.desc}>
                      <div className={styles.company}>{candidate?.experience[0]?.company}</div>
                      <div className={styles.info}>
                        <div>{candidate?.experience[0]?.position}</div>
                        <span className={styles.separator}>•</span>
                        <div className={styles.date}>
                          <span> {formatDate(candidate?.experience[0]?.start, 'MMMM YYYY')}</span>
                          <span> - </span>
                          <span>
                            {candidate?.experience[0]?.end
                              ? formatDate(candidate?.experience[0]?.end, 'MMMM YYYY')
                              : 'по настоящее время'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
