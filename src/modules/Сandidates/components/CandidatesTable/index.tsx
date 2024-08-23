import IСandidates from "@/api/candidates/type";
import { Table, Tag } from "antd";
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
      },
      {
         title: "Возраст",
         dataIndex: "age",
         key: "age",
         align: "center",
         sorter: (a: IСandidates, b: IСandidates) => a.age - b.age,
      },
      {
         title: "Должность",
         dataIndex: "profession",
         key: "profession",
         align: "center",
      },
      {
         title: "Резюме",
         dataIndex: "linkResume",
         key: "linkResume",
         align: "center",
         render: (link: string) => <Link to={link}>Ссылка</Link>,
      },
      {
         title: "Скорбалл",
         dataIndex: "scorball",
         key: "scorball",
         align: "center",
         render: (scrollball: number) => <Tag color="red">{scrollball}</Tag>,
         sorter: (a: IСandidates, b: IСandidates) => a.scorball - b.scorball,
         defaultSortOrder: "descend",
      },
   ];

   return <Table dataSource={data} columns={columns} />;
};

export default CandidatesTable;
