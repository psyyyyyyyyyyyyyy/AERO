import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { fetchTourSpots } from "../api/RegionSearchApi";

import Header from "../components/header/Header";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import RegionTabs from "../components/regionSearch/RegionTabs";
import RegionMap from "../components/regionSearch/RegionMap";
import FacilityToggle from "../components/regionSearch/FacilityToggle";
import FacilityOptions from "../components/regionSearch/FacilityOptions";
import SortTabs from "../components/regionSearch/SortTabs";
import ThemeTabs from "../components/regionSearch/ThemeTabs";
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
import { gyeongnamPaths } from "../components/regionSearch/paths/gyeongnamPaths";
import { gangwonPaths } from "../components/regionSearch/paths/gangwonPaths";
import { incheonPaths } from "../components/regionSearch/paths/incheonPaths";
import { chungnamPaths } from "../components/regionSearch/paths/chungnamPaths";
import { chungbukPaths } from "../components/regionSearch/paths/chungbukPaths";
import { jeonnamPaths } from "../components/regionSearch/paths/jeonnamPaths";
import { jeonbukPaths } from "../components/regionSearch/paths/jeonbukPaths";
import { jejuPaths } from "../components/regionSearch/paths/jejuPaths";
import { gyeongbukPaths } from "../components/regionSearch/paths/gyeongbukPaths";

const pathMap = {
  서울: seoulPaths,
  부산: busanPaths,
  대전: daejeonPaths,
  대구: daeguPaths,
  광주: gwangjuPaths,
  울산: ulsanPaths,
  세종: sejongPaths,
  경기: gyeonggiPaths,
  경북: gyeongbukPaths,
  경남: gyeongnamPaths,
  강원: gangwonPaths,
  인천: incheonPaths,
  충남: chungnamPaths,
  충북: chungbukPaths,
  전남: jeonnamPaths,
  전북: jeonbukPaths,
  제주: jejuPaths,
};

const viewBoxMap = {
  서울: "0 0 800 700",
  부산: "0 0 800 800",
  대전: "0 0 800 1010",
  대구: "0 0 850 1310",
  광주: "0 0 800 600",
  세종: "-100 0 1000 1200",
  경기: "0 0 800 1000",
  인천: "360 60 450 500",
  충남: "150 0 670 600",
  경북: "0 0 600 580",
  전북: "100 0 700 500",
  전남: "100 0 700 600",
  제주: "0 500 800 600",
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
      sortBy: "likes",
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
      <Header />

      <RegionTabs
        selectedRegion={selectedRegion}
        onSelect={(region) => {
          setSelectedRegion(region);
          setValue("areaCode", region.code);
          setValue("sigunguCode", ""); // 지역 바뀔 때 시군구 초기화
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
            setValue("page", 0);
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

      <ThemeTabs
        selectedThemes={formValues.themeFilters}
        onChange={(newThemes) => {
          setValue("themeFilters", newThemes);
          setValue("page", 0); // 테마 바꿀 때 페이지 초기화
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
        onChange={(page) => setValue("page", page)} // 선택한 페이지 상위 전달
      />

      <ScrollToTopButton />
    </div>
  );
}
