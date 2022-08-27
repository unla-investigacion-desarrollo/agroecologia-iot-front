import { Route, Routes } from "react-router-dom";
import { RolesEnum } from "../api/roles/enum";
import AuthorizedRoute from "../components/AuthorizedRoute/AuthorizedRoute";
import GardenDetail from "../components/Gardens/GardenDetail";
import GardenInfoCard from "../components/Gardens/GardenInfoCard";
import GardensGrid from "../components/Gardens/GardensGrid";
import { URLs } from "../config/enums";

const GardensPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path={URLs.ROOT}
        element={
          <AuthorizedRoute roles={[RolesEnum.GARDEN_MANAGER]}>
            <GardensGrid />
          </AuthorizedRoute>
        }
      />

      <Route
        path={URLs.NEW}
        element={
          <AuthorizedRoute roles={[RolesEnum.GARDEN_MANAGER]}>
            <GardenDetail />
          </AuthorizedRoute>
        }
      />

      <Route
        path={URLs.DETAIL}
        element={
          <AuthorizedRoute roles={[RolesEnum.GARDEN_MANAGER]}>
            <GardenDetail />
          </AuthorizedRoute>
        }
      />

      <Route
        path="/test-card-list"
        element={
          <AuthorizedRoute roles={[RolesEnum.GARDEN_MANAGER]}>
            <GardenInfoCard />
          </AuthorizedRoute>
        }
      />
    </Routes>
  );
};

export default GardensPage;
