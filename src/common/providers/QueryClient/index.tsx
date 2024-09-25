import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { PropsWithChildren } from 'react';
import toast from 'react-hot-toast';

import { notification } from 'antd';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: AxiosError<{ message: string }> | Error) => {
      const desc = `${error.message}`;

      toast.remove();
      if (error instanceof AxiosError) {
        const axiosError = error.response?.data?.message;
        notification.error({
          message: 'Ошибка',
          description: axiosError ?? desc,
          duration: 6,
          showProgress: true,
          pauseOnHover: true,
        });
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error: AxiosError<{ message: string }> | Error) => {
      const desc = `${error.message}`;

      toast.remove();
      if (error instanceof AxiosError) {
        const axiosError = error.response?.data?.message;
        console.log(error);
        console.log(axiosError);
        notification.error({
          message: 'Ошибка',
          description: axiosError ?? desc,
          duration: 6,
          showProgress: true,
          pauseOnHover: true,
        });
      }
    },
  }),
});

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
};

export default QueryClientProvider;
