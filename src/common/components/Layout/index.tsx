import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { FloatButton, Layout } from 'antd';

import { ArrowUp } from 'lucide-react';

import Header from './components/components/Header';

import styles from './Layout.module.scss';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <main className={styles.page}>
        <div className="container">{children}</div>
      </main>
      <FloatButton.BackTop icon={<ArrowUp size={22} />} className={styles.floatButton} />
      <Toaster />
    </Layout>
  );
};

export default AppLayout;
