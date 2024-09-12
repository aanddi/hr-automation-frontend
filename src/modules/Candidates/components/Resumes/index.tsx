import toast from 'react-hot-toast';

import { IСandidates } from '@common/api/services/scoreball/type';
import { generateExel, setFio } from '@common/utils';

import { IRequestStore } from '@store/slices/request.slice';

import { Button, Flex } from 'antd';

import { ArrowDownToLine } from 'lucide-react';
import { FileChartColumnIncreasing } from 'lucide-react';

import CandidatesTable from './components/Table';

import styles from './Resumes.module.scss';

import useAnalyzeResumes from '../../model';

const Resumes = ({ data }: { data: IRequestStore }) => {
  const { mutate: createAnalyze, isPending } = useAnalyzeResumes();

  const candidates: IСandidates[] = data.resumes.map((candidate, index) => ({
    id: index + 1,
    fullname: setFio(candidate.first_name, candidate.last_name, candidate.middle_name),
    age: candidate.age,
    profession: candidate.title,
    experience: candidate.total_experience?.months,
    linkResume: candidate.url,
  }));

  const handleAnalyzeResumes = () => {
    console.log(data)
    createAnalyze(data);
  };

  const handleDownloadExcel = () => {
    generateExel<IСandidates>(candidates);
    toast.success('Таблица скачена');
  };

  return (
    <div className={styles.resumes}>
      <Flex gap={24} className={styles.actions}>
        <Button
          type="primary"
          onClick={handleAnalyzeResumes}
          loading={isPending}
          icon={<FileChartColumnIncreasing size={15} />}
          disabled={data.resumes.length === 0}
        >
          Проанализировать и сохранить
        </Button>
        <Button
          type="primary"
          ghost
          onClick={handleDownloadExcel}
          disabled={data.resumes.length === 0}
          icon={<ArrowDownToLine size={16} />}
        >
          Скачать Excel
        </Button>
      </Flex>
      <CandidatesTable data={candidates} />
    </div>
  );
};

export default Resumes;
