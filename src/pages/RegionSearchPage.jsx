import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { fetchTourSpots } from "../api/RegionSearchApi";

import SearchSection from "../components/regionSearch/SearchSection";
import RegionTabs from "../components/regionSearch/RegionTabs";
import RegionMap from "../components/regionSearch/RegionMap";
import FacilityToggle from "../components/regionSearch/FacilityToggle";
import FacilityOptions from "../components/regionSearch/FacilityOptions";
import SortTabs from "../components/regionSearch/SortTabs";
import TourCardList from "../components/regionSearch/TourCardList";
import Pagination from "../components/regionSearch/Pagination";

import { seoulPaths } from "../components/regionSearch/paths/seoulPaths";
import { busanPaths } from "../components/regionSearch/paths/busanPaths";
import { daejeonPaths } from "../components/regionSearch/paths/daejeonPaths";
import { daeguPaths } from "../components/regionSearch/paths/daeguPaths";
import { gwangjuPaths } from "../components/regionSearch/paths/gwangjuPaths";
import { ulsanPaths } from "../components/regionSearch/paths/ulsanPaths";
import { sejongPaths } from "../components/regionSearch/paths/sejongPaths";
import { gyeonggiPaths } from "../components/regionSearch/paths/gyeonggiPaths";

const pathMap = {
  서울: seoulPaths,
  부산: busanPaths,
  대전: daejeonPaths,
  대구: daeguPaths,
  광주: gwangjuPaths,
  울산: ulsanPaths,
  세종: sejongPaths,
  경기: gyeonggiPaths,
};

const viewBoxMap = {
  서울: "0 0 800 700",
  부산: "0 0 800 800",
  대전: "0 0 800 1010",
  대구: "0 0 850 1310",
  광주: "0 0 800 600",
  세종: "-100 0 1000 1200",
  경기: "0 0 800 1000",
};

export default function RegionSearchPage() {
  const [selectedRegion, setSelectedRegion] = useState({
    name: "서울",
    code: "1",
  });
  const [showFacilities, setShowFacilities] = useState(false);
  const [tourSpots, setTourSpots] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 저장

  const { register, setValue, getValues, control } = useForm({
    defaultValues: {
      areaCode: "1",
      sigunguCode: "",
      facilityFilters: [],
      themeFilters: [],
      sortBy: "like",
      page: 0,
      size: 10,
    },
  });

  const formValues = useWatch({ control });

  const currentPaths = pathMap[selectedRegion.name];
  const currentViewBox = viewBoxMap[selectedRegion.name];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTourSpots(getValues());
        setTourSpots(data.content);
        setTotalPages(data.totalPages); // 페이지 수 저장
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [JSON.stringify(formValues)]);

  return (
    <div>
      <SearchSection />

      <RegionTabs
        selectedRegion={selectedRegion}
        onSelect={(region) => {
          setSelectedRegion(region);
          setValue("areaCode", region.code);
          setValue("page", 0); // 지역 바꾸면 페이지 0으로 초기화
        }}
      />

      {currentPaths ? (
        <RegionMap
          paths={currentPaths}
          regionName={selectedRegion.name}
          viewBox={currentViewBox}
          onSelect={(code) => {
            setValue("sigunguCode", code);
            setValue("page", 0); // 시군구 바꿔도 페이지 초기화
          }}
        />
      ) : (
        <div style={{ textAlign: "center", margin: "30px" }}>
          "{selectedRegion.name}" 지역 지도 준비 중
        </div>
      )}

      <FacilityToggle
        onClick={() => setShowFacilities((prev) => !prev)}
        active={showFacilities}
        onToggleAll={() => {
          const allOptions = [
            "publictransport",
            "elevator",
            "wheelchair",
            "guidehuman",
            "restroom",
            "parking",
            "room",
          ];
          const isAllSelected =
            formValues.facilityFilters.length === allOptions.length;
          setValue("facilityFilters", isAllSelected ? [] : allOptions);
        }}
        isAllSelected={formValues.facilityFilters.length === 7}
      />

      <FacilityOptions
        visible={showFacilities}
        selected={formValues.facilityFilters}
        onChange={(filters) => {
          setValue("facilityFilters", filters);
          setValue("page", 0); // 필터 바꿀 때도 페이지 초기화
        }}
      />

      <SortTabs
        current={formValues.sortBy}
        onSelect={(sort) => {
          setValue("sortBy", sort);
          setValue("page", 0); // 정렬 변경 시 페이지 초기화
        }}
      />

      <TourCardList spots={tourSpots} />

      <Pagination
        currentPage={formValues.page}
        totalPages={totalPages}
        onChange={(page) => setValue("page", page)} // ✅ 선택한 페이지 상위 전달
      />
    </div>
  );
}
