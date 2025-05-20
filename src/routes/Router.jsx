import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import RegionSearchPage from "../pages/RegionSearchPage";
import AddTravelPage from "../pages/AddTravelPage";
import CourseSearchPage from "../pages/CourseSearchPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/course" element={<CourseSearchPage />} />
        <Route path="/search" element={<RegionSearchPage />} />
        <Route path="/schedule" element={<AddTravelPage />} />
        <Route path="/example" element={<CourseDetailPage />} />
      </Routes>
    </Router>
  );
}
