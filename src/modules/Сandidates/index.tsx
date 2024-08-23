import { Table } from "antd";
import styles from "./Сandidates.module.scss";

const Сandidates = () => {
   const dataSource = [
      {
         key: "1",
         column1: "Row",
         column2: "Row",
         column3: "Row",
         column4: "Row",
      },
      {
         key: "2",
         column1: "Row",
         column2: "Row",
         column3: "Row",
         column4: "Row",
      },
      {
         key: "3",
         column1: "Row",
         column2: "Row",
         column3: "Row",
         column4: "Row",
      },
   ];

   const columns = [
      {
         title: "Column",
         dataIndex: "column1",
         key: "column1",
      },
      {
         title: "Column",
         dataIndex: "column2",
         key: "column2",
      },
      {
         title: "Column",
         dataIndex: "column3",
         key: "column3",
      },
      {
         title: "Column",
         dataIndex: "column4",
         key: "column4",
      },
   ];

   // const rowSelection = {
   //    onChange: (selectedRowKeys: , selectedRows: ) => {
   //       console.log("selectedRowKeys:", selectedRowKeys);
   //       console.log("selectedRows:", selectedRows);
   //    },
   // };

   return (
      <div className={styles.table}>
         <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            // rowSelection={{
            //    type: "checkbox",
            //    ...rowSelection,
            // }}
         />
      </div>
   );
};

export default Сandidates;
