import { Link } from 'react-router-dom';

import { useAppDispatch, useAuth } from '@common/hooks';

import { logout } from '@store/slices/user.slice';

import LogoIcon from '@assets/logo-icon.svg';

import { Button, Flex, Image } from 'antd';

import { LogOut } from 'lucide-react';

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  return (
    <header className={styles.header}>
      <div className="container">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={32}>
            <Link to="/" className={styles.logo}>
              <Image src={LogoIcon} preview={false} width={42} />
              <p>HR-Автоматизация</p>
            </Link>
            <nav className={styles.menu}>
              {auth && (
                <Button type="link" href="/requests" className={styles.navElem}>
                  Мои запросы
                </Button>
              )}
            </nav>
          </Flex>
          <Flex className={styles.action}>
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
          </Flex>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
