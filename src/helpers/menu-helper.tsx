import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { RolesEnum } from "../api/roles/enum";
import { URLs } from "../config/enums";

export interface MenuItem {
  key: any;
  label: string;
  roles?: string[];
  icon?: JSX.Element;
}

export const MenuItems: MenuItem[] = [
  {
    key: URLs.ROOT,
    label: "Dashboard",
    roles: [RolesEnum.GARDEN_MANAGER, RolesEnum.VISITOR],
  },
  { key: URLs.USERS, label: "Usuarios", roles: [RolesEnum.ADMIN] },
  { key: URLs.ROLES, label: "Roles", roles: [RolesEnum.ADMIN] },
  { key: URLs.GARDENS, label: "Huertas", roles: [RolesEnum.GARDEN_MANAGER] },
  {
    key: URLs.SHARED_GARDENS,
    label: "Huertas Compartidas",
    roles: [RolesEnum.VISITOR],
  },
];

export const renderMenuItemsByRole = (roleCode: string) => {
  if (roleCode === RolesEnum.ADMIN) return MenuItems;
  return MenuItems.filter((i) => i.roles?.find((i) => i === roleCode));
};

export const HeaderMenuActions: MenuItem[] = [
  {
    key: URLs.PROFILE,
    icon: <UserOutlined />,
    label: "Perfil",
    roles: [RolesEnum.GARDEN_MANAGER, RolesEnum.VISITOR],
  },
  {
    key: URLs.LOGOUT,
    icon: <LogoutOutlined />,
    label: "Cerrar sesión",
    roles: [RolesEnum.GARDEN_MANAGER, RolesEnum.VISITOR],
  },
];
