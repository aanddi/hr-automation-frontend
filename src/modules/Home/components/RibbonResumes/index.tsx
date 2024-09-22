// import CandidatesTable from './components/Table';
import { useState } from 'react';

import { useAnalyzeResumes } from '@modules/Home/model';

import { IDataResumes } from '@common/api/services/hh/types';
import { IСandidates } from '@common/api/services/scoreball/type';
import { generateExel } from '@common/utils';
import { formatPrice } from '@common/utils/formatted/Number';

import { Button, Flex } from 'antd';

import { ArrowDownToLine, FileChartColumnIncreasing } from 'lucide-react';

import ResumesTable from './components/Table';

import styles from './RibbonResumes.module.scss';

import AnalyzeModal from '../modal/AnalyzeModal';

interface IRibbon {
  data: IDataResumes;
  loading: boolean;
}

const RibbonResumes = ({ data, loading }: IRibbon) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: createAnalyze, isPending } = useAnalyzeResumes();

  const candidates: IСandidates[] = data?.items.map((candidate, index) => ({
    id: index + 1,
    age: candidate.age,
    salary: candidate?.salary
      ? `${formatPrice(candidate?.salary?.amount)} ${candidate?.salary?.currency}`
      : '-',
    profession: candidate.title,
    experience: candidate.total_experience?.months,
    linkResume: candidate.alternate_url,
  }));

  const handleAnalyzeResumes = () => {
    setOpenModal(true);
  };

  const handleDownloadExcel = () => {
    generateExel<IСandidates>(candidates, 'Кандидаты');
  };

  return (
    <div className={styles.ribbon}>
      <Flex gap={24} className={styles.actions}>
        <Button
          type="primary"
          onClick={handleAnalyzeResumes}
          loading={isPending}
          icon={<FileChartColumnIncreasing size={15} />}
          disabled={data?.items.length === 0 || !data?.items || loading}
        >
          Проанализировать эту страницу
        </Button>
        <Button
          type="primary"
          ghost
          onClick={handleDownloadExcel}
          disabled={data?.items.length === 0 || !data?.items || loading}
          icon={<ArrowDownToLine size={16} />}
        >
          Скачать Excel
        </Button>
      </Flex>
      <ResumesTable data={candidates} totalPages={data?.pages} perPage={data?.per_page} loading={loading} />
      <AnalyzeModal open={openModal} setOpen={setOpenModal} create={createAnalyze} resumes={data} />
    </div>
  );
};

export default RibbonResumes;
