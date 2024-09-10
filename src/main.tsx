import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
               <Provider store={store}>
                  <App />
               </Provider>
            </PersistGate>
         </BrowserRouter>
      </QueryClientProvider>
   </StrictMode>
);
