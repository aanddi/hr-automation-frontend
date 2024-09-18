import { Skeleton, SkeletonProps, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export type SkeletonTableColumnsType = {
  key: string;
};

export type SkeletonTableProps = SkeletonProps & {
  columns: ColumnsType<SkeletonTableColumnsType>;
  rowCount?: number;
};

const SkeletonTable = ({
  columns,
  children,
  loading,
  rowCount = 3,
  active = false,
  className,
}: SkeletonTableProps) => {
  return loading ? (
    <Table
      rowKey="key"
      pagination={false}
      dataSource={[...Array(rowCount)].map((_, index) => ({
        key: `key${index}`,
      }))}
      columns={columns.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton
                key={column.key}
                title
                active={active}
                paragraph={false}
                className={className}
              />
            );
          },
        };
      })}
    />
  ) : (
    <>{children}</>
  );
};

export default SkeletonTable;
