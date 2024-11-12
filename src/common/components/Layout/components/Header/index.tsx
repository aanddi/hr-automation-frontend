import { Link } from 'react-router-dom';

import { ContainerPage } from '@common/components';

import logo from '@assets/logo-icon.svg';

import { Image } from 'antd';

import styles from './Header.module.scss';
import menu from './constans';

const Header = () => {
  return (
    <header className={styles.header}>
      <ContainerPage>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            <Image src={logo} preview={false} />
            <h3>AI-HR</h3>
          </Link>
          <nav className={styles.menu}>
            {menu.map((item) => {
              return (
                <Link key={item.key} to={item.link} className={styles.link}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </ContainerPage>
    </header>
  );
};

export default Header;
