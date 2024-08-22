import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.scss";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <Router />
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
