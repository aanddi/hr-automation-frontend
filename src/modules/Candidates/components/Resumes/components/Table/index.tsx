import { IСandidates } from "@common/api/services/scoreball/type";
import { Empty, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface CandidatesTableProps {
   data: IСandidates[];
}

const CandidatesTable = ({ data }: CandidatesTableProps) => {
   const columns: ColumnsType<IСandidates> = [
      {
         title: "#",
         dataIndex: "id",
         key: "id",
         align: "center",
      },
      {
         title: "ФИО",
         dataIndex: "fullname",
         key: "fullname",
         align: "center",
         width: '270px',
      },
      {
         title: "Возраст",
         dataIndex: "age",
         key: "age",
         align: "center",
         sorter: (a: IСandidates, b: IСandidates) => a.age - b.age,
         render: (age: number) => (age ? age : "-"),
      },
      {
         title: "Должность",
         dataIndex: "profession",
         key: "profession",
         align: "center",
         width: "400px",
      },
      {
         title: "Опыт работы (месяц)",
         dataIndex: "experience",
         key: "experience",
         align: "center",
         width: '220px',
         sorter: (a: IСandidates, b: IСandidates) =>
            a.experience - b.experience,
         render: (experience: number) => (experience ? experience : "-"),
      },
      {
         title: "Резюме",
         dataIndex: "linkResume",
         key: "linkResume",
         align: "center",
         render: (link: string) => <Link to={link}>Ссылка</Link>,
      },
   ];

   return (
      <Table
         dataSource={data}
         pagination={false}
         columns={columns}
         locale={{
            emptyText: (
               <Empty description="Резюме не найдены">
                  Переформулируйте запрос или повторите поиск
               </Empty>
            ),
         }}
      />
   );
};

export default CandidatesTable;
