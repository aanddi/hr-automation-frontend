import { Link } from 'react-router-dom';

import { SkeletonTable } from '@components';
import { SkeletonTableColumnsType } from '@components/Skeletons/Table';

import { IСandidates } from '@common/api/services/scoreball/type';

import { Empty, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface ITable {
  data: IСandidates[];
  loading: boolean;
}

const ResumesTable = ({ data, loading }: ITable) => {
  const columns: ColumnsType<IСandidates> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Должность',
      dataIndex: 'profession',
      key: 'profession',
      align: 'center',
      width: '400px',
    },

    {
      title: 'Заработная плата',
      dataIndex: 'salary',
      key: 'salary',
      align: 'center',
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      sorter: (a: IСandidates, b: IСandidates) => a.age - b.age,
      render: (age: number) => (age ? age : '-'),
    },

    {
      title: 'Опыт работы',
      dataIndex: 'experience',
      key: 'experience',
      align: 'center',
      width: '220px',
    },
    {
      title: 'Резюме',
      dataIndex: 'linkResume',
      key: 'linkResume',
      align: 'center',
      render: (link: string) => (
        <Link target="_blank" to={link}>
          Ссылка
        </Link>
      ),
    },
  ];

  return (
    <SkeletonTable
      loading={loading}
      rowCount={8}
      columns={columns as SkeletonTableColumnsType[]}
      active
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: <Empty description="Резюме не найдены" />,
        }}
      />
    </SkeletonTable>
  );
};

export default ResumesTable;
