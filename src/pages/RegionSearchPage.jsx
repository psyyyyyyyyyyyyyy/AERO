import { useEffect, useState } from "react";
import { fetchTourSpots } from "../api/RegionSearchApi";
import { useRegionSearchStore } from "../stores/useRegionSearchStore";

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
  const [showFacilities, setShowFacilities] = useState(false);
  const [tourSpots, setTourSpots] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const {
    filters,
    setFilter,
    resetPage,
    regionName,
    setRegionName,
  } = useRegionSearchStore();

  const currentPaths = pathMap[regionName];
  const currentViewBox = viewBoxMap[regionName];

  const allFacilities = [
    "publictransport",
    "elevator",
    "wheelchair",
    "guidehuman",
    "restroom",
    "parking",
    "room",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTourSpots(filters);
        setTourSpots(data.content);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [JSON.stringify(filters)]);

  return (
    <div>
      <Header />

      <RegionTabs
        selectedRegion={{ name: regionName, code: filters.areaCode }}
        onSelect={(region) => {
          setRegionName(region.name);
          setFilter("areaCode", region.code);
          setFilter("sigunguCode", "");
          resetPage();
        }}
      />

      {currentPaths ? (
        <RegionMap
          paths={currentPaths}
          viewBox={currentViewBox}
          selectedSigungu={filters.sigunguCode}
          onSelect={(sigunguCode) => {
            setFilter("sigunguCode", sigunguCode);
            resetPage();
          }}
        />
      ) : (
        <div style={{ textAlign: "center", margin: "30px" }}>
          "{regionName}" 지역 지도 준비 중
        </div>
      )}

      <FacilityToggle
        onClick={() => setShowFacilities((prev) => !prev)}
        active={showFacilities}
        onToggleAll={() => {
          const isAllSelected =
            filters.facilityFilters.length === allFacilities.length;
          setFilter("facilityFilters", isAllSelected ? [] : allFacilities);
        }}
        isAllSelected={filters.facilityFilters.length === allFacilities.length}
      />

      <FacilityOptions
        visible={showFacilities}
        selected={filters.facilityFilters}
        onChange={(selected) => {
          setFilter("facilityFilters", selected);
          resetPage();
        }}
      />

      <ThemeTabs
        selectedThemes={filters.themeFilters}
        onChange={(themes) => {
          setFilter("themeFilters", themes);
          resetPage();
        }}
      />

      <SortTabs
        current={filters.sortBy}
        onSelect={(sort) => {
          setFilter("sortBy", sort);
          resetPage();
        }}
      />

      <TourCardList spots={tourSpots} />

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onChange={(page) => setFilter("page", page)}
      />

      <ScrollToTopButton />
    </div>
  );
}
