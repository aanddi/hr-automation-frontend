import { IResumeRequest } from '@common/api/services/request/types';
import { Download } from '@common/icons';
import { generateExel } from '@common/utils';

import { Button, Flex } from 'antd';

import styles from './Resumes.module.scss';
import ResumeTable from './componsnts/Table';

interface IResumes {
  resumes: IResumeRequest[];
  idRequest?: number;
}

const Resumes = ({ resumes, idRequest }: IResumes) => {
  const handleDownloadExcel = () => {
    generateExel<IResumeRequest>(resumes, `Запрос № ${idRequest}. Резюме`);
  };

  return (
    <div className={styles.resumes}>
      <Flex gap={24} className={styles.actions}>
        <Button
          type="primary"
          onClick={handleDownloadExcel}
          disabled={resumes?.length === 0}
          icon={<Download size={16} />}
        >
          Скачать Excel
        </Button>
      </Flex>
      <ResumeTable data={resumes} />
    </div>
  );
};

export default Resumes;
