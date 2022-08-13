import { Route, Routes } from "react-router-dom";
import { RolesEnum } from "../api/roles/enum";
import AuthorizedRoute from "../components/AuthorizedRoute/AuthorizedRoute";
import { URLs } from "../config/enums";

const UsersPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path={URLs.ROOT}
        element={
          <AuthorizedRoute roles={[RolesEnum.ADMIN]}>
            <span>Grilla de usuarios</span>
          </AuthorizedRoute>
        }
      />
      <Route
        path={URLs.NEW}
        element={
          <AuthorizedRoute roles={[RolesEnum.ADMIN]}>
            <span>Nuevo usuario</span>
          </AuthorizedRoute>
        }
      />

      <Route
        path={URLs.DETAIL}
        element={
          <AuthorizedRoute roles={[RolesEnum.ADMIN]}>
            <span>Detalle de un usuario</span>
          </AuthorizedRoute>
        }
      />
    </Routes>
  );
};

export default UsersPage;
