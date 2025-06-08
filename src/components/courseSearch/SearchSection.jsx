import Header from "../header/Header";
import SearchBar from "./SearchBar";
import styles from "./searchsection.module.css";

export default function SearchSection() {
  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
    </div>
  );
}
