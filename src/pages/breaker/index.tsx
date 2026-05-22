import { useState, useEffect, useRef } from "react";
import PageMeta from "../../components/common/PageMeta";
import Chart from "react-apexcharts";

interface BreakerData {
  id: string;
  name: string;
  status: "online" | "offline";
}

const breakerList: BreakerData[] = [
  { id: "breaker-1", name: "高压断路器#1", status: "online" },
  { id: "breaker-2", name: "高压断路器#2", status: "online" },
  { id: "breaker-3", name: "高压断路器#3", status: "offline" },
];

type FaultType = "normal" | "jamming" | "energy_storage" | "contact_wear" | "delay";

const faultInfo: Record<FaultType, { label: string; color: string; probability: number }> = {
  normal: { label: "正常", color: "#00ff88", probability: 95 },
  jamming: { label: "机构卡涩", color: "#ffcc00", probability: 78 },
  energy_storage: { label: "储能异常", color: "#ff6b35", probability: 65 },
  contact_wear: { label: "触头磨损", color: "#ff3366", probability: 82 },
  delay: { label: "分闸延迟", color: "#9966ff", probability: 71 },
};

interface Parameter {
  name: string;
  value: number;
  unit: string;
  normalRange: [number, number];
  isAbnormal: boolean;
}

