import { CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Skeleton, Title } from '@components';

import { IDataResumes } from '@common/api/services/hh/types';
import { User } from '@common/icons';
import { formatCurrency, formatDate, formatExperience } from '@common/utils';
import { formatPrice } from '@common/utils/formatted/Number';

import { Avatar, Flex, Tag } from 'antd';

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
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height="200px" className={styles.skeleton} />
          ))}
        </Flex>
      )}
      {data?.items?.map((candidate) => {
        return (
          <div key={candidate.id} className={styles.card}>
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <div className={styles.headerContent}>
                  <Avatar size={120} src={candidate?.photo?.medium} className={styles.userAvatar}>
                    <User className={styles.iconUser} />
                  </Avatar>

                  <div className={styles.info}>
                    <Link to={candidate.alternate_url} target="_blank">
                      <Title level={4} title={candidate?.title} className={styles.title} />
                    </Link>

                    <Flex gap={18}>
                      {candidate?.age && <span>Возраст: {candidate?.age}</span>}
                      <div>{candidate?.area?.name}</div>
                      <div className={styles.update}>
                        <span>Обновленно:</span>
                        <span>{formatDate(candidate.updated_at, 'DD MMMM')}</span>
                      </div>
                    </Flex>

                    <div className={styles.status}>
                      {candidate?.job_search_status?.name === 'Активно ищет работу' ? (
                        <Tag color="green">{candidate?.job_search_status?.name}</Tag>
                      ) : candidate?.job_search_status ? (
                        <Tag color="orange">{candidate?.job_search_status?.name}</Tag>
                      ) : null}
                    </div>

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

              {candidate?.total_experience && candidate?.experience && (
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
                            <span>{formatDate(candidate?.experience[0]?.start, 'MMMM YYYY')}</span>
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
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
