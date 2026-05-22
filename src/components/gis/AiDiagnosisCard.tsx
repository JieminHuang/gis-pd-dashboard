import { useState, useEffect } from "react";

interface DiagnosisResult {
  id: string;
  type: "normal" | "warning" | "danger";
  title: string;
  confidence: number;
  description: string;
  timestamp: string;
}

const mockDiagnosisResults: DiagnosisResult[] = [
  {
    id: "1",
    type: "normal",
    title: "设备运行正常",
    confidence: 98.5,
    description: "GIS设备局部放电检测未发现异常信号",
    timestamp: "2024-01-15 14:32:18",
  },
  {
    id: "2",
    type: "warning",
    title: "轻微放电信号",
    confidence: 87.3,
    description: "检测到微弱的局部放电信号，建议密切关注",
    timestamp: "2024-01-15 14:30:45",
  },
  {
    id: "3",
    type: "normal",
    title: "绝缘性能良好",
    confidence: 99.1,
    description: "绝缘电阻测试结果符合标准要求",
    timestamp: "2024-01-15 14:28:33",
  },
];

export default function AiDiagnosisCard() {
  const [results, setResults] = useState<DiagnosisResult[]>(mockDiagnosisResults);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % results.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [results.length]);

  const getTypeStyles = (type: DiagnosisResult["type"]) => {
    switch (type) {
      case "normal":
        return {
          bg: "bg-gis-green-500/10",
          border: "border-gis-green-500/30",
          text: "text-gis-green-500",
          glow: "shadow-[0_0_20px_rgba(0,255,136,0.15)]",
        };
      case "warning":
        return {
          bg: "bg-gis-yellow-500/10",
          border: "border-gis-yellow-500/30",
          text: "text-gis-yellow-500",
          glow: "shadow-[0_0_20px_rgba(255,204,0,0.15)]",
        };
      case "danger":
        return {
          bg: "bg-gis-red-500/10",
          border: "border-gis-red-500/30",
          text: "text-gis-red-500",
          glow: "shadow-[0_0_20px_rgba(255,51,102,0.15)]",
        };
    }
  };

  return (
    <div className="relative rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gis-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gis-cyan-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gis-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI诊断结果</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">智能分析报告</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gis-green-500 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">实时更新</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gis-dark-700 p-4">
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {results.map((result, index) => {
              const styles = getTypeStyles(result.type);
              const isActive = index === activeIndex;
              return (
                <div
                  key={result.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 w-72 rounded-lg p-4 border transition-all duration-300 cursor-pointer ${styles.bg} ${styles.border} ${isActive ? `${styles.glow} scale-[1.02]` : 'opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium ${styles.text} uppercase tracking-wider`}>
                      {result.type === "normal" ? "正常" : result.type === "warning" ? "预警" : "危险"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {result.timestamp.split(" ")[1]}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    {result.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {result.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">置信度</span>
                    <span className={`text-sm font-semibold ${styles.text}`}>
                      {result.confidence}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-gis-cyan-500"
                    : "bg-gray-300 dark:bg-gis-dark-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}