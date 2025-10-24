import { BrowserRouter as Router, Route, Routes } from "react-router";
import NavMenu from "./components/nav/NavMenu";
import Home from "./pages/home/Home";
import Templates from "./pages/templates/Templates";
import History from "./pages/history/History";
import Statistics from "./pages/statistics/Statistics";
import AddTemplate from "./pages/templates/AddTemplate";
import AddExercise from "./pages/templates/AddExercise";
import { useAppSelector } from "@/app/hooks";
import ActiveTemplate from "./pages/templates/ActiveTemplate";
import RecentActiveTemplate from "./pages/templates/RecentActiveTemplate";
import Volume from "./pages/statistics/Volume";
import Performance from "./pages/statistics/Performance";
import Consistency from "./pages/statistics/Consistency";

export default function App() {
  const name = useAppSelector((state) => state.home.name);

  return (
    <div className="flex items-center justify-center min-h-screen bg-textSecondary">
      <div className="w-full min-h-screen sm:w-[375px] sm:h-[812px] bg-appBg text-textPrimary sm:rounded-3xl sm:shadow-2xl overflow-hidden flex flex-col relative">
        <Router>
          <div
            className={`flex-1 flex flex-col ${
              !name ? "justify-center items-center" : ""
            } px-4 py-6 pb-20 overflow-y-auto`}
          >
            {/* conditionally center only the name input */}
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/templates"
                element={<Templates />}
              />
              <Route
                path="/history"
                element={<History />}
              />
              <Route
                path="/statistics"
                element={<Statistics />}
              />
              <Route
                path="/statistics/consistency"
                element={<Consistency />}
              />
              <Route
                path="/statistics/volume"
                element={<Volume />}
              />
              <Route
                path="/statistics/performance"
                element={<Performance />}
              />

              <Route
                path="/add-template/:templateId?"
                element={<AddTemplate />}
              />
              <Route
                path="/add-template/:templateId/add-exercise/:exerciseId?"
                element={<AddExercise />}
              />
              <Route
                path="/active-template/:activeTemplateId/add-exercise/:exerciseId?"
                element={<AddExercise />}
              />
              <Route
                path="/activeTemplate/:activeTemplateId"
                element={<ActiveTemplate />}
              />
              <Route
                path="/recentActiveTemplate/:recentActiveTemplateId"
                element={<RecentActiveTemplate />}
              />
            </Routes>
          </div>

          <div className="w-full fixed sm:absolute bottom-0 left-0">
            <NavMenu />
          </div>
        </Router>
      </div>
    </div>
  );
}
