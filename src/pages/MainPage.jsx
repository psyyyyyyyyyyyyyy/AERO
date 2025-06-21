import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import MainBanner from "../components/main/MainBanner";
import AlertModal from "../components/main/AlertModal";
import TodayWeather from "../components/main/TodayWeather";
import MainTabs from "../components/main/MainTabs";
import ThemeCourse from "../components/main/ThemeCourse";
import CallTaxiSection from "../components/main/CallTaxiSection";
import { motion, AnimatePresence } from "framer-motion";

import { ClipLoader } from "react-spinners";
import { fetchTourSpots } from "../api/RegionSearchApi";
import { fetchCourses } from "../api/CourseSearchApi";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("관광지");
  const [tourSpots, setTourSpots] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // 관광지 or 코스 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === "관광지") {
          const data = await fetchTourSpots({
            sortBy: "likes",
            page: 0,
            size: 5,
          });
          setTourSpots(data.content || []);
        } else if (activeTab === "코스") {
          const data = await fetchCourses({
            sortBy: "like",
            page: 0,
            size: 5,
          });
          setCourses(data.content || []);
        }
      } catch (e) {
        console.error("데이터 불러오기 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  return (
    <div>
      <Header />
      <MainBanner />
      <AnimatePresence mode="wait">
        <motion.div
          key="weather"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <TodayWeather />
        </motion.div>

        <motion.div
          key="alert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <AlertModal />
        </motion.div>
      </AnimatePresence>

      <MainTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px 0",
            }}
          >
            <ClipLoader color="#7ED6EA" size={60} />
          </motion.div>
        ) : (
          <motion.div
            key="course"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {activeTab === "관광지" ? (
              <ThemeCourse
                title="추천 관광지"
                sub="인기 있는 관광지를 소개합니다."
                items={tourSpots}
                type="spot"
              />
            ) : (
              <ThemeCourse
                title="추천 코스"
                sub="베리어프리 추천 코스를 확인해보세요."
                items={courses}
                type="course"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CallTaxiSection />
      </motion.div>

      <ScrollToTopButton />
    </div>
  );
}
