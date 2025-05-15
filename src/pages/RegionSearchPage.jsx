import { useState } from "react";
import SearchSection from "../components/regionSearch/SearchSection";
import RegionTabs from "../components/regionSearch/RegionTabs";
import RegionMap from "../components/regionSearch/RegionMap";
import FacilityToggle from "../components/regionSearch/FacilityToggle";
import FacilityOptions from "../components/regionSearch/FacilityOptions";
import SortTabs from "../components/regionSearch/SortTabs";
import TourCardList from "../components/regionSearch/TourCardList";
import Pagination from "../components/regionSearch/Pagination";

// 지역별 path import
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
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [showFacilities, setShowFacilities] = useState(false);

  const currentPaths = pathMap[selectedRegion];
  const currentViewBox = viewBoxMap[selectedRegion];

  return (
    <div>
      <SearchSection />

      <RegionTabs
        selectedRegion={selectedRegion}
        onSelect={setSelectedRegion}
      />

      {currentPaths ? (
        <RegionMap
          paths={currentPaths}
          regionName={selectedRegion}
          viewBox={currentViewBox}
        />
      ) : (
        <div style={{ textAlign: "center", margin: "30px" }}>
          "{selectedRegion}" 지역 지도 준비 중
        </div>
      )}

      <FacilityToggle
        onClick={() => setShowFacilities((prev) => !prev)}
        active={showFacilities}
      />
      <FacilityOptions visible={showFacilities} />
      <SortTabs />
      <TourCardList />
      <Pagination />
    </div>
  );
}
