import { useState } from "react";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
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
         <form onSubmit={handleSubmit(handleSearch)} className={styles.search}>
            <Controller
               name="prompt"
               control={control}
               render={({ field }) => (
                  <Input.TextArea
                     size="large"
                     placeholder="Поиск кандидатов..."
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
         </form>
      </div>
   );
};

export default Home;
