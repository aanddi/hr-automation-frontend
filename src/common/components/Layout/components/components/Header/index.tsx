import { Link } from 'react-router-dom';

import LogoIcon from '@assets/logo-icon.svg';

import { Button, Flex, Image } from 'antd';

import styles from './Header.module.scss';

const Header = () => {
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
              <Button type="link" href="/requests" className={styles.navElem}>
                Мои запросы
              </Button>
            </nav>
          </Flex>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
