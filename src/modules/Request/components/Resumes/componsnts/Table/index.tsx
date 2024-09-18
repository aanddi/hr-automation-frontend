import { Link } from 'react-router-dom';

import { IResumeRequest } from '@common/api/services/request/types';

import { Empty, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface CandidatesTableProps {
  data?: IResumeRequest[];
}

interface IResumesTable {
  idRequest: number;
  age: number;
  title: string;
  linkResume: string;
  totalExperience: number;
  scoreball: number;
}

const ResumeTable = ({ data }: CandidatesTableProps) => {
  const dataColumns: IResumesTable[] =
    data?.map((elem, index) => {
      return {
        idRequest: index + 1,
        age: elem.age,
        title: elem.title,
        totalExperience: elem.totalExperience,
        linkResume: elem.urlResume,
        scoreball: elem.scoreball,
      };
    }) || [];

  const columns: ColumnsType<IResumesTable> = [
    {
      title: '#',
      dataIndex: 'idRequest',
      key: 'idRequest',
      align: 'center',
    },
    {
      title: 'Должность',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: '300px',
    },
    {
      title: 'Резюме',
      dataIndex: 'linkResume',
      key: 'linkResume',
      align: 'center',
      render: (linkResume: string) => <Link to={linkResume}>Ссылка</Link>,
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      sorter: (a: IResumesTable, b: IResumesTable) => a.age - b.age,
      render: (age: number) => (age ? age : '-'),
    },

    {
      title: 'Опыт работы (месяц)',
      dataIndex: 'totalExperience',
      key: 'totalExperience',
      align: 'center',
      sorter: (a: IResumesTable, b: IResumesTable) => a.totalExperience - b.totalExperience,
      render: (experience: number) => (experience ? experience : '-'),
    },

    {
      title: 'Скорбалл',
      dataIndex: 'scoreball',
      key: 'scoreball',
      align: 'center',
      render: (scrollball: number) => <Tag color="geekblue">{scrollball}</Tag>,
      sorter: (a: IResumesTable, b: IResumesTable) => a.scoreball - b.scoreball,
    },
  ];

  return (
    <Table
      dataSource={dataColumns}
      pagination={false}
      columns={columns}
      locale={{
        emptyText: <Empty description="Резюме не найдены" />,
      }}
    />
  );
};

export default ResumeTable;
