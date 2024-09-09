import { PropsWithChildren } from "react";
import { Button, Image, Layout, FloatButton } from "antd";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import Logo from "@assets/Logo.png";

import styles from "./Layout.module.scss";

const AppLayout = ({ children }: PropsWithChildren) => {
   return (
      <Layout className={styles.layout}>
         <header className={styles.header}>
            <div className="container">
               <div className={styles.content}>
                  <Link to="/">
                     <Image src={Logo} preview={false} />
                  </Link>
                  <nav>
                     <Button type="link" href="/" className={styles.navElem}>
                        Мои запросы
                     </Button>
                  </nav>
               </div>
            </div>
         </header>
         <main>
            <div className="container">{children}</div>
         </main>
         <FloatButton.BackTop icon={<ArrowUp />} />
      </Layout>
   );
};

export default AppLayout;
