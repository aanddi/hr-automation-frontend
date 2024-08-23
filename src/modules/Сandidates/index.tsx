import { Breadcrumb, Button, Typography } from "antd";
import styles from "./Сandidates.module.scss";
import mockData from "./mock";
import IСandidates from "@api/candidates/type";
import CandidatesTable from "./components/CandidatesTable";
import { itemsBreadcrumb } from "./constans";
import { utils as XlsxUtils, writeFile as XlsxWriteFile } from "xlsx";

const Сandidates = () => {
   const candidates: IСandidates[] = mockData?.map((candidate, index) => ({
      id: index + 1,
      fullname: candidate.fullname,
      age: candidate.age,
      profession: candidate.profession,
      linkResume: candidate.linkResume,
      scorball: candidate.scorball,
   }));

   const handleDownloadExcel = () => {
      const data = XlsxUtils.json_to_sheet(candidates);
      const bookExcel = XlsxUtils.book_new();
      XlsxUtils.book_append_sheet(bookExcel, data, "Кандидаты");
      XlsxWriteFile(bookExcel, "candidates.xlsx");
   };

   return (
      <div className={styles.candidates}>
         <div className={styles.header}>
            <Breadcrumb items={itemsBreadcrumb} />
            <Typography.Title level={2} className={styles.title}>
               Результат поиска
            </Typography.Title>
         </div>
         <div className={styles.actions}>
            <Button type="primary" onClick={handleDownloadExcel}>
               Скачать Excel
            </Button>
         </div>
         <CandidatesTable data={candidates} />
      </div>
   );
};

export default Сandidates;
