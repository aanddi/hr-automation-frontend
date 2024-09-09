import { Button, Input, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import useCreateSearch from "./model";
import styles from "./Home.module.scss";
import { ISearchGpt } from "@/common/api/services/search/types";

const Home = () => {
   const { control, handleSubmit } = useForm<ISearchGpt>();

   const { mutate: createRequestGpt, isPending, error } = useCreateSearch();

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
         <div className={styles.footer}>
            {isPending && <Spin />}
            {error && (
               <Typography.Text type="danger">
                  Ошибка при создании запроса
               </Typography.Text>
            )}
         </div>
      </div>
   );
};

export default Home;
