import { useState } from "react";
import { Button, Input, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import useCreateSearch from "./model";
import { IResponseSearchGpt, ISearchGpt } from "@api/search/types";
import styles from "./Home.module.scss";

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
            ) : (
               <>
                  <b>Ответ:</b> <br />
                  {state?.urlHHruApi}
                  <br />
                  <br />
                  {JSON.stringify(state?.listCandidates)}
               </>
            )}
         </Typography.Paragraph>
      </div>
   );
};

export default Home;
