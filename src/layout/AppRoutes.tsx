import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RolesPage from "../pages/RolesPage";
import { URLs } from "../config/enums";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import GardensPage from "../pages/GardensPage";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import NotFoundPage from "../pages/NotFoundPage";
import AppLayout from "./AppLayout";
import LogoutPage from "../pages/LogoutPage";
import PublicRoute from "../components/PublicRoute/PublicRoute";

const AppRoutes: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route
          path={`${URLs.ROOT}/*`}
          element={
            <LoggedInRoute>
              <DashboardPage />
            </LoggedInRoute>
          }
        />
        <Route
          path={`${URLs.USERS}/*`}
          element={
            <LoggedInRoute>
              <UsersPage />
            </LoggedInRoute>
          }
        />

        <Route
          path={`${URLs.ROLES}/*`}
          element={
            <LoggedInRoute>
              <RolesPage />
            </LoggedInRoute>
          }
        />

        <Route
          path={`${URLs.GARDENS}/*`}
          element={
            <LoggedInRoute>
              <GardensPage />
            </LoggedInRoute>
          }
        />

        <Route
          path={URLs.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path={URLs.LOGOUT} element={<LogoutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
