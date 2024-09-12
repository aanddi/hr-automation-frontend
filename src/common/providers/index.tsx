import { PropsWithChildren } from 'react';

import QueryClientProvider from './QueryClient';
import ReduxProvider from './Redux';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
