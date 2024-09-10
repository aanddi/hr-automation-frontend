import { Button, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import useCreateSearch from "./model";
import styles from "./Home.module.scss";
import { ISearchGpt } from "@/common/api/services/search/types";

import History from "./components/History";

const Home = () => {
   const {
      control,
      handleSubmit,
      getValues,
      setValue,
      formState: { errors },
   } = useForm<ISearchGpt>({
      mode: "onSubmit",
   });

   const {
      mutate: createRequestGpt,
      isPending,
      error: errorServer,
   } = useCreateSearch(getValues);

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
                  rules={{ required: "Укажите описание" }}
                  render={({ field }) => (
                     <Input.TextArea
                        size="large"
                        placeholder="Опишите требования к кандидату..."
                        className={`
                           ${styles.textarea} 
                           ${errors.description && styles.error}`}
                        autoSize={{ minRows: 1, maxRows: 10 }}
                        status={errors.description && "error"}
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
            <div className={styles.errors}>
               {errors && (
                  <div className={styles.error}>
                     <Typography.Text type="danger">
                        {errors.description?.message}
                     </Typography.Text>
                  </div>
               )}
               {errorServer && (
                  <div className={styles.error}>
                     <Typography.Text type="danger">
                        {errorServer.response?.data?.message}
                     </Typography.Text>
                  </div>
               )}
            </div>
         </form>
         <History setValue={setValue} />
      </div>
   );
};

export default Home;
