import useAppSelector from '../useAppSelector';

export const useAuth = () =>
  useAppSelector((state) => {
    return state?.user.user?.isAuthorized;
  });

export default useAuth;
