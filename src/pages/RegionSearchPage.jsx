import SearchSection from "../components/regionSearch/SearchSection";
import RegionTabs from "../components/regionSearch/RegionTabs";
import SeoulMap from "../components/regionSearch/SeoulMap";
import FacilityToggle from "../components/regionSearch/FacilityToggle";
import FacilityOptions from "../components/regionSearch/FacilityOptions";
import SortTabs from "../components/regionSearch/SortTabs";
import TourCardList from "../components/regionSearch/TourCardList";

import { useState } from "react";

export default function TourSearchPage() {
  const [showFacilities, setShowFacilities] = useState(false);

  return (
    <div>
      <SearchSection />
      <RegionTabs />
      <SeoulMap />
      <FacilityToggle
        onClick={() => setShowFacilities((prev) => !prev)}
        active={showFacilities}
      />
      <FacilityOptions visible={showFacilities} />
      <SortTabs />
      <TourCardList />
    </div>
  );
}
