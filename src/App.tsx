import { BrowserRouter as Router, Route, Routes } from "react-router";
import NavMenu from "./components/nav/NavMenu";
import Home from "./pages/home/Home";
import Templates from "./pages/templates/Templates";
import History from "./pages/history/History";
import Tracking from "./pages/tracking/Tracking";
import AddTemplate from "./pages/templates/AddTemplate";
import AddExercise from "./pages/templates/AddExercise";
import { useAppSelector } from "@/app/hooks";
import ActiveTemplate from "./pages/templates/ActiveTemplate";
import RecentActiveTemplate from "./pages/templates/RecentActiveTemplate";

export default function App() {
  const name = useAppSelector((state) => state.home.name);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="w-full min-h-screen sm:w-[375px] sm:h-[812px] bg-[#111827] text-white sm:rounded-3xl sm:shadow-2xl overflow-hidden flex flex-col relative">
        <Router>
          <div
            className={`flex-1 flex flex-col ${
              !name ? "justify-center items-center" : ""
            } px-4 py-6 pb-20`}
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
                path="/tracking"
                element={<Tracking />}
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

          <div className="w-full absolute bottom-0 left-0">
            <NavMenu />
          </div>
        </Router>
      </div>
    </div>
  );
}
