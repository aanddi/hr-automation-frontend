import { Link } from 'react-router-dom';

import { IResumeRequest } from '@common/api/services/request/types';
import { formatExperience } from '@common/utils';
import setFio from '@common/utils/formatted/setFio';

import { Empty, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface CandidatesTableProps {
  data?: IResumeRequest[];
}

interface IResumesTable {
  idRequest: number;
  fullname: string;
  age: number;
  title: string;
  linkResume: string;
  totalExperience: string;
  scoreball: number;
  comment: string;
}

const ResumeTable = ({ data }: CandidatesTableProps) => {
  const dataColumns: IResumesTable[] =
    data?.map((elem, index) => {
      return {
        idRequest: index + 1,
        fullname: setFio(elem.firstName, elem.lastName, elem.middleName),
        age: elem.age,
        title: elem.title,
        totalExperience: formatExperience(elem.totalExperience),
        linkResume: elem.urlResume,
        scoreball: elem.scoreball,
        comment: elem.comment,
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
      title: 'ФИО',
      dataIndex: 'fullname',
      key: 'fullname',
      align: 'center',
      width: '150px',
    },
    {
      title: 'Должность',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: '200px',
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
      title: 'Опыт работы',
      dataIndex: 'totalExperience',
      key: 'totalExperience',
      align: 'center',
      width: '200px',
    },

    {
      title: 'Скорбалл',
      dataIndex: 'scoreball',
      key: 'scoreball',
      align: 'center',
      render: (scrollball: number) => <Tag color="geekblue">{scrollball}</Tag>,
      sorter: (a: IResumesTable, b: IResumesTable) => a.scoreball - b.scoreball,
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
      align: 'center',
      width: '300px',
    },
  ];

  return (
    <Table
      dataSource={dataColumns}
      pagination={false}
      columns={columns}
      bordered
      footer={() => <div>Всего {dataColumns.length} резюме</div>}
      locale={{
        emptyText: <Empty description="Резюме не найдены" />,
      }}
    />
  );
};

export default ResumeTable;
