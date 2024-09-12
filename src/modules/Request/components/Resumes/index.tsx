import toast from 'react-hot-toast';

import { IResumeRequest } from '@common/api/services/request/types';
import { generateExel } from '@common/utils';

import { Button, Flex } from 'antd';

import { ArrowDownToLine } from 'lucide-react';

import styles from './Resumes.module.scss';
import ResumeTable from './componsnts/Table';

const Resumes = ({ resumes }: { resumes?: IResumeRequest[] }) => {
  const handleDownloadExcel = () => {
    generateExel<IResumeRequest>(resumes, 'Резюме');
    toast.success('Таблица скачена');
  };

  return (
    <div className={styles.resumes}>
      <Flex gap={24} className={styles.actions}>
        <Button
          type="primary"
          onClick={handleDownloadExcel}
          disabled={resumes?.length === 0}
          icon={<ArrowDownToLine size={16} />}
        >
          Скачать Excel
        </Button>
      </Flex>
      <ResumeTable data={resumes} />
    </div>
  );
};

export default Resumes;
