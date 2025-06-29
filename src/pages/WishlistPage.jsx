import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import WishlistTabs from "../components/wishlist/WishlistTabs";
import ModeTabs from "../components/wishlist/ModeTabs";
import WishlistCard from "../components/wishlist/WishlistCard";
import Pagination from "../components/courseSearch/Pagination";
import styles from "./wishlistPage.module.css";
import img1 from "../assets/images/courseDetail/빈 이미지.png";
import {
  fetchUserCourses,
  fetchLikedCourses,
  fetchLikedTourSpots,
} from "../api/WishlistApi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function WishlistPage() {
  const [mode, setMode] = useState("my");
  const [userCourses, setUserCourses] = useState([]);
  const [aiCourses, setAiCourses] = useState([]);
  const [userAiTab, setUserAiTab] = useState("ai");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (mode === "my") {
          const data = await fetchUserCourses(userAiTab, currentPage, size);
          if (userAiTab === "ai") {
            setAiCourses(data.content || []);
            setUserCourses([]);
          } else {
            setUserCourses(data.content || []);
            setAiCourses([]);
          }
          setTotalPages(data.totalPages || 1); // totalPages를 상태로 설정
        } else if (mode === "like") {
          if (userAiTab === "ai") {
            const likedSpots = await fetchLikedTourSpots(currentPage, size);
            setUserCourses(likedSpots.content || []);
            setAiCourses([]);
          } else {
            const likedCourses = await fetchLikedCourses(
              "like",
              currentPage,
              size
            );
            setUserCourses(likedCourses.content || []);
            setAiCourses([]);
            setTotalPages(likedCourses.totalPages || 1); // totalPages를 상태로 설정
          }
        }
      } catch (e) {
        return;
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [mode, userAiTab, currentPage, size]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>나의 보관함 💙</h2>

        <ModeTabs mode={mode} setMode={setMode} />
        <WishlistTabs
          mode={mode}
          userAiTab={userAiTab}
          setUserAiTab={setUserAiTab}
        />

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px 0",
            }}
          >
            <ClipLoader color="#7ED6EA" size={60} />
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {(mode === "my" || mode === "like") &&
              (() => {
                const isLikedSpots = mode === "like" && userAiTab === "ai";
                const coursesToShow = isLikedSpots
                  ? userCourses
                  : userAiTab === "user"
                  ? userCourses
                  : aiCourses;

                if (coursesToShow.length > 0) {
                  return coursesToShow.map((item) => {
                    if (isLikedSpots) {
                      return (
                        <WishlistCard
                          key={item.id}
                          image={item.firstImage || img1}
                          title={item.title}
                          subtitle={item.address}
                          onClick={() =>
                            navigate(`/spot/${item.contentId}`, { state: item })
                          }
                        />
                      );
                    }

                    let repImage = "";
                    if (mode === "like") {
                      repImage = item.image || item.firstImage || "";
                    } else {
                      if (userAiTab === "ai") {
                        repImage = item.image;
                      } else {
                        const schedules = item.detailedSchedule || [];
                        const found = schedules.find((s) => s.firstImage);
                        repImage = found?.firstImage || "";
                      }
                    }

                    const idPrefix =
                      mode === "like" ? item.type || "ai" : userAiTab;

                    return (
                      <WishlistCard
                        key={item.id}
                        image={repImage || img1}
                        title={item.title}
                        subtitle={item.theme}
                        courseId={item.id}
                        type={idPrefix} // 'user' 또는 'ai'
                        mode={mode} // 'my' 또는 'like' 넘김
                        onClick={() =>
                          navigate(`/courses/${idPrefix}/${item.id}`)
                        }
                        onDeleted={async () => {
                          const data = await fetchUserCourses("user");
                          setUserCourses(data.content || []);
                        }}
                      />
                    );
                  });
                } else {
                  return (
                    <p className={styles.emptyText}>
                      {mode === "like" && userAiTab === "ai"
                        ? "좋아요한 관광지가 없습니다."
                        : userAiTab === "user"
                        ? "USER 코스가 없습니다."
                        : "AI 코스가 없습니다."}
                    </p>
                  );
                }
              })()}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={(newPage) => setCurrentPage(newPage)} // 페이지 변경 시 호출
        />
      </div>
      <ScrollToTopButton />
    </>
  );
}
