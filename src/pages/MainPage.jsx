import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import MainBanner from "../components/main/MainBanner";
import AlertModal from "../components/main/AlertModal";
import TodayWeather from "../components/main/TodayWeather";
import MainTabs from "../components/main/MainTabs";
import ThemeCourse from "../components/main/ThemeCourse";
import EventSection from "../components/main/EventSection";
import CallTaxiSection from "../components/main/CallTaxiSection";

import { fetchTourSpots } from "../api/RegionSearchApi";
import { fetchCourses } from "../api/CourseSearchApi";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("관광지");
  const [tourSpots, setTourSpots] = useState([]);
  const [courses, setCourses] = useState([]);

  // 관광지 or 코스 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      if (activeTab === "관광지") {
        try {
          const data = await fetchTourSpots({
            sortBy: "likes",
            page: 0,
            size: 5,
          });
          setTourSpots(data.content || []);
        } catch (e) {
          console.error("관광지 불러오기 실패:", e);
        }
      } else if (activeTab === "코스") {
        try {
          const data = await fetchCourses({ sortBy: "like", page: 0, size: 5 });
          setCourses(data.content || []);
        } catch (e) {
          console.error("코스 불러오기 실패:", e);
        }
      }
    };

    loadData();
  }, [activeTab]);

  return (
    <div>
      <Header />
      <MainBanner />
      {/* <AlertModal /> */}
      <TodayWeather />
      <MainTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "관광지" && (
        <ThemeCourse
          title="추천 관광지"
          sub="인기 있는 관광지를 소개합니다."
          items={tourSpots}
          type="spot"
        />
      )}
      {activeTab === "코스" && (
        <ThemeCourse
          title="추천 코스"
          sub="베리어프리 추천 코스를 확인해보세요."
          items={courses}
          type="course"
        />
      )}
      <EventSection />
      <CallTaxiSection />
    </div>
  );
}
