import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { fetchCourses } from "../api/CourseSearchApi";

import SearchSection from "../components/courseSearch/SearchSection";
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

  const { setValue, getValues, control } = useForm({
    defaultValues: {
      theme: "자연관광",
      barrierFree: "",
      type: "ai",
      sortBy: "recent",
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
        const res = await fetchCourses(getValues());
        setCourses(res.content);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [JSON.stringify(formValues)]);

  return (
    <div>
      <SearchSection />

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

      <TourCardList spots={courses} />

      <Pagination
        currentPage={formValues.page}
        totalPages={totalPages}
        onChange={(page) => setValue("page", page)}
      />
    </div>
  );
}
