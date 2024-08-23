import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
   return (
      <header className={styles.header}>
         <div className="container">
            <div className={styles.content}>
               <img src="src\assets\Logo.png" />
               <nav>
                  <Link className={styles.navElem} to={"/ccandidates"}>Таблица</Link>
               </nav>
            </div>
         </div>
      </header>
   );
};

export default Header;
