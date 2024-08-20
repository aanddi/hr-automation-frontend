import { useState } from "react";
import { Button, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import useCreateSearch from "./model";
import ISearchGpt from "../../api/search/types";
import styles from "./Home.module.scss";

const Home = () => {
   const { control, handleSubmit } = useForm<ISearchGpt>();

   const [state, setState] = useState<ISearchGpt | null>(null);

   const { mutate: createRequestGpt, isPending } = useCreateSearch(setState);

   const handleSearch = (data: ISearchGpt) => {
      createRequestGpt(data);
      console.log(state);
   };

   return (
      <div className={styles.home}>
         <Typography.Title className={styles.title}>
            HR-Автоматизация
         </Typography.Title>
         <div className={styles.container}>
            <form
               onSubmit={handleSubmit(handleSearch)}
               className={styles.search}
            >
               <Controller
                  name="prompt"
                  control={control}
                  render={({ field }) => (
                     <Input
                        size="large"
                        placeholder="Поиск кандидатов"
                        prefix={<Search color="#c5c5c5" size={20} />}
                        className={styles.input}
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
            </form>
         </div>
      </div>
   );
};

export default Home;
