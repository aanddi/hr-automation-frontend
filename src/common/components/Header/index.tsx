import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "@assets/Logo.png";
import { Image } from "antd";

const Header = () => {
   return (
      <header className={styles.header}>
         <div className="container">
            <div className={styles.content}>
               <Image src={Logo} preview={false} />
               <nav>
                  <Link className={styles.navElem} to={"/candidates"}>
                     Таблица список найденных кандидатов 
                  </Link>
               </nav>
            </div>
         </div>
      </header>
   );
};

export default Header;
