import { useState, useEffect } from "react";

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  maxValue: number;
  unit: string;
  status: "excellent" | "good" | "warning" | "danger";
  trend: "up" | "down" | "stable";
}

const mockMetrics: HealthMetric[] = [
  { id: "1", name: "绝缘指数", value: 92, maxValue: 100, unit: "", status: "excellent", trend: "stable" },
  { id: "2", name: "放电强度", value: 23, maxValue: 100, unit: "pC", status: "good", trend: "down" },
  { id: "3", name: "温度指数", value: 78, maxValue: 100, unit: "", status: "good", trend: "up" },
  { id: "4", name: "湿度指数", value: 65, maxValue: 100, unit: "%", status: "good", trend: "stable" },
];

export default function HealthIndex() {
  const [metrics, setMetrics] = useState<HealthMetric[]>(mockMetrics);
  const [healthScore, setHealthScore] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(
            0,
            Math.min(
              metric.maxValue,
              metric.value + (Math.random() - 0.5) * 2
            )
          ),
        }))
      );
      setHealthScore((prev) => {
        const change = (Math.random() - 0.5) * 1.5;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: HealthMetric["status"]) => {
    switch (status) {
      case "excellent":
        return "text-gis-green-500";
      case "good":
        return "text-gis-cyan-500";
      case "warning":
        return "text-gis-yellow-500";
      case "danger":
        return "text-gis-red-500";
    }
  };

  const getStatusBg = (status: HealthMetric["status"]) => {
    switch (status) {
      case "excellent":
        return "bg-gis-green-500/20";
      case "good":
        return "bg-gis-cyan-500/20";
      case "warning":
        return "bg-gis-yellow-500/20";
      case "danger":
        return "bg-gis-red-500/20";
    }
  };

  const getTrendIcon = (trend: HealthMetric["trend"]) => {
    switch (trend) {
      case "up":
        return (
          <svg className="w-4 h-4 text-gis-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        );
      case "down":
        return (
          <svg className="w-4 h-4 text-gis-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6 6 6" />
          </svg>
        );
    }
  };

  const getHealthScoreColor = () => {
    if (healthScore >= 80) return "text-gis-green-500";
    if (healthScore >= 60) return "text-gis-cyan-500";
    if (healthScore >= 40) return "text-gis-yellow-500";
    return "text-gis-red-500";
  };

  const getHealthScoreBg = () => {
    if (healthScore >= 80) return "from-gis-green-500/30 to-gis-green-500/5";
    if (healthScore >= 60) return "from-gis-cyan-500/30 to-gis-cyan-500/5";
    if (healthScore >= 40) return "from-gis-yellow-500/30 to-gis-yellow-500/5";
    return "from-gis-red-500/30 to-gis-red-500/5";
  };

  return (
    <div className="relative rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gis-green-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gis-green-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gis-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">健康指数</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">设备综合状态评估</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-gray-200 dark:text-gis-dark-600"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={`${healthScore * 5.53} 553`}
                  strokeLinecap="round"
                  className={`${getHealthScoreColor()} transition-all duration-1000`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getHealthScoreColor()}`}>
                  {healthScore.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">综合评分</span>
              </div>
            </div>

            <div className={`mt-4 rounded-lg bg-gradient-to-r ${getHealthScoreBg()} p-4`}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">评估等级</span>
                <span className={`font-semibold ${getHealthScoreColor()}`}>
                  {healthScore >= 80 ? "优秀" : healthScore >= 60 ? "良好" : healthScore >= 40 ? "警告" : "危险"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-lg bg-gray-100 dark:bg-gis-dark-700 p-4 border border-gray-200 dark:border-gis-dark-600 hover:border-gis-cyan-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{metric.name}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{metric.unit}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-gis-dark-600 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getStatusBg(metric.status)}`}
                    style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}