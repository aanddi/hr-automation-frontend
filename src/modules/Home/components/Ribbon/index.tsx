import { Title } from '@components';

import { IDataResumes } from '@common/api/services/hh/types';
import { IСandidates } from '@common/api/services/scoreball/type';
import { formatExperience } from '@common/utils';
import { formatPrice } from '@common/utils/formatted/Number';

import { Skeleton } from 'antd';

import Actions from './components/Actions';
import RibbonVariant from './components/RibbonVariant';

import styles from './Ribbon.module.scss';

interface IRibbon {
  loading: boolean;
  data: IDataResumes;
}

const Ribbon = ({ data, loading }: IRibbon) => {
  const candidates: IСandidates[] = data?.items.map((candidate, index) => ({
    id: index + 1,
    age: candidate.age,
    salary: candidate?.salary
      ? `${formatPrice(candidate?.salary?.amount)} ${candidate?.salary?.currency}`
      : '-',
    profession: candidate.title,
    experience: formatExperience(candidate.total_experience?.months),
    linkResume: candidate.alternate_url,
  }));

  return (
    <div className={styles.content}>
      <div className={styles.titleAndActions}>
        {loading ? (
          <Skeleton.Input active />
        ) : (
          <Title level={4} title={`Найдено ${formatPrice(data?.found)} резюме `} />
        )}
        <Actions data={data} candidates={candidates} loading={loading} />
      </div>
      <RibbonVariant data={data} candidates={candidates} loading={loading} />
    </div>
  );
};

export default Ribbon;
