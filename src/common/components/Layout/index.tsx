import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/Logo.png';

import { Button, FloatButton, Image, Layout } from 'antd';

import { ArrowUp } from 'lucide-react';

import styles from './Layout.module.scss';

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
              <Button type="link" href="/requests" className={styles.navElem}>
                Мои запросы
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className="container">{children}</div>
      </main>
      <FloatButton.BackTop icon={<ArrowUp size={22}/>} className={styles.floatButton} />
    </Layout>
  );
};

export default AppLayout;
