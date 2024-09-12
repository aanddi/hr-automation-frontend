import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAuth } from '@common/hooks';

import { logout } from '@store/slices/user.slice';

import Logo from '@assets/Logo.png';

import { Button, FloatButton, Image, Layout } from 'antd';

import { ArrowUp, LogOut } from 'lucide-react';

import styles from './Layout.module.scss';

const AppLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const auth = useAuth();

  return (
    <Layout className={styles.layout}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.content}>
            <Link to="/">
              <Image src={Logo} preview={false} />
            </Link>
            <nav className={styles.menu}>
              <Button type="link" href="/requests" className={styles.navElem}>
                Мои запросы
              </Button>
              {auth && (
                <Button
                  type="default"
                  icon={<LogOut size={15} />}
                  onClick={() => dispatch(logout())}
                  className={styles.logout}
                >
                  Выйти
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className="container">{children}</div>
      </main>
      <FloatButton.BackTop icon={<ArrowUp size={22} />} className={styles.floatButton} />
      <Toaster />
    </Layout>
  );
};

export default AppLayout;
