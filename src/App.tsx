import { Toaster } from 'react-hot-toast';

import { AppLayout } from './common/components';
import Router from './routes';
import './styles/global.scss';

function App() {
  return (
    <AppLayout>
      <Router />
      <Toaster />
    </AppLayout>
  );
}

export default App;
