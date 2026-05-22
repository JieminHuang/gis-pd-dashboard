import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";

const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 13h8V3H3v10z" />
    <path d="M3 21h8v-8H3v8z" />
    <path d="M13 21h8V11h-8v10z" />
    <path d="M13 3v8h8V3h-8z" />
  </svg>
);

const DeviceIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const MonitorIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-6" />
  </svg>
);

const DiagnosisIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const AlarmIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const DataIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 20V10" />
    <path d="M12 20V4" />
    <path d="M6 20v-6" />
  </svg>
);

const BreakerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22V2" />
    <path d="M9 6h6" />
    <path d="M8 10h8" />
    <path d="M6 14h12" />
    <path d="M4 18h16" />
  </svg>
);

const SettingIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

type NavItem = {
  name: string;
  nameCn: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    nameCn: "设备总览",
    path: "/dashboard",
  },
  {
    icon: <DeviceIcon />,
    name: "Device",
    nameCn: "高压开关设备管理",
    path: "/device",
  },
  {
    icon: <MonitorIcon />,
    name: "Monitor",
    nameCn: "局部放电监测",
    path: "/monitor",
  },
  {
    icon: <DiagnosisIcon />,
    name: "Diagnosis",
    nameCn: "AI智能诊断",
    path: "/diagnosis",
  },
  {
    icon: <AlarmIcon />,
    name: "Alarm",
    nameCn: "告警管理",
    path: "/alarm",
  },
  {
    icon: <DataIcon />,
    name: "Data",
    nameCn: "数据报表",
    path: "/data",
  },
  {
    icon: <BreakerIcon />,
    name: "Breaker",
    nameCn: "断路器诊断",
    path: "/breaker",
  },
  {
    icon: <SettingIcon />,
    name: "Setting",
    nameCn: "系统设置",
    path: "/setting",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside
      className={`fixed flex flex-col top-0 px-4 left-0 bg-gis-dark-900 border-r border-gis-dark-700 text-gray-300 h-screen transition-all duration-300 ease-in-out z-50
        ${
          isExpanded || isMobileOpen
            ? "w-[260px]"
            : isHovered
            ? "w-[260px]"
            : "w-[72px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gis-cyan-500 to-gis-blue-light-600 flex items-center justify-center">
                <DiagnosisIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">高压开关设备诊断平台</span>
                <span className="text-xs text-gray-400">PD Diagnosis</span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gis-cyan-500 to-gis-blue-light-600 flex items-center justify-center">
              <DiagnosisIcon />
            </div>
          )}
        </Link>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gis-cyan-500/30 to-transparent mx-4" />

      <nav className="flex-1 py-6">
        <ul className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`
                    relative flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${active
                      ? "bg-gis-cyan-500/15 text-gis-cyan-400"
                      : "text-gray-400 hover:bg-gis-dark-700/50 hover:text-gray-200"
                    }
                    ${!isExpanded && !isHovered ? "lg:justify-center px-2" : ""}
                  `}
                >
                  <span className={`
                    transition-colors duration-200
                    ${active ? "text-gis-cyan-400" : "text-gray-500 group-hover:text-gray-300"}
                  `}>
                    {item.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">{item.name}</span>
                      <span className="text-sm font-medium">{item.nameCn}</span>
                    </div>
                  )}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gis-cyan-500 rounded-r-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gis-dark-700">
        <div className={`flex items-center gap-3 ${!isExpanded && !isHovered ? "lg:justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gis-dark-700 flex items-center justify-center">
            <span className="text-xs font-bold text-gis-cyan-400">GD</span>
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">管理员</p>
              <p className="text-xs text-gray-500">在线</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;