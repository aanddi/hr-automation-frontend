import { PropsWithChildren } from "react";
import Header from "../Header";

const Layout = ({ children }: PropsWithChildren) => {
   return (
      <>
         <Header />
         <main>
            <div className="container">{children}</div>
         </main>
      </>
   );
};

export default Layout;
