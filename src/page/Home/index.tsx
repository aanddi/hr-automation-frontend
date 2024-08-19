import React from "react";
import { Button, Input, Typography } from "antd";
import styles from "./Home.module.scss";
import { Search } from "lucide-react";

const Home = () => {
   return (
      <div className={styles.home}>
         <Typography.Title className={styles.title}>
            HR-Автоматизация
         </Typography.Title>
         <div className={styles.container}>
            <div className={styles.search}>
               <Input
                  size="large"
                  placeholder="Поиск кандидатов"
                  prefix={<Search color="#c5c5c5" size={20}/>}
                  className={styles.input}
               />
               <Button type="primary" size="large" className={styles.button}>
                  Найти
               </Button>
            </div>
         </div>
      </div>
   );
};

export default Home;
