import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import toast from 'react-hot-toast';

import { notification } from 'antd';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },

  queryCache: new QueryCache({
    onError: (error: any) => {
      const axiosError = error?.response?.data;
      notification.error({
        message: `Ошибка ${axiosError?.status ?? error.name}`,
        description: axiosError?.message ?? error.message,
        duration: 6,
        showProgress: true,
        pauseOnHover: true,
      });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error: any) => {
      toast.remove();
      const axiosError = error?.response?.data;
      notification.error({
        message: `Ошибка ${axiosError?.status ?? error.name}`,
        description: axiosError?.message ?? error.message,
        duration: 6,
        showProgress: true,
        pauseOnHover: true,
      });
    },
  }),
});

const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
};

export default TanstackQueryProvider;
