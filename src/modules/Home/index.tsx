import { useState } from "react";
import { Avatar, Button, Input, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import useCreateSearch from "./model";
import { IResponseSearchGpt, ISearchGpt } from "@api/search/types";
import styles from "./Home.module.scss";

import { Link } from "react-router-dom";

const Home = () => {
   const { control, handleSubmit } = useForm<ISearchGpt>();

   const [state, setState] = useState<IResponseSearchGpt | null>(null);

   const { mutate: createRequestGpt, isPending } = useCreateSearch(setState);

   const handleSearch = async (data: ISearchGpt) => {
      createRequestGpt(data);
   };

   return (
      <div className={styles.home}>
         <form onSubmit={handleSubmit(handleSearch)} className={styles.search}>
            <div className={styles.header}>
               <Typography.Title level={2} className={styles.title}>
                  Поиск кандидатов
               </Typography.Title>
            </div>
            <div className={styles.content}>
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <Input.TextArea
                        size="large"
                        placeholder="Опишите требования к кандидату..."
                        className={styles.textarea}
                        autoSize={{ minRows: 1, maxRows: 10 }}
                        {...field}
                     />
                  )}
               />
               <Button
                  type="primary"
                  size="large"
                  className={styles.button}
                  htmlType="submit"
                  loading={isPending}
               >
                  Найти
               </Button>
            </div>
         </form>
         <Typography.Paragraph className={styles.resultTets}>
            {isPending ? (
               <Spin />
            ) : state ? (
               <div className={styles.response}>
                  <h3>Ответ:</h3>
                  <div className={styles.urlResopnse}>
                     Сгенерированная gpt ссылка: "{state?.urlHHruApi}"
                  </div>
                  <Typography.Title level={4}>Резюме:</Typography.Title>
                  <div className={styles.ribbon}>
                     {state?.listCandidates?.items?.map((resume) => {
                        return (
                           <div className={styles.cardResume}>
                              <div className={styles.wrapper}>
                                 <div className={styles.header}>
                                    <Avatar
                                       src={resume?.photo?.medium}
                                       size={100}
                                    >
                                       Фото
                                    </Avatar>
                                    <div className={styles.title}>
                                       {resume?.title}
                                    </div>
                                 </div>
                                 <div className={styles.body}>
                                    <div className={styles.item}>
                                       <span>Возраст:</span> {resume?.age}
                                    </div>
                                    <div className={styles.item}>
                                       <span>Пол:</span> {resume?.gender?.name}
                                    </div>
                                    <div className={styles.item}>
                                       <span>Зарплата:</span>
                                       {resume?.salary?.amount}{" "}
                                       {resume?.salary?.currency}
                                    </div>
                                    <div className={styles.item}>
                                       <span>Опыт работы:</span>
                                       {resume?.total_experience?.months}{" "}
                                       месяцев
                                    </div>
                                    <div className={styles.item}>
                                       <span>Образование:</span>
                                       {resume?.education?.level?.name}
                                    </div>
                                 </div>
                                 <div className={styles.footer}>
                                    <Link to={resume.url}>
                                       Посмотреть полное резюме
                                    </Link>
                                    <div className={styles.dowland}>
                                       <Link
                                          to={resume.actions.download.pdf.url}
                                       >
                                          Скачать PDF
                                       </Link>
                                       <Link
                                          to={resume.actions.download.rtf.url}
                                       >
                                          Скачать RTF
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            ) : null}
         </Typography.Paragraph>
      </div>
   );
};

export default Home;
