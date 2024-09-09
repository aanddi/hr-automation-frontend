import { Breadcrumb, Button, Typography } from "antd";
import styles from "./Сandidates.module.scss";
import IСandidates from "@common/api/services/scoreball/type";
import CandidatesTable from "./components/CandidatesTable";
import { itemsBreadcrumb } from "./constans";

import { useAppSelector } from "@/common/hooks";
import useAnalyzeResumes from "./model";
import { generateExel } from "@/common/utils";

const Candidates = () => {
   const { resumes } = useAppSelector((state) => state.resumes);
   const { mutate: createAnalyze, isPending } = useAnalyzeResumes();

   const candidates: IСandidates[] = resumes?.map((candidate, index) => ({
      id: index + 1,
      fullname:
         candidate?.first_name && candidate?.last_name
            ? `${candidate?.last_name} ${candidate?.first_name}`
            : "Не указано",
      age: candidate.age,
      profession: candidate.title,
      experience: candidate.total_experience.months,
      linkResume: candidate.url,
   }));

   const handleAnalyzeResumes = () => {
      createAnalyze(resumes);
   };

   const handleDownloadExcel = () => {
      generateExel<IСandidates>(candidates);
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
            <Button
               type="primary"
               onClick={handleAnalyzeResumes}
               loading={isPending}
               disabled={resumes.length === 0}
            >
               Проанализировать и сохранить
            </Button>
            <Button
               type="primary"
               ghost
               onClick={handleDownloadExcel}
               disabled={resumes.length === 0}
            >
               Скачать Excel
            </Button>
         </div>
         <CandidatesTable data={candidates} />
      </div>
   );
};

export default Candidates;
