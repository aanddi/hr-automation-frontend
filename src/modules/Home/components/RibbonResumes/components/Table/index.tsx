import { useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { SkeletonTable } from '@components';
import { SkeletonTableColumnsType } from '@components/Skeletons/Table';

import { IСandidates } from '@common/api/services/scoreball/type';

import { Empty, Flex, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface ITable {
  data: IСandidates[];
  totalPages: number;
  loading: boolean;
}

const ResumesTable = ({ data, loading, totalPages }: ITable) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const currentPage = parseInt(params.get('page') || '1', 10);

  const handlePageChange = (page: number) => {
    params.set('page', page.toString());

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
    queryClient.refetchQueries({ queryKey: ['GET-RESUMES'] });
  };

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
      title: 'Опыт работы (месяц)',
      dataIndex: 'experience',
      key: 'experience',
      align: 'center',
      width: '220px',
      sorter: (a: IСandidates, b: IСandidates) => a.experience - b.experience,
      render: (experience: number) => (experience ? experience : '-'),
    },
    {
      title: 'Резюме',
      dataIndex: 'linkResume',
      key: 'linkResume',
      align: 'center',
      render: (link: string) => <Link to={link}>Ссылка</Link>,
    },
  ];

  return (
    <SkeletonTable
      loading={loading}
      rowCount={8}
      columns={columns as SkeletonTableColumnsType[]}
      active
    >
      <Flex vertical gap={32}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          locale={{
            emptyText: <Empty description="Резюме не найдены" />,
          }}
        />
        <Pagination
          defaultCurrent={currentPage}
          total={totalPages}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </Flex>
    </SkeletonTable>
  );
};

export default ResumesTable;
