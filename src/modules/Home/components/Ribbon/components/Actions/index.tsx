import { useState } from 'react';

import AnalyzeModal from '@modules/Home/components/modal/AnalyzeModal';
import { useAnalyzeResumes } from '@modules/Home/model';

import { IDataResumes } from '@common/api/services/hh/types';
import { IСandidates } from '@common/api/services/scoreball/type';
import { generateExel } from '@common/utils';

import { Button, Flex } from 'antd';

import { ArrowDownToLine, FileChartColumnIncreasing } from 'lucide-react';

interface IActions {
  data: IDataResumes;
  candidates: IСandidates[];
  loading: boolean;
}

const Actions = ({ data, candidates, loading }: IActions) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: createAnalyze, isPending } = useAnalyzeResumes();

  const handleAnalyzeResumes = () => {
    setOpenModal(true);
  };

  const handleDownloadExcel = () => {
    generateExel<IСandidates>(candidates, 'Кандидаты');
  };

  return (
    <>
      <Flex gap={24}>
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
      <AnalyzeModal open={openModal} setOpen={setOpenModal} create={createAnalyze} resumes={data} />
    </>
  );
};

export default Actions;
