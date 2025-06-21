import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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

export default function CourseSearchPage() {
  const [showFacilities, setShowFacilities] = useState(false);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { setValue, getValues, control } = useForm({
    defaultValues: {
      theme: "자연관광",
      barrierFree: "",
      type: "ai",
      sortBy: "like",
      page: 0,
      size: 10,
    },
  });

  const formValues = useWatch({ control });

  useEffect(() => {
    if (!formValues.barrierFree || formValues.barrierFree === "") {
      delete formValues.barrierFree;
    }

    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        const res = await fetchCourses(getValues());
        setCourses(res.content);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [JSON.stringify(formValues)]);

  return (
    <div>
      <Header />

      <ThemeTabs
        selectedTheme={formValues.theme}
        onSelect={(theme) => {
          setValue("theme", theme);
          setValue("page", 0);
        }}
      />

      <FacilityToggle
        onClick={() => setShowFacilities((prev) => !prev)}
        active={showFacilities}
        onToggleAll={() => {
          const all = [
            "publictransport",
            "elevator",
            "wheelchair",
            "guidehuman",
            "restroom",
            "parking",
            "room",
          ];
          const isAll =
            formValues.barrierFree?.split(",").length === all.length;
          setValue("barrierFree", isAll ? "" : all.join(","));
        }}
        isAllSelected={formValues.barrierFree?.split(",").length === 7}
      />

      <FacilityOptions
        visible={showFacilities}
        selected={formValues.barrierFree?.split(",") || []}
        onChange={(filters) => {
          setValue("barrierFree", filters.join(","));
          setValue("page", 0);
        }}
      />

      <SortTabs
        current={formValues.sortBy}
        onSelect={(sort) => {
          setValue("sortBy", sort);
          setValue("page", 0);
        }}
        selectedType={formValues.type || "ai"}
        onTypeChange={(type) => {
          setValue("type", type);
          setValue("page", 0);
        }}
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
        <TourCardList spots={courses} />
      )}

      <Pagination
        currentPage={formValues.page}
        totalPages={totalPages}
        onChange={(page) => setValue("page", page)}
      />

      <ScrollToTopButton />
    </div>
  );
}
