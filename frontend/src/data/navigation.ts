export interface NavLinkItem {
  id: string;
  label: string;
  path: string;
  iconName: "Compass" | "LayoutTemplate" | "Tag";
}

export const PRIMARY_NAV_ITEMS: NavLinkItem[] = [
  { id: "home", label: "Home", path: "/", iconName: "Compass" },
  { id: "templates", label: "Templates", path: "/templates", iconName: "LayoutTemplate" },
  { id: "pricing", label: "Pricing", path: "/pricing", iconName: "Tag" },
];

