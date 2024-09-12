import { Controller, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';

import { Title } from '@components';

import { useAppDispatch, useAuth } from '@common/hooks';

import { login } from '@store/slices/user.slice';

import { Button, Input } from 'antd';

import styles from './Auth.module.scss';

interface IAuth {
  login: string;
  password: string;
}

const Auth = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAuth>();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const auth = useAuth();

  if (auth && location.pathname == '/auth') {
    return <Navigate to="/" state={location} replace />;
  }

  const handleLogin = (data: IAuth) => {
    dispatch(login(data));
  };

  return (
    <div className={styles.auth}>
      <Title title="Авторизация" />
      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
        <Controller
          control={control}
          name="login"
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Логин" size="large" {...field} />}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => <Input.Password placeholder="Пароль" size="large" {...field} />}
        />
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          disabled={!isValid}
          className={styles.submit}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Auth;
