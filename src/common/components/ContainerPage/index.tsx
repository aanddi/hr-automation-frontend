import { ReactNode } from 'react';

import styles from './ContainerPage.module.scss';

interface IConteinerProps {
  children: ReactNode;
  className?: string;
}

const ContainerPage = ({ children, className }: IConteinerProps) => {
  return <div className={`${styles.containet} ${className}`}>{children}</div>;
};

export default ContainerPage;
