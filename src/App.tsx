import "./styles/global.scss";
import Router from "./routes";
import { AppLayout } from "./common/components";

function App() {
   return (
      <AppLayout>
         <Router />
      </AppLayout>
   );
}

export default App;
