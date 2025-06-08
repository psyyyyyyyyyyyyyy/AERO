import Header from "../components/header/Header";
import WishlistTabs from "../components/wishlist/WishlistTabs";
import WishlistCard from "../components/wishlist/WishlistCard";
import styles from "./wishlistPage.module.css";
import img1 from "../assets/images/관광지1.png";
import img2 from "../assets/images/관광지2.png";

export default function WishlistPage() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>관심 여행지 💙</h2>
        <WishlistTabs />
        <div className={styles.cardGrid}>
          <WishlistCard
            image={img1}
            title="경주 여행 다 모아둠"
            subtitle="경북 경주시"
          />
          <WishlistCard
            image={img2}
            title="겨울 필독! 한류 촬영 연화데이트"
            subtitle="인천 송도"
          />
        </div>
      </div>
    </>
  );
}
