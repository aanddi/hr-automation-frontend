import { Loading as LoadingIcon } from '@common/icons';

import { Spin } from 'antd';

import styles from './Loading.module.scss';

const Loading = () => {
  return <Spin className={styles.loading} indicator={<LoadingIcon spin />} size="large" />;
};

export default Loading;
