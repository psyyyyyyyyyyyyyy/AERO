import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./addTravelPage.module.css";

import Header from "../components/header/Header";
import TitleHeader from "../components/addTravel/TitleHeader";
import ToggleButtons from "../components/addTravel/ToggleButtons";
import InputGroup from "../components/addTravel/InputGroup";
import DayTabs from "../components/addTravel/DayTab";
import MapSection from "../components/addTravel/MapSection";
import ScheduleList from "../components/addTravel/ScheduleList";
import SaveButton from "../components/addTravel/SaveButton";
import { useScheduleStore } from "../stores/useScheduleStore";
import { postTravelCourse } from "../api/AddTravelApi";

export default function AddTravelPage() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState("");
  const [allow, setAllow] = useState(true);
  const [selectedDay, setSelectedDay] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();
  const resetStore = useScheduleStore((state) => state.resetStore);

 useEffect(() => {
    // 토큰 없으면 리다이렉트
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/start");
      return;
    }

    // URL 바뀌거나 새로 진입할 때 Zustand 초기화
    resetStore();
  }, [location.pathname, navigate]);

  // 여행 일 수 계산
  const getTotalDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const totalDays = getTotalDays();

  // 저장 버튼 클릭 시 POST 요청
  const handleSave = async () => {
    const { schedulesByDay, detailsByDay } = useScheduleStore.getState();

    // 필수 항목 유효성 검사
    if (!title || !theme || !startDate || !endDate || !people) {
      alert("모든 기본 정보를 입력해주세요.");
      return false;
    }

    const totalDays = getTotalDays();

    // 각 날짜마다 적어도 하나의 일정이 있는지 확인
    for (let day = 1; day <= totalDays; day++) {
      const dayKey = String(day);
      const places = schedulesByDay[dayKey] || [];
      const validPlaces = places.filter((place) => place?.value);
      if (validPlaces.length === 0) {
        alert(`${day}일차 일정에 최소 1개 이상의 관광지를 추가해주세요.`);
        return false;
      }
    }

    // 일정 데이터 구성
    const detailedSchedule = Object.entries(schedulesByDay).flatMap(
      ([day, places]) =>
        places
          .map((place, idx) => {
            if (!place.value) return null; // 관광지 이름이 없으면 무시
            return {
              day: parseInt(day),
              time: detailsByDay[day]?.[idx]?.time || "",
              description: detailsByDay[day]?.[idx]?.description || "",
              place: place.value,
              contentId: place.contentId,
              mapX: place.mapX,
              mapY: place.mapY,
              firstImage: place.firstImage || null,
            };
          })
          .filter(Boolean)
    );

    //시간 포함된 날짜로 변경
    const formatDate = (dateStr) => {
      return dateStr ? `${dateStr}T00:00:00` : "";
    };

    const requestBody = {
      title,
      theme,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      people,
      allow,
      detailedSchedule,
    };

    try {
      await postTravelCourse(requestBody);
      alert("여행 계획이 저장되었습니다!");
      return true;
    } catch (error) {
      alert("저장에 실패했습니다.");
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.headerSection}>
        <TitleHeader />
        <ToggleButtons allow={allow} setAllow={setAllow} />
      </div>
      <InputGroup
        title={title}
        setTitle={setTitle}
        theme={theme}
        setTheme={setTheme}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        people={people}
        setPeople={setPeople}
      />
      <DayTabs
        totalDays={totalDays}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
      <MapSection selectedDay={selectedDay} />

      <ScheduleList selectedDay={selectedDay} />
      <SaveButton onSave={handleSave} selectedDay={selectedDay} />
    </div>
  );
}
