import { useEffect, useState } from "react";
import { fetchCourses } from "../api/CourseSearchApi";
import { ClipLoader } from "react-spinners";

import Header from "../components/header/Header";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import FacilityToggle from "../components/regionSearch/FacilityToggle";
import FacilityOptions from "../components/regionSearch/FacilityOptions";
import SortTabs from "../components/courseSearch/SortTabs";
import TourCardList from "../components/courseSearch/TourCardList";
import Pagination from "../components/courseSearch/Pagination";
import ThemeTabs from "../components/courseSearch/ThemeTabs";

import { useCourseSearchStore } from "../stores/useCourseSearchStore";

export default function CourseSearchPage() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showFacilities, setShowFacilities] = useState(false);

  const { filters, setFilter, resetPage } = useCourseSearchStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchCourses(filters);
        setCourses(res.content);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filters)]);

  const barrierList = [
    "publictransport",
    "elevator",
    "wheelchair",
    "guidehuman",
    "restroom",
    "parking",
    "room",
  ];
  const selectedFilters = filters.barrierFree?.split(",") || [];

  return (
    <div>
      <Header />

      <ThemeTabs
        selectedTheme={filters.theme}
        onSelect={(theme) => {
          setFilter("theme", theme);
          resetPage();
        }}
      />

      <FacilityToggle
        onClick={() => setShowFacilities((prev) => !prev)}
        active={showFacilities}
        onToggleAll={() => {
          const isAll = selectedFilters.length === barrierList.length;
          setFilter("barrierFree", isAll ? "" : barrierList.join(","));
        }}
        isAllSelected={selectedFilters.length === barrierList.length}
      />

      <FacilityOptions
        visible={showFacilities}
        selected={selectedFilters}
        onChange={(filters) => {
          setFilter("barrierFree", filters.join(","));
          resetPage();
        }}
      />

      <SortTabs
        current={filters.sortBy}
        onSelect={(sort) => {
          setFilter("sortBy", sort);
          resetPage();
        }}
        selectedType={filters.type}
        onTypeChange={(type) => {
          setFilter("type", type);
          resetPage();
        }}
      />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
          <ClipLoader color="#7ED6EA" size={60} />
        </div>
      ) : (
        <TourCardList spots={courses} />
      )}

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onChange={(page) => setFilter("page", page)}
      />

      <ScrollToTopButton />
    </div>
  );
}