export default function BreakerDiagnosis() {
  const [selectedBreaker, setSelectedBreaker] = useState<BreakerData>(breakerList[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [faultType, setFaultType] = useState<FaultType>("normal");
  const [healthIndex, setHealthIndex] = useState(92);

  const coilCurrentRef = useRef<number[]>(generateWaveform(50, 10, 2));
  const strokeCurveRef = useRef<number[]>(generateWaveform(50, 50, 5));
  const speedCurveRef = useRef<number[]>(generateWaveform(50, 30, 8));
  const vibrationRef = useRef<number[]>(generateWaveform(50, 5, 1));

  function generateWaveform(length: number, base: number, amplitude: number): number[] {
    const data: number[] = [];
    for (let i = 0; i < length; i++) {
      const noise = (Math.random() - 0.5) * amplitude * 0.4;
      const sineWave = Math.sin((i / length) * Math.PI * 8) * amplitude * 0.3;
      data.push(Math.max(0, Math.min(100, base + sineWave + noise)));
    }
    return data;
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const dataInterval = setInterval(() => {
      coilCurrentRef.current = updateWaveform(coilCurrentRef.current, 10, 2);
      strokeCurveRef.current = updateWaveform(strokeCurveRef.current, 50, 5);
      speedCurveRef.current = updateWaveform(speedCurveRef.current, 30, 8);
      vibrationRef.current = updateWaveform(vibrationRef.current, 5, 1);

      setHealthIndex((prev) => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 100);

    return () => clearInterval(dataInterval);
  }, [isPlaying]);

  function updateWaveform(data: number[], base: number, amplitude: number): number[] {
    const newData = [...data.slice(1)];
    const noise = (Math.random() - 0.5) * amplitude * 0.4;
    const sineWave = Math.sin((Date.now() / 500) * Math.PI * 2) * amplitude * 0.3;
    newData.push(Math.max(0, Math.min(100, base + sineWave + noise)));
    return newData;
  }

  const baseChartOptions = {
    chart: {
      type: "line",
      background: "transparent",
      grid: {
        show: true,
        borderColor: "rgba(0, 212, 255, 0.1)",
        strokeDashArray: 4,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#00d4ff"],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    xaxis: {
      show: false,
      labels: { show: false },
      tickAmount: 5,
    },
    yaxis: {
      show: false,
      labels: { show: false },
      min: 0,
      max: 100,
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["rgba(0, 212, 255, 0.3)"],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
  };

  const coilCurrentOptions = { ...baseChartOptions, colors: ["#00d4ff"] };
  const strokeCurveOptions = { ...baseChartOptions, colors: ["#00ff88"] };
  const speedCurveOptions = { ...baseChartOptions, colors: ["#9966ff"] };
  const vibrationOptions = { ...baseChartOptions, colors: ["#ffcc00"] };

  const parameters: Parameter[] = [
    { name: "合闸时间", value: 58, unit: "ms", normalRange: [50, 70], isAbnormal: false },
    { name: "分闸时间", value: 45, unit: "ms", normalRange: [40, 60], isAbnormal: false },
    { name: "超程", value: 12.5, unit: "mm", normalRange: [10, 15], isAbnormal: false },
    { name: "弹跳时间", value: 6, unit: "ms", normalRange: [0, 5], isAbnormal: true },
    { name: "动作速度", value: 3.2, unit: "m/s", normalRange: [2.5, 3.5], isAbnormal: false },
  ];

  return (
    <>
      <PageMeta
        title="断路器机械故障诊断 - 高压开关设备局部放电智能诊断平台"
        description="断路器机械故障诊断页面"
      />

      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              断路器机械故障诊断
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              实时监测断路器机械状态，AI智能诊断故障
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">设备编号：</span>
              <span className="text-sm font-medium text-gis-cyan-500">
                {selectedBreaker.id.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${selectedBreaker.status === "online" ? "bg-gis-green-500 animate-pulse" : "bg-gray-400"}`} />
              <span className={`text-sm font-medium ${selectedBreaker.status === "online" ? "text-gis-green-500" : "text-gray-400"}`}>
                {selectedBreaker.status === "online" ? "在线" : "离线"}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentTime.toLocaleString("zh-CN")}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-4 shadow-theme-md">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">设备列表</h3>
            <ul className="space-y-2">
              {breakerList.map((breaker) => (
                <li key={breaker.id}>
                  <button
                    onClick={() => setSelectedBreaker(breaker)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedBreaker.id === breaker.id
                        ? "bg-gis-cyan-500/15 text-gis-cyan-400 border border-gis-cyan-500/30"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gis-dark-700"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${breaker.status === "online" ? "bg-gis-green-500" : "bg-gray-400"}`} />
                    {breaker.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-4 shadow-theme-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                机械动作实时波形监测
              </h3>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isPlaying
                    ? "bg-gis-red-500/20 text-gis-red-500 hover:bg-gis-red-500/30"
                    : "bg-gis-green-500/20 text-gis-green-500 hover:bg-gis-green-500/30"
                }`}
              >
                {isPlaying ? "暂停" : "播放"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-900 dark:bg-gis-dark-900 p-3 border border-gray-800 dark:border-gis-dark-700 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-1 rounded-full bg-gis-cyan-500" />
                  <span className="text-xs text-gray-400">线圈电流</span>
                </div>
                <Chart
                  options={coilCurrentOptions}
                  series={[{ data: coilCurrentRef.current }]}
                  type="line"
                  height={120}
                />
              </div>

              <div className="rounded-lg bg-gray-900 dark:bg-gis-dark-900 p-3 border border-gray-800 dark:border-gis-dark-700 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-1 rounded-full bg-gis-green-500" />
                  <span className="text-xs text-gray-400">行程曲线</span>
                </div>
                <Chart
                  options={strokeCurveOptions}
                  series={[{ data: strokeCurveRef.current }]}
                  type="line"
                  height={120}
                />
              </div>

              <div className="rounded-lg bg-gray-900 dark:bg-gis-dark-900 p-3 border border-gray-800 dark:border-gis-dark-700 shadow-[0_0_15px_rgba(153,102,255,0.1)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-1 rounded-full bg-gis-purple-500" />
                  <span className="text-xs text-gray-400">速度曲线</span>
                </div>
                <Chart
                  options={speedCurveOptions}
                  series={[{ data: speedCurveRef.current }]}
                  type="line"
                  height={120}
                />
              </div>

              <div className="rounded-lg bg-gray-900 dark:bg-gis-dark-900 p-3 border border-gray-800 dark:border-gis-dark-700 shadow-[0_0_15px_rgba(255,204,0,0.1)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-1 rounded-full bg-gis-yellow-500" />
                  <span className="text-xs text-gray-400">振动信号</span>
                </div>
                <Chart
                  options={vibrationOptions}
                  series={[{ data: vibrationRef.current }]}
                  type="line"
                  height={120}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-4 shadow-theme-md">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              机械故障AI诊断
            </h3>

            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-700 dark:text-gis-dark-600"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={faultInfo[faultType].color}
                  strokeWidth="8"
                  strokeDasharray={`${healthIndex * 3.52} 352`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: faultInfo[faultType].color }}>
                  {healthIndex.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">健康指数</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">当前故障类型</span>
                <span
                  className="text-sm font-semibold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${faultInfo[faultType].color}20`,
                    color: faultInfo[faultType].color,
                  }}
                >
                  {faultInfo[faultType].label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">故障概率</span>
                <span className="text-sm font-semibold text-gis-cyan-500">
                  {(100 - faultInfo[faultType].probability)}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gis-dark-600">
              <select
                value={faultType}
                onChange={(e) => setFaultType(e.target.value as FaultType)}
                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 border border-gray-200 dark:border-gis-dark-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gis-cyan-500/50"
              >
                <option value="normal">正常</option>
                <option value="jamming">机构卡涩</option>
                <option value="energy_storage">储能异常</option>
                <option value="contact_wear">触头磨损</option>
                <option value="delay">分闸延迟</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-4 shadow-theme-md">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              机械参数分析表
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gis-dark-600">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      参数名称
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      当前值
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      单位
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      正常范围
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      状态
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gis-dark-600">
                  {parameters.map((param, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {param.name}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm font-semibold ${
                          param.isAbnormal ? "text-gis-red-500" : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {param.value}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {param.unit}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {param.normalRange[0]} - {param.normalRange[1]} {param.unit}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            param.isAbnormal
                              ? "bg-gis-red-500/20 text-gis-red-500"
                              : "bg-gis-green-500/20 text-gis-green-500"
                          }`}
                        >
                          {param.isAbnormal ? "异常" : "正常"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}