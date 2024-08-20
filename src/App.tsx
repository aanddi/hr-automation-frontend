import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./page/Home";
import "./styles/global.scss";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Home />
      </QueryClientProvider>
   );
}

export default App;
