import { useState } from 'react';

import { useAnalyzeResumes } from '@modules/Home/api';
import AnalyzeModal from '@modules/Home/components/modal/AnalyzeModal';

import { IDataResumes } from '@common/api/services/hh/types';
import { IСandidates } from '@common/api/services/scoreball/type';
import { Download, FileSync } from '@common/icons';
import { generateExel } from '@common/utils';

import { Button, Flex } from 'antd';

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
          icon={<FileSync />}
          disabled={data?.items?.length === 0 || !data?.items || loading}
        >
          Проанализировать эту страницу
        </Button>
        <Button
          type="primary"
          ghost
          onClick={handleDownloadExcel}
          disabled={data?.items?.length === 0 || !data?.items || loading}
          icon={<Download size={16} />}
        >
          Скачать Excel
        </Button>
      </Flex>
      <AnalyzeModal open={openModal} setOpen={setOpenModal} create={createAnalyze} resumes={data} />
    </>
  );
};

export default Actions;
