import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAiCourseDetail, fetchUserCourseDetail } from "../api/CourseDetailApi";

import Header from "../components/header/Header";
import CourseTitle from "../components/courseDetail/CourseTitle";
import NaverMapView from "../components/courseDetail/NaverMapView";
import PlaceList from "../components/courseDetail/PlaceList";
import DayTabs from "../components/addTravel/DayTab";

import { TailSpin } from "react-loader-spinner";
import styles from "./courseDetailPage.module.css";

export default function CourseDetailPage() {
  const { type, id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data =
          type === "ai"
            ? await fetchAiCourseDetail(id)
            : await fetchUserCourseDetail(id);
        setCourse(data);
      } catch (error) {
        console.error("코스 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [type, id]);

  if (loading) {
    return (
      <div className={styles.spinnerWrapper}>
        <TailSpin height="60" width="60" color="#7ed6ea" />
      </div>
    );
  }

  if (!course) return <div>코스 정보를 불러오지 못했습니다.</div>;

  const start = new Date(course.startDate);
  const end = new Date(course.endDate);
  const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const schedules = course.schedules || course.detailedSchedule || [];

  const currentDaySchedule = schedules.filter(
    (s) => s.day === selectedDay
  );

  return (
    <div>
      <Header />
      <CourseTitle course={{ ...course, schedules }} />
      <NaverMapView places={currentDaySchedule || []} />

      <DayTabs
        totalDays={totalDays}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      <PlaceList schedules={currentDaySchedule || []} />
    </div>
  );
}
