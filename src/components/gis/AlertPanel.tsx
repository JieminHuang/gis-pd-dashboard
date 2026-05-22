import { useState } from "react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  equipment: string;
  status: "active" | "acknowledged" | "resolved";
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "局部放电超标",
    description: "检测到高压开关设备局部放电信号超过安全阈值，建议立即检查",
    timestamp: "2024-01-15 14:32:18",
    equipment: "GIS-001",
    status: "active",
  },
  {
    id: "2",
    type: "warning",
    title: "温度异常",
    description: "设备温度超出正常范围，建议加强监控",
    timestamp: "2024-01-15 14:28:45",
    equipment: "GIS-002",
    status: "active",
  },
  {
    id: "3",
    type: "warning",
    title: "绝缘下降",
    description: "绝缘电阻值下降，建议安排维护",
    timestamp: "2024-01-15 14:15:30",
    equipment: "GIS-001",
    status: "acknowledged",
  },
  {
    id: "4",
    type: "info",
    title: "设备自检完成",
    description: "高压开关设备定期自检已完成，状态正常",
    timestamp: "2024-01-15 14:00:00",
    equipment: "GIS-003",
    status: "resolved",
  },
  {
    id: "5",
    type: "critical",
    title: "SF6压力异常",
    description: "SF6气体压力低于安全值，需立即处理",
    timestamp: "2024-01-15 13:55:22",
    equipment: "GIS-004",
    status: "active",
  },
];

export default function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [statusFilter] = useState<"all" | "active" | "acknowledged" | "resolved">("all");

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "acknowledged" as const } : alert
      )
    );
  };

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "resolved" as const } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter !== "all" && alert.type !== filter) return false;
    if (statusFilter !== "all" && alert.status !== statusFilter) return false;
    return true;
  });

  const getTypeStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-gis-red-500/10",
          border: "border-gis-red-500/30",
          text: "text-gis-red-500",
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6A6 6 0 0 0 6 6v7a6 6 0 0 0 12 0V6z" />
            </svg>
          ),
        };
      case "warning":
        return {
          bg: "bg-gis-yellow-500/10",
          border: "border-gis-yellow-500/30",
          text: "text-gis-yellow-500",
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case "info":
        return {
          bg: "bg-gis-cyan-500/10",
          border: "border-gis-cyan-500/30",
          text: "text-gis-cyan-500",
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          ),
        };
    }
  };

  const getStatusBadge = (status: Alert["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 rounded-full bg-gis-red-500/20 text-gis-red-500 text-xs font-medium">
            活动
          </span>
        );
      case "acknowledged":
        return (
          <span className="px-2 py-1 rounded-full bg-gis-yellow-500/20 text-gis-yellow-500 text-xs font-medium">
            已确认
          </span>
        );
      case "resolved":
        return (
          <span className="px-2 py-1 rounded-full bg-gis-green-500/20 text-gis-green-500 text-xs font-medium">
            已解决
          </span>
        );
    }
  };

  const getTypeLabel = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "严重";
      case "warning":
        return "警告";
      case "info":
        return "信息";
    }
  };

  const criticalCount = alerts.filter((a) => a.type === "critical" && a.status === "active").length;
  const warningCount = alerts.filter((a) => a.type === "warning" && a.status === "active").length;

  return (
    <div className="relative rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md h-full">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gis-red-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gis-red-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gis-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">告警信息</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">实时设备告警监控</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gis-red-500" />
              <span className="text-xs text-gray-500">{criticalCount} 严重</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gis-yellow-500" />
              <span className="text-xs text-gray-500">{warningCount} 警告</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-gis-cyan-500/20 text-gis-cyan-500"
                : "bg-gray-100 dark:bg-gis-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gis-dark-600"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter("critical")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === "critical"
                ? "bg-gis-red-500/20 text-gis-red-500"
                : "bg-gray-100 dark:bg-gis-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gis-dark-600"
            }`}
          >
            严重
          </button>
          <button
            onClick={() => setFilter("warning")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === "warning"
                ? "bg-gis-yellow-500/20 text-gis-yellow-500"
                : "bg-gray-100 dark:bg-gis-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gis-dark-600"
            }`}
          >
            警告
          </button>
          <button
            onClick={() => setFilter("info")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === "info"
                ? "bg-gis-cyan-500/20 text-gis-cyan-500"
                : "bg-gray-100 dark:bg-gis-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gis-dark-600"
            }`}
          >
            信息
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {filteredAlerts.map((alert) => {
            const styles = getTypeStyles(alert.type);
            return (
              <div
                key={alert.id}
                className={`rounded-lg p-4 border ${styles.bg} ${styles.border} transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${styles.text} mt-0.5`}>{styles.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${styles.text} uppercase tracking-wider`}>
                        {getTypeLabel(alert.type)}
                      </span>
                      {getStatusBadge(alert.status)}
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                        <span>{alert.equipment}</span>
                        <span>{alert.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {alert.status === "active" && (
                          <button
                            onClick={() => handleAcknowledge(alert.id)}
                            className="px-2 py-1 rounded bg-gray-200 dark:bg-gis-dark-600 text-gray-600 dark:text-gray-300 text-xs hover:bg-gray-300 dark:hover:bg-gis-dark-500 transition-colors"
                          >
                            确认
                          </button>
                        )}
                        {(alert.status === "active" || alert.status === "acknowledged") && (
                          <button
                            onClick={() => handleResolve(alert.id)}
                            className="px-2 py-1 rounded bg-gis-green-500/20 text-gis-green-500 text-xs hover:bg-gis-green-500/30 transition-colors"
                          >
                            解决
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <p className="text-sm">暂无告警信息</p>
          </div>
        )}
      </div>
    </div>
  );
}