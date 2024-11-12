import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import theme from '@config/them-antd';

import { ArrowUp } from '@common/icons';

import { ConfigProvider, FloatButton, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import Header from './components/Header';

import styles from './Layout.module.scss';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider theme={theme} locale={ruRU}>
      <Layout className={styles.layout}>
        <Header />
        <main className={styles.page}>{children}</main>
        <FloatButton.BackTop icon={<ArrowUp size={22} />} className={styles.floatButton} />
        <Toaster position="top-right" toastOptions={{ style: { fontSize: ' 14px' } }} />
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
