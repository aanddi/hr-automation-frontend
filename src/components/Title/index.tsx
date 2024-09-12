import { Typography } from 'antd';

import styles from './Title.module.scss';

interface ITitle {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

const Title = ({ title, level = 2, className, ...restProps }: ITitle) => {
  return (
    <Typography.Title level={level} className={`${styles.title} ${className}`} {...restProps}>
      {title}
    </Typography.Title>
  );
};

export default Title;
