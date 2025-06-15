import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import RegionSearchPage from "../pages/RegionSearchPage";
import AddTravelPage from "../pages/AddTravelPage";
import CourseSearchPage from "../pages/CourseSearchPage";
import MyMapPage from "../pages/MyMapPage";
import WishlistPage from "../pages/WishlistPage";
import StartPage from "../pages/StartPage";
import SpotDetailPage from "../pages/SpotDetailPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/course" element={<CourseSearchPage />} />
        <Route path="/spot" element={<RegionSearchPage />} />
        <Route path="/spot/:contentId" element={<SpotDetailPage />} />
        <Route path="/schedule" element={<AddTravelPage />} />
        <Route path="/example" element={<CourseDetailPage />} />
        <Route path="/mymap" element={<MyMapPage />} />
        <Route path="/mypage" element={<WishlistPage />} />
      </Routes>
    </Router>
  );
}
