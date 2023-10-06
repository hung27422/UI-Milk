import images from "~/assets/Images/Image";

export function HomeIcons() {
  return (
    <img
      style={{ width: "30px", height: "30px" }}
      src={images.homeicon}
      alt="menuicons"
    />
  );
}
export function MenuIcon() {
  return (
    <img
      style={{ width: "30px", height: "30px" }}
      src={images.menusidebar}
      alt="menuicons"
    />
  );
}
export function OrderIcon() {
  return (
    <img
      style={{ width: "30px", height: "30px" }}
      src={images.order}
      alt="OrderIcon"
    />
  );
}
export function HistoryIcon() {
  return (
    <img
      style={{ width: "30px", height: "30px" }}
      src={images.historyicon}
      alt="HistoryIcon"
    />
  );
}
export function SettingIcon() {
  return (
    <img
      style={{ width: "30px", height: "30px" }}
      src={images.setting}
      alt="SettingIcon"
    />
  );
}
export function LogoutIcon() {
  return (
    <img
      style={{ width: "30px", height: "30px" }}
      src={images.logout}
      alt="LogoutIcon"
    />
  );
}
