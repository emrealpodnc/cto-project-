import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Projects/Projects";
import NewProject from "../pages/NewProject/NewProject";
import WeeklyReports from "../pages/WeeklyReports/WeeklyReports";
import NewWeeklyReport from "../pages/WeeklyReports/NewWeeklyReport";
import EditWeeklyReport from "../pages/WeeklyReports/EditWeeklyReport";
import WeeklyReportDetail from "../pages/WeeklyReports/WeeklyReportDetail";
import ProjectDetail from "../pages/Projects/ProjectDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import Users from "../pages/Users/Users";
import Settings from "../pages/Settings/Settings";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/new"
        element={
          <ProtectedRoute roles={["ADMIN", "CTO"]}>
            <NewProject />
          </ProtectedRoute>
        }
      />

      <Route
  path="/projects/edit/:id"
  element={
    <ProtectedRoute roles={["ADMIN", "CTO"]}>
      <NewProject />
    </ProtectedRoute>
  }
/>

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weekly-reports"
        element={
          <ProtectedRoute>
            <WeeklyReports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weekly-reports/new"
        element={
          <ProtectedRoute>
            <NewWeeklyReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weekly-reports/edit/:id"
        element={
          <ProtectedRoute>
            <EditWeeklyReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weekly-reports/:id"
        element={
          <ProtectedRoute>
            <WeeklyReportDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute roles={["ADMIN", "CTO"]}>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;